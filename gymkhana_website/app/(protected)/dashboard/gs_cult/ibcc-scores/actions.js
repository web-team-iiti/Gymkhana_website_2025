"use server";

import { query } from "@/config/db";
import { auth } from "@/auth";
import fs from "fs/promises";
import path from "path";

export async function submitScore(formData) {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_cult") {
    return { error: "Unauthorized" };
  }

  const eventId = formData.get("event_id");
  const contingentId = formData.get("contingent_id");
  const score = formData.get("score");
  const file = formData.get("judging_sheet");

  if (!eventId || !contingentId || !score) {
    return { error: "Event, contingent, and score fields are required." };
  }

  try {
    // Check if event exists
    const eventRes = await query("SELECT start_time FROM ibcc_events WHERE id = $1", [eventId]);
    if (eventRes.rowCount === 0) return { error: "Event not found." };

    const startTime = new Date(eventRes.rows[0].start_time);
    if (startTime > new Date()) {
      return { error: "You cannot submit scores for an event that hasn't started yet!" };
    }

    // Check if score already exists to delete old file
    const oldScoreRes = await query("SELECT judging_sheet_url FROM ibcc_scores WHERE event_id = $1 AND contingent_id = $2", [eventId, contingentId]);
    const oldFileUrl = oldScoreRes.rows.length > 0 ? oldScoreRes.rows[0].judging_sheet_url : null;

    let fileUrl = oldFileUrl; // Default to existing file (if any)

    if (file && file.size > 0) {
      // Upload file locally to public/uploads/ibcc
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}_${eventId}_${contingentId}.${fileExt}`;
      
      const uploadDir = path.join(process.cwd(), "public", "uploads", "ibcc");
      
      // Ensure directory exists
      try {
        await fs.access(uploadDir);
      } catch {
        await fs.mkdir(uploadDir, { recursive: true });
      }

      const filePath = path.join(uploadDir, fileName);
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      
      await fs.writeFile(filePath, buffer);
      
      fileUrl = `/uploads/ibcc/${fileName}`;

      // Delete old file if it exists and a new one is being uploaded
      if (oldFileUrl) {
        try {
          const oldFilePath = path.join(process.cwd(), "public", oldFileUrl);
          await fs.unlink(oldFilePath);
        } catch (err) {
          console.error("Failed to delete old judging sheet:", err);
        }
      }
    }

    // Insert into DB
    await query(`
      INSERT INTO ibcc_scores (event_id, contingent_id, score, judging_sheet_url, submitted_by)
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT (event_id, contingent_id) 
      DO UPDATE SET score = EXCLUDED.score, judging_sheet_url = EXCLUDED.judging_sheet_url, submitted_by = EXCLUDED.submitted_by
    `, [eventId, contingentId, score, fileUrl, session.user.id]);

    return { success: true };
  } catch (error) {
    console.error("Upload/Insert Error:", error);
    return { error: "Failed to submit score. Please try again." };
  }
}

export async function deleteScore(eventId, contingentId) {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_cult") {
    return { error: "Unauthorized" };
  }

  try {
    // 1. Get the file url
    const oldScoreRes = await query("SELECT judging_sheet_url FROM ibcc_scores WHERE event_id = $1 AND contingent_id = $2", [eventId, contingentId]);
    if (oldScoreRes.rows.length === 0) return { error: "Score not found." };
    const fileUrl = oldScoreRes.rows[0].judging_sheet_url;

    // 2. Delete from DB
    await query("DELETE FROM ibcc_scores WHERE event_id = $1 AND contingent_id = $2", [eventId, contingentId]);

    // 3. Delete file
    if (fileUrl) {
      try {
        const filePath = path.join(process.cwd(), "public", fileUrl);
        await fs.unlink(filePath);
      } catch (err) {
        console.error("Failed to delete judging sheet during score deletion:", err);
      }
    }

    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { error: "Failed to delete score." };
  }
}
