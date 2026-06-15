import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { auth } from "@/auth";
import { supabase } from "@/config/supabase";

export async function DELETE(req, { params }) {
  try {
    const session = await auth();
    const { id } = await params;
    
    // Auth Check
    if (!session || session.user.role !== "gs") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    // 1. Fetch the achievement to get the image URL
    const getSql = "SELECT image_url FROM council_achievements WHERE id = $1";
    const result = await query(getSql, [id]);
    
    if (result.rows.length === 0) {
        return NextResponse.json({ message: "Achievement not found" }, { status: 404 });
    }

    const imageUrl = result.rows[0].image_url;

    // 2. Delete from Supabase Storage if an image exists
    if (imageUrl) {
        // Extract filename from the public URL
        // Example URL: https://xyz.supabase.co/storage/v1/object/public/achievement_images/1234-abc.jpg
        const urlParts = imageUrl.split('/');
        const fileName = urlParts[urlParts.length - 1];

        const { error: deleteError } = await supabase
            .storage
            .from('achievement_images')
            .remove([fileName]);

        if (deleteError) {
            console.error("Supabase Storage Delete Error:", deleteError);
            // We can choose to continue deleting the DB record even if storage delete fails
        }
    }

    // 3. Delete from Database
    const deleteSql = "DELETE FROM council_achievements WHERE id = $1";
    await query(deleteSql, [id]);

    return NextResponse.json({ message: "Achievement deleted successfully" }, { status: 200 });

  } catch (error) {
    console.error("Achievement Delete Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
