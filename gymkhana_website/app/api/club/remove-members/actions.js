"use server";

import { auth } from "@/auth";
import { query } from "@/config/db";
import { revalidatePath } from "next/cache";

// Helper
async function getClubIdForHead(clubHeadId) {
  const res = await query(
    `SELECT club_id FROM clubs WHERE club_head_id = $1`,
    [clubHeadId]
  );
  return res.rows[0]?.club_id;
}

export async function removeMemberAction(formData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "club_head") {
    throw new Error("Unauthorized");
  }

  const memberId = formData.get("memberId");

  if (!memberId) {
    throw new Error("Member ID is required");
  }

  const clubHeadId = session.user.id;
  const clubId = await getClubIdForHead(clubHeadId);

  if (!clubId) {
    throw new Error("Club not found");
  }

  // Verify the member belongs to this club head's club
  const memberCheck = await query(
    `SELECT 1 FROM club_members WHERE member_id = $1 AND club_id = $2`,
    [memberId, clubId]
  );

  if (memberCheck.rows.length === 0) {
    throw new Error("Member not found or not authorized to remove");
  }

  // Remove the member
  await query(
    `DELETE FROM club_members WHERE member_id = $1 AND club_id = $2`,
    [memberId, clubId]
  );

  // Revalidate the members page
  revalidatePath("/dashboard/club_head/members");
}