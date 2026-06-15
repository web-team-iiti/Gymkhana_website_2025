import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

// Helper
async function getClubIdForHead(clubHeadId) {
  const res = await query(
    `SELECT club_id FROM clubs WHERE club_head_id = $1`,
    [clubHeadId]
  );
  return res.rows[0]?.club_id;
}

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "club_head") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { memberId } = params;

    if (!memberId) {
      return NextResponse.json({ message: "Member ID is required" }, { status: 400 });
    }

    const clubHeadId = session.user.id;
    const clubId = await getClubIdForHead(clubHeadId);

    if (!clubId) {
      return NextResponse.json({ message: "Club not found" }, { status: 404 });
    }

    // Verify the member belongs to this club head's club
    const memberCheck = await query(
      `SELECT 1 FROM club_members WHERE member_id = $1 AND club_id = $2`,
      [memberId, clubId]
    );

    if (memberCheck.rows.length === 0) {
      return NextResponse.json(
        { message: "Member not found or not authorized to remove" },
        { status: 404 }
      );
    }

    // Remove the member
    await query(
      `DELETE FROM club_members WHERE member_id = $1 AND club_id = $2`,
      [memberId, clubId]
    );

    return NextResponse.json({ message: "Member removed successfully" });
  } catch (error) {
    console.error("Error removing member:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}