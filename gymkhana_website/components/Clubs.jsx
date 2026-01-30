"use client";
import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";

// 🧩 Mock Data
const mockClubs = [
  // ==========================
  // 1. TECHNICAL CLUBS
  // ==========================
  {
    id: 1,
    name: "Aeromodelling Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Design, build, and fly! We deal with UAVs, drones, and miniaturized aircrafts, participating in technical fests across the country.",
    imageUrl: "/aeroclub.jpg",
  },
  {
    id: 2,
    name: "Astronomy Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "A hub for cosmic exploration. We organize stargazing sessions, telescope workshops, and discuss the mysteries of the universe.",
    imageUrl: "/astronomyclub.jpg",
  },
  {
    id: 3,
    name: "CAE Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Computer-Aided Engineering Club. We solve engineering problems using simulation software like ANSYS and Abaqus.",
    imageUrl: "/cae.png",
  },
  {
    id: 4,
    name: "CFA Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "The Finance and Analytics Club. We prepare students for corporate finance, algorithmic trading, and data analysis roles.",
    imageUrl: "/CFA.jpg",
  },
  {
    id: 5,
    name: "Concrete Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Exploring civil engineering and sustainable construction. We conduct workshops on structural design and concrete technology.",
    imageUrl: "/concreate.jpg",
  },
  {
    id: 6,
    name: "Electronics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "For the hardware fanatics. We explore IoT, embedded systems, and circuit design through hands-on workshops and hackathons.",
    imageUrl: "/electronics.png",
  },
  {
    id: 7,
    name: "Cynaptics",
    category: "Technical",
    tag: "TECHNICAL",
    description: "The AI & ML Club. We work on neural networks, deep learning projects, and compete in Kaggle competitions.",
    imageUrl: "/cynaptics.jpg",
  },
  {
    id: 8,
    name: "GDSC",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Google Developer Student Club. We focus on Web Dev, App Dev, and Cloud Computing, empowering students with Google technologies.",
    imageUrl: "/gdsc.png",
  },
  {
    id: 9,
    name: "Gymkhana Web Team",
    category: "Technical",
    tag: "TECHNICAL",
    description: "The tech backbone of the institute. We develop and maintain the official websites, portals, and apps for the Gymkhana.",
    imageUrl: "/Web_Team_Logo.aeedf74e.png",
  },
  {
    id: 10,
    name: "IVDC",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Intelligent Vehicle Design Club. We design autonomous and electric concept vehicles for competitions like Formula Student.",
    imageUrl: "/ivdc.jpg",
  },
  {
    id: 11,
    name: "Metacryst",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Materials Science Club. We explore crystallography, metallurgy, and smart materials through research and experiments.",
    imageUrl: "/MetaCryst Logo1.a914f007.png",
  },
  {
    id: 12,
    name: "Programming Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "The coding hub. We focus on Competitive Programming (CP), DSA, Cybersecurity, and open-source development.",
    imageUrl: "/pclub.png",
  },
  {
    id: 13,
    name: "Quantum Computing",
    category: "Technical",
    tag: "TECHNICAL",
    description: "Exploring the future of computing. We study quantum algorithms, cryptography, and Qiskit implementations.",
    imageUrl: "/quantum computing.abcb2b09.jpg",
  },
  {
    id: 14,
    name: "Robotics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description: "We build machines that move. From line followers and micromouse to humanoids and industrial arms.",
    imageUrl: "/robotics.jpg",
  },
  {
    id: 15,
    name: "Biocrats",
    category: "Technical",
    tag: "TECHNICAL",
    description: "The Biotech Club. We explore bioinformatics, genetic engineering, and synthetic biology through seminars and projects.",
    imageUrl: "/Biocrats.jpg",
  },

  // ==========================
  // 2. SPORTS CLUBS
  // ==========================
  {
    id: 16,
    name: "Athletics Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Run, Jump, Throw. We focus on track and field events, endurance training, and physical conditioning.",
    imageUrl: "/athletics.png",
  },
  {
    id: 17,
    name: "Aquatics Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Dive in! We conduct swimming training, water polo matches, and promote aquatic fitness.",
    imageUrl: "/aquatics.jpg",
  },
  {
    id: 18,
    name: "Badminton Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Smash it! A community for badminton lovers offering coaching, practice courts, and tournaments.",
    imageUrl: "/Badminton_club.png",
  },
  {
    id: 19,
    name: "Basketball Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Dribble and Shoot. We focus on team strategy, drills, and high-intensity inter-college matches.",
    imageUrl: "/basketball.png",
  },
  {
    id: 20,
    name: "Chess Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Checkmate. A club for strategic minds to practice tactics, openings, and compete in rapid/blitz tournaments.",
    imageUrl: "/chess.jpg",
  },
  {
    id: 21,
    name: "Cricket Club",
    category: "Sports",
    tag: "SPORTS",
    description: "The gentlemen's game. We host net practice, inter-batch leagues, and represent the institute in tournaments.",
    imageUrl: "/cricket.jpg",
  },
  {
    id: 22,
    name: "Football Club",
    category: "Sports",
    tag: "SPORTS",
    description: "The beautiful game. We focus on stamina, tactical discipline, and teamwork on the field.",
    imageUrl: "/football.jpg",
  },
  {
    id: 23,
    name: "Squash Club",
    category: "Sports",
    tag: "SPORTS",
    description: "High-intensity court action. We offer training for agility, reflex improvement, and friendly matches.",
    imageUrl: "/squash.png",
  },
  {
    id: 24,
    name: "Tennis Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Ace your game. Lawn tennis coaching and matches for beginners and advanced players alike.",
    imageUrl: "/tennis.jpg",
  },
  {
    id: 25,
    name: "Table Tennis Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Spin and Smash. Fast-paced ping pong action with regular practice sessions and competitions.",
    imageUrl: "/tabletennis.png",
  },
  {
    id: 26,
    name: "Volleyball Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Bump, Set, Spike. We foster teamwork and agility through regular volleyball training.",
    imageUrl: "/vollyball.png",
  },
  {
    id: 27,
    name: "Yoga Club",
    category: "Sports",
    tag: "SPORTS",
    description: "Mind and Body. We promote wellness through asanas, meditation, and flexibility workshops.",
    imageUrl: "/gym.jpg",
  },

  // ==========================
  // 3. CULTURAL CLUBS
  // ==========================
  {
    id: 28,
    name: "Aaina (Dramatics)",
    category: "Cultural",
    tag: "CULTURAL",
    description: "The Dramatics Society. We perform street plays (Nukkad), stage plays, and mimes to showcase emotions and social causes.",
    imageUrl: "/aaina_logo.png",
  },
  {
    id: 29,
    name: "Cinephiles",
    category: "Cultural",
    tag: "CULTURAL",
    description: "The Movie Club. A haven for cinema lovers. We organize screenings, filmmaking workshops, and movie discussions.",
    imageUrl: "/cinephiles.jpg",
  },
  {
    id: 30,
    name: "Kaizen Dance Crew",
    category: "Cultural",
    tag: "CULTURAL",
    description: "The official dance club. We express ourselves through Hip-hop, Contemporary, Bollywood, and Classical dance forms.",
    imageUrl: "/alphad.jpg",
  },
  {
    id: 31,
    name: "Music Club",
    category: "Cultural",
    tag: "CULTURAL",
    description: "For the melody makers. We are a group of vocalists and instrumentalists who jam, perform, and live for music.",
    imageUrl: "/Music.jpg",
  },
  {
    id: 32,
    name: "Kalakriti (Fine Arts)",
    category: "Cultural",
    tag: "CULTURAL",
    description: "The Fine Arts Club. From sketching and painting to digital art and crafting, we color the campus with creativity.",
    imageUrl: "/kalakriti.png",
  },
  {
    id: 33,
    name: "Literary Club",
    category: "Cultural",
    tag: "CULTURAL",
    description: "For the wordsmiths. We organize poetry slams, creative writing workshops, debates, and open mic nights.",
    imageUrl: "/literary.jpg",
  },
  {
    id: 34,
    name: "Debating Society",
    category: "Cultural",
    tag: "CULTURAL",
    description: "The voice of reason. We hone public speaking and argumentation skills through parliamentary debates and MUNs.",
    imageUrl: "/Debsoc.jpg",
  },
  {
    id: 35,
    name: "Mystic Hues",
    category: "Cultural",
    tag: "CULTURAL",
    description: "The Photography & Design Club. We capture moments through lenses and create visual stories through graphic design.",
    imageUrl: "/Mystichues.png",
  },
  {
    id: 36,
    name: "Quiz Club",
    category: "Cultural",
    tag: "CULTURAL",
    description: "For the trivia buffs. We conduct quizzes on general knowledge, pop culture, sports, technology, and more.",
    imageUrl: "/quiz.jpg",
  },
  {
    id: 37,
    name: "EBSB Club",
    category: "Cultural",
    tag: "CULTURAL",
    description: "Ek Bharat Shreshtha Bharat. We celebrate the cultural diversity of India through exchange programs and ethnic events.",
    imageUrl: "/ebsb.png",
  },
  {
    id: 38,
    name: "Gaming Club",
    category: "Cultural",
    tag: "CULTURAL", // Often considered Cultural/Recreational
    description: "The Esports hub. We organize competitive gaming tournaments for PC and mobile games like Valorant, CS:GO, and BGMI.",
    imageUrl: "/gaming.png",
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
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default DiscoverClubsPage;