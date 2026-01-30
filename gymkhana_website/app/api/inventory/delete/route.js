import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";

export async function DELETE(req) {
    try {
        const session = await auth(); 
        if (!session || session.user.role !== 'gs') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await req.json(); 
        await query(`DELETE FROM inventory WHERE id = $1`, [id]);
        return NextResponse.json({ message: "Deleted successfully" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}