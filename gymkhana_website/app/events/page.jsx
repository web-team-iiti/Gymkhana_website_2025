"use client";
import React from "react";
import { FaArrowRight, FaCalendarAlt } from "react-icons/fa";
// Removed unused useRouter since you are using Link
import Link from "next/link";
import SpotlightCard from "@/components/Spotlight";
import FloatingLines from "@/components/Floatingline";

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

const EventCard = ({ event }) => (
  <SpotlightCard
    className="custom-spotlight-card h-full rounded-lg p-0"
    spotlightColor="rgba(0, 229, 255, 0.2)"
  >
    <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg shadow-lg overflow-hidden h-full flex flex-col transition-transform duration-300 hover:scale-[1.02] hover:shadow-blue-500/30 hover:border-blue-400 relative group">
      <div className="h-40 w-full overflow-hidden">
        <img
          className="w-full h-full object-cover transition-all duration-300 group-hover:scale-110 group-hover:opacity-80"
          src={event.imageUrl}
          alt={event.title}
          onError={(e) => {
            e.target.src =
              "https://placehold.co/600x400/1a202c/9ca3af?text=Event+Image";
          }}
        />
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white">{event.title}</h3>
        <p className="text-sm font-medium text-blue-400">{event.subtitle}</p>

        <div className="flex items-center text-xs text-gray-400 mt-3">
          <FaCalendarAlt className="mr-2 text-gray-400" />
          <span>{event.date}</span>
        </div>

        <p className="mt-3 text-sm text-gray-300 line-clamp-3 mb-4">
          {event.description}
        </p>

        <div className="mt-auto">
          <Link
            href={`/events/${event.id}`}
            className="flex items-center gap-2 text-blue-400 font-medium text-sm transition-colors hover:text-blue-300"
          >
            Learn More 
            <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  </SpotlightCard>
);

const UpcomingEvents = () => {
  return (
    <div className="w-full relative min-h-screen bg-[#050505] overflow-hidden text-white">
      
      {/* 1. Background Animation Layer */}
      <div className="absolute inset-0 w-full h-full z-0 opacity-60">
        <FloatingLines
          linesGradient={["#00e5ff", "#3b82f6", "#9333ea"]}
          animationSpeed={1}
          parallax
          interactive
        />
      </div>

      {/* 2. Content Layer (z-index ensures it sits on top) */}
      <div className="relative z-10 container mx-auto px-4 py-16">
        <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-center text-white uppercase tracking-wider mb-12">
          <span className="text-yellow-500">Upcoming</span> Events
        </h2>

        {/* Display all cards in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;