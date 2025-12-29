


import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { query } from "@/config/db";
import { FaUserPlus } from "react-icons/fa";
import MemberList from "./MemberList";

/* ==========================
   Get club_id for club head
========================== */
async function getClubId(clubHeadId) {
  const res = await query(
    `SELECT club_id FROM clubs WHERE club_head_id = $1`,
    [clubHeadId]
  );
  return res.rows[0]?.club_id;
}

/* ==========================
   Fetch members of club
========================== */
async function getMembers(clubId) {
  const res = await query(
    `
    SELECT
      cm.member_id,
      u.name,
      u.email,
      cm.position,
      cm.status,
      cm.added_at,
      cm.remarks
    FROM club_members cm
    JOIN users u ON u.id = cm.student_id
    WHERE cm.club_id = $1
    ORDER BY cm.added_at DESC
    `,
    [clubId]
  );

  return res.rows;
}

/* ==========================
   Page Component
========================== */
export default async function MyMembersPage() {
  const session = await auth();

  if (!session?.user || session.user.role !== "club_head") {
    return <div className="text-white p-6">Unauthorized</div>;
  }

  // 1️⃣ Get club_id using club_head_id
  const clubId = await getClubId(session.user.id);

  if (!clubId) {
    return (
      <div className="text-red-500 p-6">
        No club assigned to this club head
      </div>
    );
  }

  // 2️⃣ Get members
  const members = await getMembers(clubId);

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">My Members</h1>

        <Link
          href="/dashboard/club_head/members/add"
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all"
        >
          <FaUserPlus /> Add Member
        </Link>
      </div>

      <MemberList members={members} />
    </div>
  );
}

