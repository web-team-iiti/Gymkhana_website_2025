import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { auth } from "@/auth";
import { supabase } from "@/config/supabase";

export async function POST(req) {
  try {
    const session = await auth();
    
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

    // Database Insert
    const sql = `
      INSERT INTO council_achievements (council_id, title, description, achievement_date, image_url)
      VALUES ($1, $2, $3, $4, $5)
    `;

    await query(sql, [
      councilId, 
      title, 
      description,
      date, 
      imageUrl
    ]);

    return NextResponse.json({ message: "Achievement created successfully" }, { status: 201 });

  } catch (error) {
    console.error("Achievement Create Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}
