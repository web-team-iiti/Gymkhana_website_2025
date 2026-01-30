import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { query } from "@/config/db";
import { supabase } from "@/config/supabase";  

export async function DELETE(req) {
    try {
        const session = await auth();

        // 1. Check Role
        if (!session || session.user.role !== 'gs') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
        const { id } = await req.json();

        // 2. Get the PDF URL first
        const res = await query(`SELECT pdf_url FROM bills WHERE id = $1`, [id]);
        if (res.rows.length === 0) {
            return NextResponse.json({ message: "Bill not found" }, { status: 404 });
        }
        const fileUrl = res.rows[0].pdf_url;

        // 3. Delete from Supabase Storage
        // We reuse the client from your config, which uses the Service Role Key (Admin)
        if (fileUrl) {
            const pathParts = fileUrl.split('/inventory/');
            if (pathParts.length > 1) {
                const filePath = pathParts[1];
                const { error: storageError } = await supabase.storage.from('inventory').remove([filePath]);
                if (storageError) {
                    console.error("Storage Delete Warning:", storageError);
                }
            }
        }

        // 4. Delete from Database
        await query(`DELETE FROM bills WHERE id = $1`, [id]);
        return NextResponse.json({ message: "Deleted" });
    } catch (error) {
        console.error("Delete Error:", error);
        return NextResponse.json({ message: "Error", error: error.message }, { status: 500 });
    }
}