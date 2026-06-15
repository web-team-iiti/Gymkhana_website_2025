

import { auth } from "@/auth";
import { query } from "@/config/db";
import { NextResponse } from "next/server";

/* ============================
   PATCH: Update Project Status
   ============================ */
export async function PATCH(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;
    const { status } = await req.json();

    if (!status) {
      return NextResponse.json(
        { message: "Status required" },
        { status: 400 }
      );
    }

    /* ---------- AUTHORIZATION ---------- */
    const allowed = await query(
      `
      SELECT 1
      FROM club_projects cp
      JOIN clubs c ON c.club_id = cp.club_id
      JOIN users u ON u.id = $1
      WHERE cp.project_id = $2
        AND (
          c.club_head_id = $1
          OR u.role IN ('gs', 'office', 'adosa', 'dosa')
        )
      `,
      [session.user.id, projectId]
    );

    if (allowed.rows.length === 0) {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 403 }
      );
    }

    await query(
      `
      UPDATE club_projects
      SET status = $1
      WHERE project_id = $2
      `,
      [status, projectId]
    );

    return NextResponse.json({ message: "Project updated" });
  } catch (err) {
    console.error("Update Project Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

/* ============================
   DELETE: Remove Project
   ============================ */
export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { projectId } = params;

    /* ---------- AUTHORIZATION ---------- */
    const allowed = await query(
      `
      SELECT 1
      FROM club_projects cp
      JOIN clubs c ON c.club_id = cp.club_id
      JOIN users u ON u.id = $1
      WHERE cp.project_id = $2
        AND (
          c.club_head_id = $1
          OR u.role IN ('gs', 'office', 'adosa', 'dosa')
        )
      `,
      [session.user.id, projectId]
    );

    if (allowed.rows.length === 0) {
      return NextResponse.json(
        { message: "Not authorized" },
        { status: 403 }
      );
    }

    await query(
      `
      DELETE FROM club_projects
      WHERE project_id = $1
      `,
      [projectId]
    );

    return NextResponse.json({ message: "Project deleted" });
  } catch (err) {
    console.error("Delete Project Error:", err);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}
