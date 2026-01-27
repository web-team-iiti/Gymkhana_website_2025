import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { auth } from "@/auth";

export async function PUT(req) {
    try {
        const session = await auth(); 
        if (!session || session.user.role !== "gs") {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { id, title, subtitle, date, description } = body;

        const sql = `
      UPDATE events 
      SET title = $1, subtitle = $2, event_date = $3, description = $4, updated_at = NOW()
      WHERE id = $5
    `;

        await query(sql, [title, subtitle, date, description, id]);

        return NextResponse.json({ message: "Updated successfully" });

    } catch (error) {
        console.error("Update Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}