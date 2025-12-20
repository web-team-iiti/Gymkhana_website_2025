"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

// 🧩 Mock Data
const mockClubs = [
  {
    id: 1,
    name: "Astronomy Club",
    category: "Cultural",
    tag: "CULTURAL",
    description: "From street plays to stage shows, express yourself and explore the world of theatre.",
    imageUrl: "astronomyclub.jpg",
  },
  {
    id: 2,
    name: "The Programming Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Hone your algorithm skills, solve complex problems, and compete in global hackathons.",
    imageUrl: "pclub.png",
  },
  {
    id: 3,
    name: "Aeromodelling Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Join us for track and field events. Stay fit, build discipline, and represent the institute.",
    imageUrl: "aeroclub.jpg",
  },
  {
    id: 4,
    name: "GDSC",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Unleash your creativity through painting, sketching, and digital art workshops.",
    imageUrl: "gdsc.png",
  },
  {
    id: 5,
    name: "Electronics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Celebrate the diversity of India by promoting cultural exchange between states.",
    imageUrl: "electronics.png",
  },
  {
    id: 6,
    name: "Cynaptics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "From casual games to competitive e-sports, find your team and join the fun.",
    imageUrl: "cynaptics.jpg",
  },
];

// ------------------------------------------------------
// ClubCard Component
// ------------------------------------------------------
const ClubCard = ({ club }) => {
  const tagColors = {
    TECHNICAL: "bg-blue-500/20 text-blue-300",
    CULTURAL: "bg-yellow-500/20 text-yellow-300",
    SPORTS: "bg-green-500/20 text-green-300",
  };

  return (
    <div
      className="relative w-52 h-64 sm:w-72 sm:h-80 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-700 
      bg-gray-900/60 backdrop-blur-md shadow-lg transition-transform duration-500 hover:scale-105 group"
      // Mobile: Ensure min-width so it doesn't shrink
      style={{ minWidth: "250px" }} 
    >
      <img
        src={club.imageUrl}
        alt={club.name}
        className="w-full h-full object-cover opacity-70 group-hover:opacity-30 transition-opacity duration-500"
      />

      {/* Overlay on hover (Visible by default on Touch if logic required, but mostly hover) */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-4
        opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/40"
      >
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full mb-3 ${tagColors[club.tag] || "bg-gray-500/20 text-gray-300"}`}
        >
          {club.tag}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{club.name}</h3>
        <p className="text-sm text-gray-300 line-clamp-3">{club.description}</p>
      </div>
    </div>
  );
};

// ------------------------------------------------------
// Main Page Component
// ------------------------------------------------------
const DiscoverClubsPage = () => {
  const scrollRef = useRef(null);
  const router = useRouter();

  // Filter state
  const [filter, setFilter] = useState("ALL");
  const [isPaused, setIsPaused] = useState(false);

  // Filter clubs based on selected category
  const filteredClubs =
    filter === "ALL"
      ? mockClubs
      : mockClubs.filter((club) => club.category.toUpperCase() === filter);

  // 🔄 DUPLICATE LIST: This is the key to seamless infinite scrolling without "stopping"
  const displayClubs = [...filteredClubs, ...filteredClubs, ...filteredClubs];

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let animationFrameId;
    const scrollSpeed = 0.5;

    const scrollStep = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        
        // 🔄 SEAMLESS RESET LOGIC
        // Instead of checking for "end of scroll", we check if we've scrolled past 
        // one-third of the total width (the length of one set of items).
        // Then we snap back to 0. This prevents the "stopping" bug.
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 3) {
           scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [filter, isPaused]); 

  const handleClick = () => router.push("/club/technical");

  return (
    <div className="w-full flex flex-col items-center justify-center text-white bg-transparent overflow-hidden">
      
      <div className="text-center mb-8 mt-12 px-4">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold mb-3 drop-shadow-lg"><span className="text-yellow-500">OUR</span> CLUBS</h1>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto drop-shadow-md">
          Explore the diverse range of clubs at IIT Indore
        </p>
      </div>

      {/* 🟢 Filter Buttons - Mobile Optimized (flex-wrap) */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4">
        {["ALL", "TECHNICAL", "SPORTS", "CULTURAL"].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setFilter(cat);
              // Reset scroll position when filter changes
              if (scrollRef.current) scrollRef.current.scrollLeft = 0;
            }}
            className={`sm:px-4 px-2 py-1 md:px-5 md:py-2 rounded-full text-xs md:text-sm font-semibold transition-colors duration-300 border backdrop-blur-sm
              ${filter === cat
                ? "bg-blue-600/80 border-blue-500 text-white"
                : "bg-gray-900/40 border-gray-600 text-gray-300 hover:bg-gray-800/60"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🌀 Horizontal Scrolling Section */}
      <div
        ref={scrollRef}
        // Mobile Layout: Reduced padding (px-4), added hide-scrollbar logic
        className="flex overflow-x-hidden gap-6 w-full px-4 md:px-16 py-8 relative no-scrollbar"
        
        // 🖱️ Mouse Interaction (Desktop)
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        
        // 📱 Touch Interaction (Mobile) - CRITICAL for smooth swiping
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => {
            // Optional: Add a small delay before resuming so the user doesn't lose their spot immediately
            setTimeout(() => setIsPaused(false), 1000);
        }}
      >
        {displayClubs.length > 0 ? (
          displayClubs.map((club, index) => <ClubCard key={`${club.id}-${index}`} club={club} />)
        ) : (
          <p className="text-gray-400 text-center w-full">
            No clubs found in this category.
          </p>
        )}
      </div>

      <div onClick={handleClick} className="my-4">
        <button className="bg-blue-700/90 hover:bg-blue-800 flex items-center gap-2 backdrop-blur-sm rounded-full py-2 px-6 shadow-lg transition-all text-sm md:text-base font-medium">
          View All Clubs
          <FaArrowRight/>
        </button>
      </div>
    </div>
  );
};

export default DiscoverClubsPage;