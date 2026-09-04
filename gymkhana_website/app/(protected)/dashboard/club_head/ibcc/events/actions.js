"use server";

import { query } from "@/config/db";
import { auth } from "@/auth";

export async function updateEventByClubHead(formData) {
  const session = await auth();

  if (!session || session.user.role !== "club_head") {
    return { error: "Unauthorized" };
  }

  const clubId = session.user.club_id;
  const eventId = formData.get("id");
  const name = formData.get("name");
  let startTime = formData.get("start_time");
  let endTime = formData.get("end_time");
  const venue = formData.get("venue");

  if (!eventId || !name || !startTime || !endTime) {
    return { error: "Required fields missing." };
  }

  // Append IST timezone offset so Postgres interprets it as IST instead of UTC
  if (startTime.length === 16) startTime += "+05:30";
  if (endTime.length === 16) endTime += "+05:30";

  if (new Date(startTime) >= new Date(endTime)) {
    return { error: "Start time must be strictly before the end time." };
  }

  try {
    // Security: Verify the event belongs to this club head's club
    const check = await query("SELECT club_id FROM ibcc_events WHERE id = $1", [eventId]);
    if (check.rowCount === 0) return { error: "Event not found." };
    if (check.rows[0].club_id !== clubId) {
      return { error: "Security Error: You can only edit events assigned to your club." };
    }

    await query(`
      UPDATE ibcc_events 
      SET name = $1, start_time = $2, end_time = $3, venue = $4
      WHERE id = $5 AND club_id = $6
    `, [name, startTime, endTime, venue || null, eventId, clubId]);

    return { success: true };
  } catch (error) {
    console.error("Club Head Event Update Error:", error);
    return { error: "Failed to update event." };
  }
}
