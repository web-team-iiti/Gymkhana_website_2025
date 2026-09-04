"use server";

import { query } from "@/config/db";
import { auth } from "@/auth";

export async function submitContention(formData) {
  const session = await auth();
  
  if (!session || session.user.role !== "contingent_leader") {
    return { error: "Unauthorized" };
  }

  const scoreId = formData.get("score_id");
  const reason = formData.get("reason");
  const contingentId = session.user.contingent_id;

  if (!scoreId || !reason) {
    return { error: "Reason is required." };
  }

  try {
    // Security check: Verify the score belongs to their contingent
    const scoreRes = await query("SELECT contingent_id FROM ibcc_scores WHERE id = $1", [scoreId]);
    if (scoreRes.rowCount === 0) return { error: "Score not found." };
    if (scoreRes.rows[0].contingent_id !== contingentId) {
      return { error: "Security Error: You can only raise contentions for your own contingent's scores." };
    }

    await query(`
      INSERT INTO ibcc_contentions (score_id, contingent_id, reason)
      VALUES ($1, $2, $3)
    `, [scoreId, contingentId, reason]);

    return { success: true };
  } catch (error) {
    console.error("Contention Insert Error:", error);
    return { error: "Failed to submit contention." };
  }
}
