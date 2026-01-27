


import { auth } from "@/auth";
import { query } from "@/config/db";
import { NextResponse } from "next/server";

/* =======================
   GET: List Projects
   ======================= */
export async function GET(req, { params }) {
  try {
    const { clubId } = params;

    const result = await query(
      `
      SELECT project_id, title, description, status, created_at
      FROM club_projects
      WHERE club_id = $1
      ORDER BY created_at DESC
      `,
      [clubId]
    );

    return NextResponse.json(result.rows);
  } catch (err) {
    console.error("Fetch Projects Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* =======================
   POST: Add Project
   ======================= */
export async function POST(req, { params }) {
  try {
    const session = await auth();

    if (!session || session.user.role !== "club_head") {
      return NextResponse.json(
        { message: "Unauthorized" },
        { status: 401 }
      );
    }

    const { clubId } = params;
    const { title, description, status } = await req.json();

    if (!title || !status) {
      return NextResponse.json(
        { message: "Title and status are required" },
        { status: 400 }
      );
    }

    // 🔐 verify club ownership
    const clubCheck = await query(
      `
      SELECT 1
      FROM clubs
      WHERE club_id = $1 AND club_head_id = $2
      `,
      [clubId, session.user.id]
    );

    if (clubCheck.rows.length === 0) {
      return NextResponse.json(
        { message: "Not authorized for this club" },
        { status: 403 }
      );
    }

    await query(
      `
      INSERT INTO club_projects
        (club_id, title, description, status, created_by)
      VALUES
        ($1, $2, $3, $4, $5)
      `,
      [
        clubId,
        title,
        description || "",
        status,
        session.user.id,
      ]
    );

    return NextResponse.json(
      { message: "Project added successfully" },
      { status: 201 }
    );
  } catch (err) {
    console.error("Add Project Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
