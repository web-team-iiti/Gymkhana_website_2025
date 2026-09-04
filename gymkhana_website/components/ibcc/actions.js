"use server";

import { query } from "@/config/db";
import { auth } from "@/auth";

function checkAdmin(session) {
  if (!session || (session.user.role !== "gs_snt" && session.user.role !== "gs_cult" && session.user.role !== "gs")) {
    throw new Error("Unauthorized");
  }
}

export async function addEvent(formData) {
  const session = await auth();
  try {
    checkAdmin(session);
    
    const name = formData.get("name");
    let startTime = formData.get("start_time");
    let endTime = formData.get("end_time");
    const venue = formData.get("venue");
    const clubId = formData.get("club_id") || null;

    if (!name || !startTime || !endTime) return { error: "Required fields missing" };

    // Append IST timezone offset so Postgres interprets it as IST instead of UTC
    if (startTime.length === 16) startTime += "+05:30";
    if (endTime.length === 16) endTime += "+05:30";

    if (new Date(startTime) >= new Date(endTime)) {
      return { error: "Start time must be strictly before the end time." };
    }

    await query(`
      INSERT INTO ibcc_events (name, club_id, start_time, end_time, venue)
      VALUES ($1, $2, $3, $4, $5)
    `, [name, clubId, startTime, endTime, venue || null]);

    return { success: true };
  } catch (error) {
    console.error("DB Insert Error:", error);
    return { error: error.message || "Failed to add event" };
  }
}

export async function deleteEvent(eventId) {
  const session = await auth();
  try {
    checkAdmin(session);
    await query("DELETE FROM ibcc_events WHERE id = $1", [eventId]);
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete event" };
  }
}

export async function updateEvent(formData) {
  const session = await auth();
  try {
    checkAdmin(session);
    
    const id = formData.get("id");
    const name = formData.get("name");
    let startTime = formData.get("start_time");
    let endTime = formData.get("end_time");
    const venue = formData.get("venue");
    const clubId = formData.get("club_id") || null;

    if (!id || !name || !startTime || !endTime) return { error: "Required fields missing" };

    // Append IST timezone offset so Postgres interprets it as IST instead of UTC
    if (startTime.length === 16) startTime += "+05:30";
    if (endTime.length === 16) endTime += "+05:30";

    if (new Date(startTime) >= new Date(endTime)) {
      return { error: "Start time must be strictly before the end time." };
    }

    await query(`
      UPDATE ibcc_events 
      SET name = $1, club_id = $2, start_time = $3, end_time = $4, venue = $5
      WHERE id = $6
    `, [name, clubId, startTime, endTime, venue || null, id]);

    return { success: true };
  } catch (error) {
    console.error("DB Update Error:", error);
    return { error: error.message || "Failed to update event" };
  }
}

export async function resolveContention(formData) {
  const session = await auth();
  try {
    checkAdmin(session);
    
    const contentionId = formData.get("contention_id");
    const resolutionNotes = formData.get("resolution_notes");

    await query(`
      UPDATE ibcc_contentions 
      SET status = 'resolved', resolution_notes = $2
      WHERE id = $1
    `, [contentionId, resolutionNotes]);

    return { success: true };
  } catch (error) {
    return { error: "Failed to resolve contention" };
  }
}

export async function promoteToContingentLeader(email, name) {
  const session = await auth();
  try {
    checkAdmin(session);
    
    if (!email || !name) return { error: "Name and Email are required." };

    // UPSERT the user: if they don't exist, create them. If they do, update their role.
    await query(`
      INSERT INTO users (id, name, email, role) 
      VALUES (gen_random_uuid(), $1, $2, 'contingent_leader')
      ON CONFLICT (email) 
      DO UPDATE SET role = 'contingent_leader', name = EXCLUDED.name
    `, [name, email]);

    return { success: true };
  } catch (error) {
    console.error("Error adding leader:", error);
    return { error: "Failed to add leader." };
  }
}

export async function addContingent(formData) {
  const session = await auth();
  try {
    checkAdmin(session);
    
    const name = formData.get("name");
    const leaderIds = formData.getAll("leader_ids"); // Array of UUIDs

    if (!name) return { error: "Contingent name is required." };

    // Insert contingent
    const res = await query(`
      INSERT INTO ibcc_contingents (name)
      VALUES ($1) RETURNING id
    `, [name]);

    const newId = res.rows[0].id;

    // Insert leaders
    if (leaderIds && leaderIds.length > 0) {
      for (const leaderId of leaderIds) {
        if (leaderId) {
          await query(`
            INSERT INTO ibcc_contingent_leaders (contingent_id, user_id)
            VALUES ($1, $2) ON CONFLICT DO NOTHING
          `, [newId, leaderId]);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("DB Insert Error:", error);
    return { error: error.message || "Failed to add contingent" };
  }
}

export async function deleteContingent(id) {
  const session = await auth();
  try {
    checkAdmin(session);
    await query("DELETE FROM ibcc_contingents WHERE id = $1", [id]);
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete contingent" };
  }
}

export async function updateContingent(formData) {
  const session = await auth();
  try {
    checkAdmin(session);
    
    const id = formData.get("id");
    const name = formData.get("name");
    const leaderIds = formData.getAll("leader_ids");

    if (!id || !name) return { error: "ID and Contingent name are required." };

    // Update contingent name
    await query(`
      UPDATE ibcc_contingents 
      SET name = $1
      WHERE id = $2
    `, [name, id]);

    // Update leaders by clearing and re-inserting
    await query(`DELETE FROM ibcc_contingent_leaders WHERE contingent_id = $1`, [id]);
    
    if (leaderIds && leaderIds.length > 0) {
      for (const leaderId of leaderIds) {
        if (leaderId) {
          await query(`
            INSERT INTO ibcc_contingent_leaders (contingent_id, user_id)
            VALUES ($1, $2) ON CONFLICT DO NOTHING
          `, [id, leaderId]);
        }
      }
    }

    return { success: true };
  } catch (error) {
    console.error("DB Update Error:", error);
    return { error: error.message || "Failed to update contingent" };
  }
}
