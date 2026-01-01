import { NextResponse } from "next/server";
import { query } from "@/config/db";

export async function GET(req, { params }) {
    // FIX: Await params before using it
    const { id } = await params;

    const sql = `SELECT * FROM events WHERE id = $1`;
    const res = await query(sql, [id]);

    if (res.rows.length === 0) {
        return NextResponse.json({ message: "Not found" }, { status: 404 });
    }

    return NextResponse.json(res.rows[0]);
}