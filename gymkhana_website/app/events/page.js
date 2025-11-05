"use client";
import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
  <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-lg 
      shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 hover:shadow-blue-500/30 
      hover:border-blue-400 relative group"
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

      <Link href={`/events/${event.id}`} 
        className="inline-block mt-4 text-blue-400 font-medium text-sm transition-colors hover:text-blue-300"
      >
        Learn More &rarr;
      </Link>
    </div>
  </div>
);

const UpcomingEvents = () => {
  const router = useRouter();

  return (
    <div className="w-full py-16 bg-gray-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-white uppercase tracking-wider">
          Upcoming Events
        </h2>

        {/* Display all cards in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
