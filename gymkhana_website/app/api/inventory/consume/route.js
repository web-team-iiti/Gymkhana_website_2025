import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

export async function PUT(req) {
    try {
        const session = await auth();
        // 1. Security: Only GS can consume items
        if (!session || session.user.role !== 'gs') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        } 
        const { id } = await req.json(); 
        if (!id) return NextResponse.json({ message: "ID required" }, { status: 400 }); 
        // 2. Database Update
        const sql = `UPDATE inventory SET status = 'CONSUMED' WHERE id = $1`;
        await query(sql, [id]); 
        return NextResponse.json({ message: "Status updated" }, { status: 200 }); 
    } catch (error) {
        console.error("Consume Error:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }
}