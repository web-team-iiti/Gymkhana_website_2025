"use client";
import React, { useEffect, useRef, useState } from "react";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";

// --- mockEvents ---
const mockEvents = [
  {
    id: 1,
    title: "Gymkhana Sports",
    subtitle: "Inter-Hostel Tournament",
    date: "Oct 28, 2025",
    description: "Annual inter-hostel sports competition. Come cheer for your hostel!",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Gymkhana+Sports",
  },
  {
    id: 2,
    title: "Cultural Night",
    subtitle: "Rhythm of India",
    date: "Nov 05, 2025",
    description: "A celebration of diverse Indian art forms, music, and dance.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Cultural+Night",
  },
  {
    id: 3,
    title: "Tech Workshop",
    subtitle: "AI & Machine Learning",
    date: "Nov 12, 2025",
    description: "Hands-on workshop on the fundamentals of AI and ML with Python.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Tech+Workshop",
  },
  {
    id: 4,
    title: "Academic Seminar",
    subtitle: "Career Pathways",
    date: "Nov 15, 2025",
    description: "Learn about diverse career opportunities after graduation from industry experts.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Career+Seminar",
  },
  {
    id: 5,
    title: "Coding Competition",
    subtitle: "Code Sprint '25",
    date: "Nov 20, 2025",
    description: "Put your problem-solving skills to the test in our annual coding sprint.",
    imageUrl: "https://placehold.co/600x400/1a202c/9ca3af?text=Code+Sprint",
  },
];

// --- EventCard ---
const EventCard = ({ event }) => {
  return (
    <div
      className="flex-shrink-0 w-80 bg-gray-900/60 backdrop-blur-md border border-gray-700 rounded-lg 
      shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 
      hover:border-blue-400 relative group"
      style={{ minWidth: 320 }}
    >
      <img
        className="w-full h-40 object-cover transition-all duration-300 group-hover:opacity-80"
        src={event.imageUrl}
        alt={event.title}
        onError={(e) => {
          e.target.src = "https://placehold.co/600x400/1a202c/9ca3af?text=Event+Image";
        }}
      />
      <div className="p-5">
        <h3 className="text-lg font-bold text-white">{event.title}</h3>
        <p className="text-sm font-medium text-blue-400">{event.subtitle}</p>

        <div className="flex items-center text-xs text-gray-400 mt-3">
          <FaCalendarAlt className="mr-2 text-gray-400" />
          <span>{event.date}</span>
        </div>

        <p className="mt-3 text-sm text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {event.description}
        </p>

        <a
          href="#"
          className="inline-block mt-4 text-blue-400 font-medium text-sm transition-colors hover:text-blue-300"
        >
          Learn More  
        </a>
      </div>
    </div>
  );
};

// --- Main UpcomingEvents ---
const UpcomingEvents = () => {
  const scrollRef = useRef(null);
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate events for seamless scrolling
  const displayEvents = [...mockEvents, ...mockEvents];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const scrollSpeed = 0.5; // Same speed as Clubs

    const scrollStep = () => {
      // Only scroll if not paused
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // Seamless loop logic:
        // If we have scrolled past half the width (the first set of items), reset to 0
        // This is smoother than waiting for the very end
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]); // Re-run effect if pause state changes

  return (
    <div className="w-full py-4 md:py-16 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-4xl my-2 font-bold text-center text-white uppercase tracking-wider drop-shadow-md">
          <span className="text-yellow-500">Upcoming</span> Events
        </h2>

        {/* Container with identical setup to Clubs:
            - overflow-hidden (hides scrollbar)
            - flex (horizontal layout)
            - removed 'scroll-smooth' to prevent fighting with JS
        */}
        <div ref={scrollRef}
          className="flex overflow-x-hidden gap-6 py-6"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayEvents.map((event, idx) => (
            <EventCard key={`${event.id}-${idx}`} event={event} />
          ))}
        </div>
      </div>

      <div onClick={() => router.push('/events')} className="mt-4 flex justify-center">
        <button className="bg-blue-700/90 hover:bg-blue-800 flex items-center gap-2 backdrop-blur-sm rounded-full py-2 px-4 shadow-lg transition-all">
          View All Events
          <FaArrowRight/>
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;