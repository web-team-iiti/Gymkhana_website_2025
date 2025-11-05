"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

// 🧩 Mock Data
const mockClubs = [
  {
    id: 1,
    name: "Astronomy Club",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "From street plays to stage shows, express yourself and explore the world of theatre.",
    imageUrl: "astronomyclub.jpg",
  },
  {
    id: 2,
    name: "The Programming Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Hone your algorithm skills, solve complex problems, and compete in global hackathons.",
    imageUrl: "pclub.png",
  },
  {
    id: 3,
    name: "Aeromodelling Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Join us for track and field events. Stay fit, build discipline, and represent the institute.",
    imageUrl: "aeroclub.jpg",
  },
  {
    id: 4,
    name: "GDSC",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Unleash your creativity through painting, sketching, and digital art workshops.",
    imageUrl: "gdsc.png",
  },
  {
    id: 5,
    name: "Electronics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Celebrate the diversity of India by promoting cultural exchange between states.",
    imageUrl: "electronics.png",
  },
  {
    id: 6,
    name: "Cynaptics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "From casual games to competitive e-sports, find your team and join the fun.",
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
      className="relative w-60 h-66 flex-shrink-0 overflow-hidden rounded-2xl border border-gray-700 
      bg-gray-900 backdrop-blur-sm shadow-lg transition-transform duration-500 hover:scale-110 group"
    >
      <img
        src={club.imageUrl}
        alt={club.name}
        className="w-full h-full object-cover opacity-70 group-hover:opacity-30 transition-opacity duration-500"
      />

      {/* Overlay on hover */}
      <div
        className="absolute inset-0 flex flex-col justify-center items-center text-center p-4
        opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      >
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full mb-3 ${tagColors[club.tag] || "bg-gray-500/20 text-gray-300"
            }`}
        >
          {club.tag}
        </span>
        <h3 className="text-2xl font-bold text-white mb-2">{club.name}</h3>
        <p className="text-sm text-gray-300">{club.description}</p>
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

  // Auto-scroll logic
  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollSpeed = 0.5;
    let animationFrameId;

    const scrollStep = () => {
      scrollContainer.scrollLeft += scrollSpeed;
      if (
        scrollContainer.scrollLeft + scrollContainer.clientWidth >=
        scrollContainer.scrollWidth
      ) {
        scrollContainer.scrollLeft = 0;
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [filter]); // re-run when filter changes so it resets scroll position

  const handleClick = () => router.push("/club");

  // Filter clubs based on selected category
  const filteredClubs =
    filter === "ALL"
      ? mockClubs
      : mockClubs.filter((club) => club.category.toUpperCase() === filter);

  // Duplicate list for seamless scroll
  const displayClubs = [...filteredClubs, ...filteredClubs];

  return (
    <div className="w-full flex flex-col items-center justify-center text-white bg-gray-950 bg-[radial-gradient(#1a1a1a_1px,transparent_1px)] bg-[size:50px_50px] overflow-hidden">
      <div className="text-center mb-10 mt-16">
        <h1 className="text-5xl font-bold mb-3">Our Clubs</h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Explore the diverse range of clubs at IIT Indore. Hover to learn more!
        </p>
      </div>

      {/* 🟢 Filter Buttons */}
      <div className="flex gap-4 mb-8">
        {["ALL", "TECHNICAL", "SPORTS", "CULTURAL"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 border 
              ${filter === cat
                ? "bg-blue-600 border-blue-500 text-white"
                : "bg-transparent border-gray-600 text-gray-300 hover:bg-gray-800"
              }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🌀 Horizontal Scrolling Section */}
      <div
        ref={scrollRef}
        className="flex overflow-x-hidden gap-8 w-full px-16 py-12 relative"
      >
        {displayClubs.length > 0 ? (
          displayClubs.map((club, index) => <ClubCard key={index} club={club} />)
        ) : (
          <p className="text-gray-400 text-center w-full">
            No clubs found in this category.
          </p>
        )}
      </div>

      <div onClick={handleClick} className="my-6">
        <button className="bg-blue-700 hover:bg-blue-800 rounded-full py-2 px-4">
          View All Clubs →
        </button>
      </div>
    </div>
  );
};

export default DiscoverClubsPage;
