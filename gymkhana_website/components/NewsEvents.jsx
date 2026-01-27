"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCalendarAlt, FaRegCalendarTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

// --- EventCard ---
const EventCard = ({ event }) => {
  const displayImage = event.image_urls && event.image_urls.length > 0 
    ? event.image_urls[0] 
    : "https://placehold.co/600x400/1a202c/9ca3af?text=No+Image";

  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric"
  });

  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-2xl 
      shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 
      hover:border-blue-400 relative group"
      style={{ minWidth: 320 }}
    >
      <div className="h-40 w-full overflow-hidden relative">
        <img
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
          src={displayImage}
          alt={event.title}
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-white line-clamp-1">{event.title}</h3>
        <p className="text-sm font-medium text-blue-400 uppercase tracking-wider text-xs mt-1">{event.subtitle || "General Event"}</p>

        <div className="flex items-center text-xs text-gray-400 mt-3 bg-gray-800/50 p-1.5 rounded w-fit">
          <FaCalendarAlt className="mr-2 text-blue-400" />
          <span>{formattedDate}</span>
        </div>

        <p className="mt-3 text-sm text-gray-300 line-clamp-2 h-10 group-hover:text-white transition-colors">
          {event.description}
        </p>
      </div>
    </div>
  );
};

// --- Main Component ---
const UpcomingEvents = ({ events = [] }) => {
  const scrollRef = useRef(null);
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  // --- EMPTY STATE HANDLING ---
  if (!events || events.length === 0) {
    return (
      <div className="w-full py-16 bg-transparent text-white text-center">
        <div className="container mx-auto px-4">
            <h2 className="text-xl sm:text-2xl md:text-4xl mb-6 font-bold text-center text-white uppercase tracking-wider drop-shadow-md">
                <span className="text-yellow-500">Upcoming</span> Events
            </h2>
            
            <div className="flex flex-col items-center justify-center p-8 bg-gray-900/30 border border-gray-800 rounded-2xl max-w-lg mx-auto backdrop-blur-sm">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-4">
                    <FaRegCalendarTimes size={24} />
                </div>
                <h3 className="text-lg font-bold text-gray-300">No Upcoming Events</h3>
                <p className="text-gray-500 text-sm mt-2">
                    There are no scheduled events at the moment. Check back later!
                </p>
                <button 
                    onClick={() => router.push('/events')}
                    className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2 transition-colors"
                >
                    View Past Events <FaArrowRight size={12} />
                </button>
            </div>
        </div>
      </div>
    );
  }

  // --- CAROUSEL LOGIC (Only runs if we have events) ---
  const displayEvents = events.length < 5 
    ? [...events, ...events, ...events, ...events] 
    : [...events, ...events];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const scrollSpeed = 0.5;

    const scrollStep = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, displayEvents.length]);

  return (
    <div className="w-full py-8 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-4xl mb-6 font-bold text-center text-white uppercase tracking-wider drop-shadow-md">
          <span className="text-yellow-500">Upcoming</span> Events
        </h2>

        <div 
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6 py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayEvents.map((event, idx) => (
            <EventCard key={`${event.id}-${idx}`} event={event} />
          ))}
        </div>
      </div>

      <div onClick={() => router.push('/events')} className="mt-6 flex justify-center cursor-pointer">
        <button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 backdrop-blur-sm rounded-full py-2.5 px-6 shadow-lg transition-all font-semibold text-sm">
          View All Events
          <FaArrowRight/>
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;