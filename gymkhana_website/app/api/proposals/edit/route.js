import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";
import { supabase } from "@/config/supabase"; 

export async function PUT(req) { // Changed to PUT to match standard editing practices
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const formData = await req.formData();
    const id = formData.get("id");
    const title = formData.get("title");
    const description = formData.get("description");
    const priority = formData.get("priority"); 
    const file = formData.get("file"); 
    const userId = session.user.id;

    if (!id || !title) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    // 1. FETCH CURRENT PROPOSAL & SECURITY CHECKS
    const checkSql = `SELECT created_by, current_stage, pdf_url FROM proposals WHERE id = $1`;
    const checkRes = await query(checkSql, [id]);

    if (checkRes.rows.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    const proposal = checkRes.rows[0];

    // ✅ CHECK 1: Ownership
    if (proposal.created_by !== userId) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    // ✅ CHECK 2: Stage (Must be NEEDS_CORRECTION)
    if (proposal.current_stage !== 'NEEDS_CORRECTION') {
        return NextResponse.json({ message: "Cannot edit proposal unless it needs correction." }, { status: 400 });
    }

    // 2. FILE HANDLING (The "Garbage Collection" Logic)
    let finalPdfUrl = proposal.pdf_url; 

    if (file && file.size > 0) {
      console.log("Replacing PDF...");

      // A. DELETE OLD FILE 🗑️
      if (proposal.pdf_url && proposal.pdf_url.includes("supabase")) {
        const oldFileName = proposal.pdf_url.split('/').pop();
        await supabase.storage.from("proposals").remove([oldFileName]);
      }

      // B. UPLOAD NEW FILE 📤
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`;
      const arrayBuffer = await file.arrayBuffer();
      
      const { error: uploadError } = await supabase.storage
        .from("proposals")
        .upload(fileName, Buffer.from(arrayBuffer), { contentType: file.type, upsert: false });

      if (uploadError) throw new Error("Upload Error: " + uploadError.message);

      const { data: urlData } = supabase.storage.from("proposals").getPublicUrl(fileName);
      finalPdfUrl = urlData.publicUrl;
    }

    // 3. UPDATE DB & RESET STAGE
    const updateSql = `
      UPDATE proposals 
      SET title = $1, description = $2, priority = $3, pdf_url = $4, current_stage = 'OFFICE_REVIEW', updated_at = NOW()
      WHERE id = $5
    `;
    await query(updateSql, [title, description, priority, finalPdfUrl, id]);

    // 4. LOG IT
    const logSql = `
      INSERT INTO proposal_logs (proposal_id, action_by, action, remark, previous_stage, new_stage)
      VALUES ($1, $2, 'RESUBMITTED', 'Corrections made by GS', 'NEEDS_CORRECTION', 'OFFICE_REVIEW');
    `;
    await query(logSql, [id, userId]);

    return NextResponse.json({ message: "Resubmitted Successfully" }, { status: 200 });

  } catch (error) {
    console.error("Edit API Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}