import { NextResponse } from "next/server";
import { auth } from "@/auth"; 
import { query } from "@/config/db";

export async function POST(req) {
  try {
    // 1. Check Authentication
    const session = await auth();
    if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    const { proposalId, action, remark } = body;
    const userId = session.user.id;
    const userRole = session.user.role;

    // 2. Fetch the CURRENT stage from DB (Needed for the Log)
    // We cannot assume the previous stage; we must look it up.
    const currentPropResult = await query(
      `SELECT current_stage FROM proposals WHERE id = $1`, 
      [proposalId]
    );

    if (currentPropResult.rows.length === 0) {
      return NextResponse.json({ message: "Proposal not found" }, { status: 404 });
    }

    const previousStage = currentPropResult.rows[0].current_stage;
    let newStage = previousStage; // Default to no change

    // 3. Determine New Stage based on Role & Action
    
    // --- OFFICE LOGIC ---
    if (userRole === 'office') {
      if (action === 'FORWARD') newStage = 'ADOSA_REVIEW';    // Next Step
      if (action === 'REVERT') newStage = 'NEEDS_CORRECTION'; // Back to GS
      if (action === 'REJECT') newStage = 'REJECTED';         // End
    }

    // --- ADOSA LOGIC ---
    else if (userRole === 'adosa') {
      if (action === 'FORWARD') newStage = 'DOSA_REVIEW';     // Next Step
      if (action === 'REVERT') newStage = 'NEEDS_CORRECTION'; // Back to GS (as per your request)
      if (action === 'REJECT') newStage = 'REJECTED';         // End
    }

    // --- DOSA LOGIC ---
    else if (userRole === 'dosa') {
      // DOSA usually 'APPROVES' rather than 'FORWARDS', but we handle both keywords just in case
      if (action === 'APPROVE' || action === 'FORWARD') newStage = 'APPROVED'; 
      if (action === 'REVERT') newStage = 'NEEDS_CORRECTION'; // Back to GS
      if (action === 'REJECT') newStage = 'REJECTED';         // End
    }

    // Security Fallback: If stage didn't change (e.g., unauthorized role tried to act), stop.
    if (newStage === previousStage) {
       return NextResponse.json({ message: "No valid status change for this role." }, { status: 400 });
    }

    // 4. Update Proposal Table
    await query(
      `UPDATE proposals SET current_stage = $1, updated_at = NOW() WHERE id = $2`,
      [newStage, proposalId]
    );

    // 5. Add Log Entry (Timeline)
    // We use 'previousStage' (fetched from DB) and 'newStage' (calculated above)
    await query(
      `INSERT INTO proposal_logs (proposal_id, action_by, action, remark, previous_stage, new_stage)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [proposalId, userId, action, remark, previousStage, newStage]
    );

    return NextResponse.json({ message: "Updated successfully" });

  } catch (error) {
    console.error("Update Error:", error);
    return NextResponse.json({ message: "Server Error" }, { status: 500 });
  }
}