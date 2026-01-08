// // POST /api/club/members


import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

/* ======================
   Helper: Get club_id
====================== */
async function getClubIdForHead(clubHeadId) {
  const res = await query(
    `SELECT club_id FROM clubs WHERE club_head_id = $1`,
    [clubHeadId]
  );
  return res.rows[0]?.club_id;
}

/* ======================
   POST: Add club member
====================== */
export async function POST(req) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "club_head") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email, position } = await req.json();
    const clubHeadId = session.user.id;

    // 1️⃣ Get club_id
    const clubId = await getClubIdForHead(clubHeadId);
    if (!clubId) {
      return NextResponse.json(
        { message: "Club not found for this club head" },
        { status: 404 }
      );
    }

    // 2️⃣ Find student
    const studentRes = await query(
      `SELECT id FROM users WHERE email = $1`,
      [email]
    );

    if (studentRes.rows.length === 0) {
      return NextResponse.json(
        { message: "User not found" },
        { status: 404 }
      );
    }

    const studentId = studentRes.rows[0].id;

    // 3️⃣ Prevent duplicate member
    const exists = await query(
      `SELECT 1 FROM club_members
       WHERE student_id = $1 AND club_id = $2`,
      [studentId, clubId]
    );

    if (exists.rows.length > 0) {
      return NextResponse.json(
        { message: "User already in club" },
        { status: 409 }
      );
    }

    // 4️⃣ Insert member
    const insertRes = await query(
      `INSERT INTO club_members
       (student_id, club_id, position, status, added_by)
       VALUES ($1, $2, $3, 'PENDING', $4)
       RETURNING *`,
      [studentId, clubId, position, clubHeadId]
    );

    return NextResponse.json(
      {
        message: "Member added successfully",
        member: insertRes.rows[0],
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding member:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* ======================
   GET: List club members
====================== */
export async function GET() {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== "club_head") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const clubHeadId = session.user.id;

    // 1️⃣ Get club_id
    const clubId = await getClubIdForHead(clubHeadId);
    if (!clubId) {
      return NextResponse.json(
        { message: "Club not found for this club head" },
        { status: 404 }
      );
    }

    // 2️⃣ Fetch members
    const membersRes = await query(
      `SELECT
         cm.member_id,
         u.id AS student_id,
         u.name,
         u.email,
         cm.position,
         cm.status,
         cm.added_at
       FROM club_members cm
       JOIN users u ON u.id = cm.student_id
       WHERE cm.club_id = $1
       ORDER BY cm.added_at DESC`,
      [clubId]
    );

    return NextResponse.json(
      { members: membersRes.rows },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}


// // // app/api/club/members/route.js
// // import { query } from "@/config/db";

// export async function GET(req) {
//   try {
//     const url = new URL(req.url);
//     const status = url.searchParams.get("status") || "PENDING";

//     const sql = `
//       SELECT
//         cm.member_id,
//         u.name,
//         u.email,
//         c.club_name,
//         cm.position,
//         cm.added_at,
//         cm.remarks,
//         cm.status
//       FROM club_members cm
//       JOIN users u ON u.id = cm.student_id
//       JOIN clubs c ON c.club_id = cm.club_id
//       WHERE cm.status = $1
//       ORDER BY cm.added_at ASC;
//     `;

//     const result = await query(sql, [status]);
//     return new Response(JSON.stringify({ members: result.rows }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error(err);
//     return new Response(JSON.stringify({ error: "Failed to fetch members." }), {
//       status: 500,
//       headers: { "Content-Type": "application/json" },
//     });
//   }
// }
