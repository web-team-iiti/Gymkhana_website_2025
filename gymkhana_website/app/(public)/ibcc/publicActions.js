"use server";
import { query } from "@/config/db";

export async function fetchLiveIBCCData() {
  try {
    // 1. Fetch Top 3 Leaderboard
    const leaderboardSql = `
      SELECT c.id, c.name, COALESCE(SUM(s.score), 0) as total_score
      FROM ibcc_contingents c
      LEFT JOIN ibcc_scores s ON c.id = s.contingent_id
      GROUP BY c.id, c.name
      ORDER BY total_score DESC
      LIMIT 3
    `;
    const leaderboardRes = await query(leaderboardSql);
    const leaderboard = leaderboardRes.rows.map(r => ({ ...r, total_score: parseFloat(r.total_score) }));

    // 2. Fetch Live Event
    const liveEventSql = `
      SELECT * FROM ibcc_events 
      WHERE start_time <= CURRENT_TIMESTAMP 
      AND end_time >= CURRENT_TIMESTAMP
      LIMIT 1
    `;
    const liveEventRes = await query(liveEventSql);
    const liveEvent = liveEventRes.rows[0] || null;
    
    // Serialize date for passing from server to client
    if (liveEvent) {
      liveEvent.start_time = liveEvent.start_time.toISOString();
      liveEvent.end_time = liveEvent.end_time.toISOString();
    }

    return { leaderboard, liveEvent };
  } catch (error) {
    console.error("Error fetching live IBCC data:", error);
    return { leaderboard: [], liveEvent: null };
  }
}

export async function fetchFullLeaderboardData() {
  try {
    // Fetch contingents
    const contingentsRes = await query("SELECT * FROM ibcc_contingents");
    const contingents = contingentsRes.rows;

    // Fetch events
    const eventsRes = await query("SELECT id, name FROM ibcc_events");
    const events = eventsRes.rows;

    // Fetch scores
    const scoresRes = await query(`
      SELECT event_id, contingent_id, score 
      FROM ibcc_scores
    `);
    const scores = scoresRes.rows.map(s => ({
      ...s,
      score: parseFloat(s.score)
    }));

    return { contingents, events, scores };
  } catch (error) {
    console.error("Error fetching full leaderboard data:", error);
    return { contingents: [], events: [], scores: [] };
  }
}
