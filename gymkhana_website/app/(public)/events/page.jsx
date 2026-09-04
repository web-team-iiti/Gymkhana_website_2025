import React from "react";
import { query } from "@/config/db";
import SearchInput from "@/components/SearchInput";
import EventFilter from "@/components/EventFilter";
import PublicEventsList from "@/components/PublicEventsList";


async function getPublicEvents(queryText, filter) {
  let sql = `SELECT * FROM events WHERE 1=1`;
  const params = [];
  let paramIndex = 1;

  // 1. Search Logic
  if (queryText) {
    sql += ` AND (title ILIKE $${paramIndex} OR subtitle ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
    params.push(`%${queryText}%`);
    paramIndex++;
  }

  // 2. Filter Logic
  if (filter === 'upcoming') {
    sql += ` AND event_date > CURRENT_DATE`;
  } else if (filter === 'completed') {
    sql += ` AND event_date < CURRENT_DATE`;
  } else if (filter === 'live') {
    sql += ` AND event_date::date = CURRENT_DATE`;
  }

  // 3. SMART SORTING LOGIC
  if (filter === 'completed') {
    sql += ` ORDER BY event_date DESC`;
  } else if (filter === 'upcoming' || filter === 'live') {
    sql += ` ORDER BY event_date ASC`;
  } else {
    // "ALL EVENTS" View (Split Sort)
    sql += ` 
      ORDER BY 
      CASE WHEN event_date >= CURRENT_DATE THEN 0 ELSE 1 END ASC,
      CASE WHEN event_date >= CURRENT_DATE THEN event_date END ASC,
      CASE WHEN event_date < CURRENT_DATE THEN event_date END DESC
    `;
  }

  const res = await query(sql, params);
  return res.rows;
}

export default async function EventsPage({ searchParams }) {
  // Await params (Next.js 15 requirement)
  const { query: queryText, filter } = await searchParams;

  const events = await getPublicEvents(queryText, filter);

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden">

      {/* Static CSS Background (Replacing Heavy FloatingLines) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden pointer-events-none">
        {/* Glow 1: Cyan (Top Left) */}
        <div className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] bg-[#00e5ff] opacity-10 blur-[120px] rounded-full"></div>
        
        {/* Glow 2: Blue (Center Right) */}
        <div className="absolute top-[30%] -right-[20%] w-[50%] h-[50%] bg-[#3b82f6] opacity-10 blur-[100px] rounded-full"></div>
        
        {/* Glow 3: Purple (Bottom Center) */}
        <div className="absolute -bottom-[20%] left-[20%] w-[60%] h-[60%] bg-[#9333ea] opacity-10 blur-[120px] rounded-full"></div>

        {/* Subtle texture for depth */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.08] mix-blend-screen"></div>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-24">

        {/* --- HEADER SECTION --- */}
        <div className="flex flex-col items-center mb-12 space-y-8">
          <div className="text-center">
            <h2 className="text-xl sm:text-2xl md:text-4xl font-extrabold text-white uppercase tracking-wider mb-4">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                Gymkhana
              </span> Events
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm md:text-base">
              Explore the latest sports, cultural, and technical events.
            </p>
          </div>

          {/* SEARCH & FILTER UI (Fixed Mobile Layout) */}
          <div className="w-full max-w-2xl flex gap-3 items-center justify-center">

            {/* Search Bar - Grows to fill space */}
            <div className="flex-1">
              <SearchInput placeholder="Search events..." />
            </div>

            {/* Filter Button - Fixed width, sits beside search */}
            <div className="shrink-0">
              <EventFilter />
            </div>

          </div>
        </div>

        {/* --- LIST SECTION --- */}
        <PublicEventsList events={events} />
      </div>
    </div>
  );
}