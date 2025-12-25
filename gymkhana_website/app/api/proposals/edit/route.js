import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

export async function POST(req) {
  try {
    const session = await auth();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { proposalId, title, description, pdfUrl } = body;

    // 1. Security Check: Ensure the user owns this proposal
    // We also check if it is actually in 'NEEDS_CORRECTION' state to prevent editing active files
    const checkSql = `SELECT created_by, current_stage FROM proposals WHERE id = $1`;
    const checkRes = await query(checkSql, [proposalId]);

    if (checkRes.rows.length === 0) return NextResponse.json({ message: "Not found" }, { status: 404 });
    
    const proposal = checkRes.rows[0];

    if (proposal.created_by !== session.user.id) {
        return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
    if (proposal.current_stage !== 'NEEDS_CORRECTION') {
        return NextResponse.json({ message: "Cannot edit proposal unless it needs correction." }, { status: 400 });
    }

    // 2. Perform the Update (The "Overwrite" Logic)
    // We update title, description, and pdf_url.
    // We also set current_stage back to 'OFFICE_REVIEW' so it appears in their dashboard again.
    const updateSql = `
        UPDATE proposals 
        SET title = $1, description = $2, pdf_url = $3, current_stage = 'OFFICE_REVIEW', updated_at = NOW()
        WHERE id = $4
    `;

    // Note: If pdfUrl is null (user didn't change file), we should ideally keep the old one.
    // However, the frontend should send the old URL if no new one is uploaded. 
    // Assuming the frontend handles "sending the valid URL to save".
    
    await query(updateSql, [title, description, pdfUrl, proposalId]);

    // 3. Log the Resubmission
    await query(
        `INSERT INTO proposal_logs (proposal_id, action_by, action, remark, previous_stage, new_stage)
         VALUES ($1, $2, 'RESUBMITTED', 'Corrections made by GS', 'NEEDS_CORRECTION', 'OFFICE_REVIEW')`,
        [proposalId, session.user.id]
    );

    return NextResponse.json({ message: "Proposal updated successfully" });

  } catch (error) {
    console.error("Edit Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}