import React from 'react';
import { query } from "@/config/db"; // Import DB connection
import Clubs from '@/components/Clubs';
import RadialMenu from '@/components/Councils';
import UpcomingEvents from '@/components/NewsEvents';
import IBCCPodiumHome from '@/components/ibcc/IBCCPodiumHome';

export const revalidate = 60; // Revalidate every 60 seconds

// 1. Fetch Events on the Server
async function getHomeEvents() {
  try {
    // Get 5 upcoming events
    const sql = `
      SELECT * FROM events 
      WHERE event_date >= CURRENT_DATE 
      ORDER BY event_date ASC 
    `;
    const res = await query(sql);
    return res.rows;
  } catch (error) {
    console.error("Failed to fetch home events:", error);
    return [];
  }
}

async function getCouncils() {
  try {
    const sql = "SELECT id, name FROM councils";
    const res = await query(sql);
    return res.rows;
  } catch (error) {
    return [];
  }
}

// 3. Fetch IBCC Top 3 Leaderboard
async function getIBCCLeaderboard() {
  try {
    const sql = `
      SELECT c.id, c.name, COALESCE(SUM(s.score), 0) as total_score
      FROM ibcc_contingents c
      LEFT JOIN ibcc_scores s ON c.id = s.contingent_id
      GROUP BY c.id, c.name
      ORDER BY total_score DESC
      LIMIT 3
    `;
    const res = await query(sql);
    return res.rows.map(r => ({ ...r, total_score: parseFloat(r.total_score) }));
  } catch (error) {
    return [];
  }
}

// 4. Fetch Live IBCC Event
async function getLiveIBCCEvent() {
  try {
    const sql = `
      SELECT * FROM ibcc_events 
      WHERE start_time <= CURRENT_TIMESTAMP 
      AND end_time >= CURRENT_TIMESTAMP
      LIMIT 1
    `;
    const res = await query(sql);
    let liveEvent = res.rows[0] || null;
    
    // Serialize dates for Client Component passing
    if (liveEvent) {
      liveEvent.start_time = liveEvent.start_time.toISOString();
      liveEvent.end_time = liveEvent.end_time.toISOString();
    }
    return liveEvent;
  } catch (error) {
    return null;
  }
}

// 2. Async Server Component
const Page = async () => {
  const events = await getHomeEvents();
  const dbCouncils = await getCouncils();
  const leaderboard = await getIBCCLeaderboard();
  const liveEvent = await getLiveIBCCEvent();

  return (
    <div>
      {/* Radial Menu */}
      <RadialMenu dbCouncils={dbCouncils} />

      {/* 🌌 Unified Galaxy Wrapper */}
      <div className="relative w-full overflow-hidden bg-gray-950">

        {/* Static CSS Galaxy Background */}
        <div className="absolute inset-0 z-0 bg-[#030308] overflow-hidden">
          {/* Glowing Core */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_30%,#1e3a8a33,#030308_100%)]"></div>
          
          {/* Grain Texture for realistic space feel */}
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-screen"></div>
          
          {/* Layer 1: Large faint stars */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:50px_50px] opacity-10"></div>
          
          {/* Layer 2: Small bright stars (offset) */}
          <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:30px_30px] [background-position:15px_15px] opacity-20"></div>

          {/* Golden accent glow to match Gymkhana Gold theme */}
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-yellow-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 pb-20">
          
          {/* IBCC Podium Section */}
          <IBCCPodiumHome leaderboard={leaderboard} liveEvent={liveEvent} />

          <Clubs />

          {/* Pass the real DB events to the component */}
          <UpcomingEvents events={events} />
        </div>
      </div>
    </div>
  );
};

export default Page;