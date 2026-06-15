import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { auth } from "@/auth";
import { supabase } from "@/config/supabase";

export async function PUT(req, { params }) {
  try {
    const session = await auth();
    const { id } = await params;
    
    // Auth Check
    if (!session || session.user.role !== "gs") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const councilId = formData.get("council_id");
    const title = formData.get("title");
    const date = formData.get("date");
    const description = formData.get("description");
    const file = formData.get("image"); 

    let imageUrl = null;

    // Upload Loop
    if (file && file !== "undefined" && file.size > 0) {
        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        // Convert to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to 'achievement_images' bucket
        const { error: uploadError } = await supabase
            .storage
            .from('achievement_images')
            .upload(fileName, buffer, {
                contentType: file.type,
                upsert: false
            });

        if (uploadError) {
            console.error("Supabase Upload Error:", uploadError);
            throw new Error("Failed to upload image");
        }

        // Get Public URL
        const { data: urlData } = supabase
            .storage
            .from('achievement_images')
            .getPublicUrl(fileName);
            
        imageUrl = urlData.publicUrl;
    }

    // Database Update
    let sql;
    let dbParams;
    if (imageUrl) {
        // First delete the old image if there is a new one uploaded
        const getSql = "SELECT image_url FROM council_achievements WHERE id = $1";
        const result = await query(getSql, [id]);
        if (result.rows.length > 0 && result.rows[0].image_url) {
            const oldUrlParts = result.rows[0].image_url.split('/');
            const oldFileName = oldUrlParts[oldUrlParts.length - 1];
            await supabase.storage.from('achievement_images').remove([oldFileName]);
        }

        sql = `
          UPDATE council_achievements 
          SET council_id = $1, title = $2, description = $3, achievement_date = $4, image_url = $5
          WHERE id = $6
        `;
        dbParams = [councilId, title, description, date, imageUrl, id];
    } else {
        // No new image uploaded, just update the text
        sql = `
          UPDATE council_achievements 
          SET council_id = $1, title = $2, description = $3, achievement_date = $4
          WHERE id = $5
        `;
        dbParams = [councilId, title, description, date, id];
    }

    await query(sql, dbParams);

    return NextResponse.json({ message: "Achievement updated successfully" }, { status: 200 });

  } catch (error) {
    console.error("Achievement Update Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
