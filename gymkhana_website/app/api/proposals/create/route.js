// 
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { query } from "@/config/db";

// Initialize Supabase with SERVICE ROLE KEY
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: {
      persistSession: false,
    },
  }
);
export async function POST(req) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // ... The rest of your code remains exactly the same ...
    const formData = await req.formData();
    const file = formData.get("file");
    const title = formData.get("title");
    const description = formData.get("description");
    const priority = formData.get("priority");
    const userId = session.user.id;

    if (!file || !title) {
      return NextResponse.json({ message: "Missing file or title" }, { status: 400 });
    }

    // Upload Logic
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { error: uploadError } = await supabase.storage
      .from("proposals")
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: false
      });

    if (uploadError) throw new Error("Storage Error: " + uploadError.message);

    const { data: urlData } = supabase.storage
      .from("proposals")
      .getPublicUrl(fileName);

    const finalPdfUrl = urlData.publicUrl;

    // Database Insert
    const proposalSql = `
      INSERT INTO proposals (title, description, priority, pdf_url, created_by, current_stage)
      VALUES ($1, $2, $3, $4, $5, 'OFFICE_REVIEW')
      RETURNING id;
    `;

    const proposalResult = await query(proposalSql, [title, description, priority, finalPdfUrl, userId]);
    const newProposalId = proposalResult.rows[0].id;

    // Log Entry
    const logSql = `
      INSERT INTO proposal_logs (proposal_id, action_by, action, remark, new_stage)
      VALUES ($1, $2, 'CREATED', 'Initial Submission by GS', 'OFFICE_REVIEW');
    `;
    await query(logSql, [newProposalId, userId]);
    return NextResponse.json({ message: "Success", id: newProposalId }, { status: 201 });
  } catch (error) {
    console.error("Backend Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}