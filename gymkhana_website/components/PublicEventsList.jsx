"use client";
import React from "react";
import Link from "next/link";
import { FaArrowRight, FaCalendarAlt, FaImage, FaRegFolderOpen, FaCircle, FaCheckCircle, FaClock } from "react-icons/fa";
import SpotlightCard from "@/components/Spotlight";

// Helper to get status
const getEventStatus = (dateString) => {
  const eventDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === today.getTime()) {
    return { label: "Live Now", color: "bg-red-600 text-white animate-pulse", icon: <FaCircle size={8} /> };
  } else if (eventDate > today) {
    return { label: "Upcoming", color: "bg-blue-600 text-white", icon: <FaClock size={10} /> };
  } else {
    return { label: "Completed", color: "bg-gray-800 text-gray-400", icon: <FaCheckCircle size={10} /> };
  }
};

const EventCard = ({ event }) => {
  const displayImage = event.image_urls && event.image_urls.length > 0 
    ? event.image_urls[0] 
    : "https://placehold.co/600x400/1a202c/9ca3af?text=No+Image";

  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });

  const status = getEventStatus(event.event_date);
  const isPast = status.label === "Completed";

  return (
    <SpotlightCard
      className="custom-spotlight-card h-full rounded-2xl p-0 border-none bg-transparent"
      spotlightColor="rgba(0, 229, 255, 0.2)"
    >
      <div className={`bg-gray-900/40 backdrop-blur-md border rounded-2xl overflow-hidden h-full flex flex-col transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group ${isPast ? 'border-gray-800' : 'border-gray-800 hover:border-blue-500/30 hover:shadow-blue-500/10'}`}>
        
        {/* Image Section */}
        <div className="h-48 w-full overflow-hidden relative">
          <img
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${isPast ? 'grayscale group-hover:grayscale-0' : ''}`}
            src={displayImage}
            alt={event.title}
          />
          
          {/* STATUS BADGE (Top Right) */}
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg backdrop-blur-md border border-white/10 ${status.color}`}>
            {status.icon} {status.label}
          </div>

          {/* Image Count (Bottom Right) */}
          {event.image_urls?.length > 1 && (
             <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-md text-white text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <FaImage /> {event.image_urls.length}
             </div>
          )}
        </div>

        {/* Text Section */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className={`text-xl font-bold leading-tight mb-1 transition-colors ${isPast ? 'text-gray-400 group-hover:text-white' : 'text-white group-hover:text-blue-400'}`}>
            {event.title}
          </h3>
          
          <p className="text-sm font-bold text-yellow-500 uppercase tracking-wider mb-4">
            {event.subtitle || "General Event"}
          </p>

          <div className="flex items-center text-sm text-gray-400 mb-4 bg-gray-800/50 p-2 rounded-lg w-fit">
            <FaCalendarAlt className={`mr-2 ${isPast ? 'text-gray-500' : 'text-blue-400'}`} />
            <span>{formattedDate}</span>
          </div>

          <p className="text-sm text-gray-300 line-clamp-3 mb-6 leading-relaxed">
            {event.description}
          </p>

          <div className="mt-auto">
            <Link
              href={`/events/${event.id}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all w-full justify-center ${isPast ? 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white' : 'text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-900/20 group-hover:shadow-blue-600/40'}`}
            >
              {isPast ? "View Gallery" : "Event Details"} 
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

// Main List Component
const PublicEventsList = ({ events }) => {
  if (!events || events.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500 border border-gray-800 border-dashed rounded-3xl bg-gray-900/20">
        <FaRegFolderOpen size={48} className="mb-4 opacity-50"/>
        <p className="text-xl font-bold text-gray-400">No events found.</p>
        <p className="text-sm">Try adjusting your search or filter.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
};

export default PublicEventsList;