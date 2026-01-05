import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

export async function PUT(req) {
    try {
        const session = await auth();

        // 1. Check Role
        if (!session || session.user.role !== 'gs') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const { id, name, council, tenure, club_name, description, type } = data;

        if (!id || !name || !council) {
            return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
        }

        // 2. Update Database
        const sql = `
            UPDATE inventory 
            SET name = $1, council = $2, tenure = $3, club_name = $4, description = $5, type = $6
            WHERE id = $7
        `;

        const finalClubName = club_name && club_name.trim() !== "" ? club_name : null;

        await query(sql, [
            name,
            council,
            tenure,
            finalClubName,
            description,
            type,
            id
        ]);
        return NextResponse.json({ message: "Updated successfully" });
    } catch (error) {
        console.error("Edit Error:", error);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}