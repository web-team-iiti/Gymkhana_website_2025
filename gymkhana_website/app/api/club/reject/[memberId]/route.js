import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

export async function POST(req, { params }) {
  const session = await auth();
  if (!session || session.user.role !== "gs") {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { memberId } = params;

  const sql = `
    UPDATE club_members
    SET status = 'REJECTED',
        rejected_by = $1,
        rejected_at = NOW()
    WHERE member_id = $2 AND status = 'TENURE_ADDED';
  `;

  await query(sql, [session.user.id, memberId]);

  return NextResponse.redirect(
    new URL("/dashboard/general_secretary/verify-members?success=true&action=rejected", req.url)
  );
}