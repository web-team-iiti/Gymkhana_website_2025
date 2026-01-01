import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import SearchInput from "@/components/SearchInput";
import EventFilter from "@/components/EventFilter"; 
import {
  FaCalendarAlt, FaPlus, FaImage, FaLayerGroup,
  FaClock, FaCheckCircle, FaPlayCircle
} from "react-icons/fa";

// 1. Fetch events with Search AND Filter Logic
async function getEvents(queryText, filter) {
  let sql = `SELECT * FROM events WHERE 1=1`; 
  const params = [];
  let paramIndex = 1;

  // Search Logic
  if (queryText) {
    sql += ` AND (title ILIKE $${paramIndex} OR subtitle ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
    params.push(`%${queryText}%`);
    paramIndex++;
  }

  // Filter Logic
  if (filter === 'upcoming') {
    sql += ` AND event_date > CURRENT_DATE`;
  } else if (filter === 'completed') {
    sql += ` AND event_date < CURRENT_DATE`;
  } else if (filter === 'live') {
    sql += ` AND event_date::date = CURRENT_DATE`;
  }

  sql += ` ORDER BY event_date DESC`;

  const res = await query(sql, params);
  return res.rows;
}

// 2. Status Helper
const getEventStatus = (dateString) => {
  const eventDate = new Date(dateString);
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate > now) {
    return { label: "Upcoming", color: "bg-blue-600/80 text-white border-blue-400/30", icon: <FaClock /> };
  } else if (eventDate.getTime() === now.getTime()) {
    return { label: "Live Today", color: "bg-red-600/90 text-white border-red-500/50 animate-pulse", icon: <FaPlayCircle /> };
  } else {
    return { label: "Completed", color: "bg-gray-800/80 text-gray-400 border-gray-700/50", icon: <FaCheckCircle /> };
  }
};

export default async function ManageEventsPage({ searchParams }) {
  // Await searchParams (Required for Next.js 15)
  const { query: queryText, filter } = await searchParams;
  const events = await getEvents(queryText, filter);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
      
      {/* --- HEADER --- */}
      <div className="flex flex-col gap-6 mb-8">
        
        {/* Row 1: Title & Add Button */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Events</h1>
            <p className="text-xs md:text-base text-gray-400 mt-1 hidden md:block">Publish events to the public website.</p>
          </div>

          <Link
            href="/dashboard/general_secretary/events/create"
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3.5 py-3 md:px-6 md:py-3 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-yellow-500/10"
          >
            <FaPlus size={16} /> 
            <span className="hidden md:inline">Add Event</span>
          </Link>
        </div>

        {/* Row 2: Search & Filter */}
        <div className="flex gap-3">
            {/* Search Input grows to fill available space */}
            <div className="flex-1">
                <SearchInput placeholder="Search events..." />
            </div>
            
            {/* Filter Button (Icon on mobile, List on Desktop) */}
            <div className="shrink-0">
                <EventFilter /> 
            </div>
        </div>
        
      </div>

      {/* --- EVENTS GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {events.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16 md:py-24 bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-800">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-600 mb-4">
                <FaLayerGroup size={28} />
            </div>
            <h3 className="text-white font-bold text-lg">No events found</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                Try adjusting your search or filters.
            </p>
          </div>
        ) : (
          events.map((event) => {
            const status = getEventStatus(event.event_date);

            return (
              <Link 
                href={`/dashboard/general_secretary/events/${event.id}`} 
                key={event.id}
                className="group block bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all shadow-xl"
              >
                {/* Image Preview */}
                <div className="relative aspect-video w-full bg-gray-950 overflow-hidden">
                  {event.image_urls && event.image_urls[0] ? (
                    <img 
                      src={event.image_urls[0]} 
                      alt={event.title} 
                      className={`w-full h-full object-cover transition-transform duration-700 ease-out ${status.label === "Completed" ? 'grayscale group-hover:grayscale-0' : 'group-hover:scale-105'}`}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full text-gray-700">
                      <FaImage size={32} />
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className={`absolute top-3 right-3 backdrop-blur-md border px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg ${status.color}`}>
                     {status.icon} {status.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5">
                  <div className="mb-3">
                      <h3 className={`font-bold text-lg leading-tight transition-colors line-clamp-1 ${status.label === 'Completed' ? 'text-gray-400 group-hover:text-white' : 'text-white group-hover:text-yellow-500'}`}>
                          {event.title}
                      </h3>
                      <p className="text-yellow-500/80 text-xs font-bold uppercase tracking-wider mt-1 truncate">
                          {event.subtitle || "General Event"}
                      </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                      <div className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs font-mono flex items-center gap-1.5">
                          <FaCalendarAlt className="text-gray-500" />
                          {new Date(event.event_date).toLocaleDateString(undefined, { 
                              month: 'short', day: 'numeric', year: 'numeric' 
                          })}
                      </div>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
}