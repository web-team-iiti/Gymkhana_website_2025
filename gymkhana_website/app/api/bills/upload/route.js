import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { createClient } from "@supabase/supabase-js";
import { query } from "@/config/db";

// Initialize Supabase Admin
const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false } }
);

export async function POST(req) {
    try {
        const session = await auth();

        // 1. FIX: Check for the correct full role name
        if (!session || session.user.role !== 'gs') {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const formData = await req.formData();
        const file = formData.get("file");
        const entityId = formData.get("entity_id");
        const entityName = formData.get("entity_name");

        // 2. FIX: Ensure category is Uppercase to match DB Constraint
        const rawCategory = formData.get("category");
        const category = rawCategory ? rawCategory.toUpperCase() : null;

        const description = formData.get("description") || "No description";

        // 3. DEBUG: Log what we received (Check your VS Code Terminal when you upload)
        console.log("Upload Attempt:", { entityId, entityName, category, fileSize: file?.size });

        if (!file || !entityId || !category) {
            return NextResponse.json({ message: "Missing required data (file, entity_id, or category)" }, { status: 400 });
        }

        // 4. Upload File
        const fileExt = file.name.split('.').pop();
        const fileName = `bills/${Date.now()}_${file.name.replace(/\s/g, '_')}`;
        const arrayBuffer = await file.arrayBuffer();

        const { error: uploadError } = await supabase.storage
            .from("inventory")
            .upload(fileName, Buffer.from(arrayBuffer), { contentType: file.type, upsert: false });

        if (uploadError) {
            console.error("Supabase Error:", uploadError);
            throw new Error(uploadError.message);
        }

        const { data: urlData } = supabase.storage.from("inventory").getPublicUrl(fileName);
        const billUrl = urlData.publicUrl;

        // 5. Insert into DB
        const sql = `
            INSERT INTO bills (name, description, pdf_url, category, entity_id, entity_name, created_by)
            VALUES ($1, $2, $3, $4, $5, $6, $7)
        `;

        await query(sql, [
            "Purchase Bill",
            description,
            billUrl,
            category, // Now definitely 'INVENTORY' or 'EVENT'
            entityId, // Must be a valid UUID
            entityName,
            session.user.id
        ]);

        return NextResponse.json({ message: "Success" }, { status: 201 });

    } catch (error) {
        // This will print the ACTUAL error to your terminal
        console.error("FULL UPLOAD ERROR:", error);
        return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
    }
}