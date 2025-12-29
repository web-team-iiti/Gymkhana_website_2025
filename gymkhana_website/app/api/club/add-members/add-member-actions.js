"use server";

import { auth } from "@/auth";
import { query } from "@/config/db";
import { redirect } from "next/navigation";

// Helper
async function getClubIdForHead(clubHeadId) {
  const res = await query(
    `SELECT club_id FROM clubs WHERE club_head_id = $1`,
    [clubHeadId]
  );
  return res.rows[0]?.club_id;
}

export async function addMemberAction(formData) {
  const session = await auth();
  if (!session?.user || session.user.role !== "club_head") {
    throw new Error("Unauthorized");
  }

  const email = formData.get("email");
  const position = formData.get("position");
  const remarks = formData.get("remarks");

  const clubHeadId = session.user.id;
  const clubId = await getClubIdForHead(clubHeadId);

  if (!clubId) {
    redirect("/dashboard/club_head/members/add?error=no_club");
  }

  const studentRes = await query(
    `SELECT id FROM users WHERE email = $1`,
    [email]
  );

  if (studentRes.rows.length === 0) {
    redirect("/dashboard/club_head/members/add?error=user_not_found");
  }

  const studentId = studentRes.rows[0].id;

  const exists = await query(
    `SELECT 1 FROM club_members WHERE student_id = $1 AND club_id = $2`,
    [studentId, clubId]
  );

  if (exists.rows.length > 0) {
    // Redirect back with error message for duplicate member
    redirect("/dashboard/club_head/members/add?error=duplicate");
  }

  await query(
    `INSERT INTO club_members
     (student_id, club_id, position, status, added_by, remarks)
     VALUES ($1, $2, $3, 'PENDING', $4, $5)`,
    [studentId, clubId, position, clubHeadId, remarks]
  );

  // Redirect back with success message
  redirect("/dashboard/club_head/members/add?success=true");
}
