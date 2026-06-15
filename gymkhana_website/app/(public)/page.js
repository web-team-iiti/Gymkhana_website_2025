import React from 'react';
import { query } from "@/config/db"; // Import DB connection
import Clubs from '@/components/Clubs';
import RadialMenu from '@/components/Councils';
import UpcomingEvents from '@/components/NewsEvents';
import Galaxy from '@/components/Galaxy';

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

// 2. Async Server Component
const Page = async () => {
  const events = await getHomeEvents();
  const dbCouncils = await getCouncils();

  return (
    <div>
      {/* Radial Menu */}
      <RadialMenu dbCouncils={dbCouncils} />

      {/* 🌌 Unified Galaxy Wrapper */}
      <div className="relative w-full overflow-hidden bg-gray-950">

        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0}
            hueShift={240}
          />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 pb-20">
          <Clubs />

          {/* Pass the real DB events to the component */}
          <UpcomingEvents events={events} />
        </div>
      </div>
    </div>
  );
};

export default Page;