import { NextResponse } from "next/server";
import { query } from "@/config/db";
import { auth } from "@/auth";
import { supabase } from "@/config/supabase"; // Now imports from the shared file

export async function POST(req) {
  try {
    const session = await auth();
    
    // 1. Auth Check
    if (!session || session.user.role !== "gs") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const formData = await req.formData();
    const title = formData.get("title");
    const subtitle = formData.get("subtitle");
    const date = formData.get("date");
    const description = formData.get("description");
    
    // Events allow MULTIPLE files, so we use .getAll()
    const files = formData.getAll("images"); 

    const imageUrls = [];

    // 2. Upload Loop (Matches your Proposal Logic)
    for (const file of files) {
        // Create unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
        
        // Convert to Buffer
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to 'event-images' bucket
        const { error: uploadError } = await supabase
            .storage
            .from('event-images') // Ensure this bucket exists in Supabase
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
            .from('event-images')
            .getPublicUrl(fileName);
            
        imageUrls.push(urlData.publicUrl);
    }

    // 3. Database Insert
    const sql = `
      INSERT INTO events (title, subtitle, event_date, description, image_urls, created_by)
      VALUES ($1, $2, $3, $4, $5, $6)
    `;

    await query(sql, [
      title, 
      subtitle, 
      date, 
      description, 
      imageUrls, // Stored as array of strings
      session.user.id
    ]);

    return NextResponse.json({ message: "Event created successfully" }, { status: 201 });

  } catch (error) {
    console.error("Event Create Error:", error);
    return NextResponse.json({ message: "Server Error", error: error.message }, { status: 500 });
  }
}