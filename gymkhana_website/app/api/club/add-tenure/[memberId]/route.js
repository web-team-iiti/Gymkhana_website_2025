import { query } from "@/config/db";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { member_id, tenure_start, tenure_end } = await req.json();

    await query(
      `
      UPDATE club_members
      SET tenure_start = $1,
          tenure_end = $2,
          status = 'TENURE_ADDED'
      WHERE member_id = $3
      `,
      [tenure_start, tenure_end, member_id]
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
