
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import BackgroundLayout from "@/components/Sportsbg";


const SportsClubsPage = () => {
  const [currentClubIndex, setCurrentClubIndex] = useState(0);
  const [currentHeadIndex, setCurrentHeadIndex] = useState(0);
  const [isPausedClub, setIsPausedClub] = useState(false);
  const [isPausedHead, setIsPausedHead] = useState(false);
  const [hoveredClub, setHoveredClub] = useState(null);
  const [hoveredHead, setHoveredHead] = useState(null); // NEW: Track which head is hovered
  const [, forceUpdate] = useState(0);
  const galleryRef = useRef(null);
  const clubScrollRef = useRef(null);
  const headScrollRef = useRef(null);

  const clubs = [
  {
    name: "Athletics Club",
    logo: "/athletics.png",
    description:
      "A club for sprinting, long-distance running, jumps, and track-and-field events. Focused on building endurance, agility, and competitive spirit."
  },
  {
    name: "Aquatics Club",
    logo: "/aquatics.jpg",
    description:
      "Dedicated to swimming and aquatic sports. Conducts training sessions, competitions, and promotes physical fitness and water safety."
  },
  {
    name: "Badminton Club",
    logo: "/Badminton_club.png",
    description:
      "A vibrant club for badminton enthusiasts. Organizes practice sessions, tournaments, and coaching modules for beginners and advanced players."
  },
  {
    name: "Basketball Club",
    logo: "/basketball.png",
    description:
      "A passionate community of basketball players focusing on drills, strategy, teamwork, and inter-college competitions."
  },
  {
    name: "Chess Club",
    logo: "/chess.jpg",
    description:
      "A hub for chess lovers that promotes strategic thinking. Conducts regular matches, championships, and competitive training sessions."
  },
  {
    name: "Cricket Club",
    logo: "/cricket.jpg",
    description:
      "A cricketing community that hosts practice nets, inter-batch matches, and league competitions. Focus on skill development and teamwork."
  },
  {
    name: "Football Club",
    logo: "/football.jpg",
    description:
      "A highly energetic club for football players focusing on stamina, skill drills, tactical discipline, and inter-campus tournaments."
  },
  {
    name: "Squash Club",
    logo: "/squash.png",
    description:
      "A club for squash players offering training, friendly matches, and competitive events. Encourages agility and quick decision-making."
  },
  {
    name: "Tennis Club",
    logo: "/tennis.jpg",
    description:
      "Promotes tennis through coaching, practice sessions, and tournaments. Ideal for both beginners and advanced players."
  },
  {
    name: "Table Tennis Club",
    logo: "/tabletennis.png",
    description:
      "A club for TT players with regular practice, coaching sessions, friendly matches, and competitive tournaments."
  },
  {
    name: "Volleyball Club",
    logo: "/vollyball.png",
    description:
      "Community of volleyball enthusiasts focusing on teamwork, serves, spikes, and competitive training."
  },
  {
    name: "Yoga and Fitness Club",
    logo: "/gym.jpg",
    description:
      "Promotes physical and mental wellness through yoga, stretching, meditation, and fitness workshops."
  }
];


const clubHeads = [
  { name: "Sanjay S", role: "Head", club: "Athletics Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Ommkar Sahoo", role: "Head", club: "Aquatics Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Siddhant Gupta", role: "Head", club: "Badminton Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Rahul", role: "Head", club: "Basketball Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Sarang Jagdish", role: "Head", club: "Chess Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Monik Dodiya", role: "Head", club: "Cricket Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Muhamed Nihal", role: "Head", club: "Football Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Samarth Sharma", role: "Head", club: "Squash Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Akarsh", role: "Head", club: "Tennis Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Kushagra Shrikhande", role: "Head", club: "Table Tennis Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Aman", role: "Head", club: "Volleyball Club", photo: "👤", instagram: "#", linkedin: "#" },
  { name: "Gouriveni Gokul", role: "Head", club: "Yoga and Fitness Club", photo: "👤", instagram: "#", linkedin: "#" }
];


  const galleryImages = [
    "", "", "", "",
    "", "", "", "",
    "", "", "", "",
    "", "", "", ""
  ];

  // Auto-scrolling gallery
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let scrollAmount = 0;
    const scrollSpeed = 0.3;

    const autoScroll = () => {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= gallery.scrollHeight / 2) {
        scrollAmount = 0;
      }
      gallery.scrollTop = scrollAmount;
    };

    const interval = setInterval(autoScroll, 30);
    return () => clearInterval(interval);
  }, []);

  // Smooth continuous club carousel movement
  const clubScrollPosition = useRef(0);

  useEffect(() => {
    if (!isPausedClub) {
      const scrollSpeed = 0.5;
      const cardWidth = 220;
      const totalWidth = clubs.length * cardWidth;

      const smoothScroll = () => {
        clubScrollPosition.current += scrollSpeed;
        
        if (clubScrollPosition.current >= totalWidth) {
          clubScrollPosition.current = 0;
        }
        
        setCurrentClubIndex(Math.floor(clubScrollPosition.current / cardWidth));
        forceUpdate(prev => prev + 1);
      };

      const interval = setInterval(smoothScroll, 30);
      return () => clearInterval(interval);
    }
  }, [isPausedClub, clubs.length]);

  // Smooth continuous heads carousel movement
  const headScrollPosition = useRef(0);

  useEffect(() => {
    if (!isPausedHead) {
      const scrollSpeed = 0.5;
      const cardWidth = 220;
      const totalWidth = clubHeads.length * cardWidth;

      const smoothScroll = () => {
        headScrollPosition.current += scrollSpeed;
        
        if (headScrollPosition.current >= totalWidth) {
          headScrollPosition.current = 0;
        }
        
        setCurrentHeadIndex(Math.floor(headScrollPosition.current / cardWidth));
        forceUpdate(prev => prev + 1);
      };

      const interval = setInterval(smoothScroll, 30);
      return () => clearInterval(interval);
    }
  }, [isPausedHead, clubHeads.length]);

  return (
    <div className="min-h-screen bg-gray-950/1 text-white relative overflow-hidden">
      {/* Animated Background */}
      {/* <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-950/5 to-transparent"
          style={{
            backgroundImage: 'linear-gradient(rgba(139, 92, 246, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.03) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}>
        </div>

        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-purple-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`
            }}
          />
        ))}
      </div> */}
       <BackgroundLayout/>

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-green-700 via-green-500 to--500 bg-clip-text text-transparent animate-gradient">
            Sports Clubs
          </h1>
          <p className="text-xl text-gray-400">IIT Indore Student Gymkhana</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Club Carousel - Smooth Continuous Scroll */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 shadow-2xl overflow-hidden">
              <div className="relative overflow-hidden">
                <div
                  className="flex gap-4"
                  style={{
                    transform: `translateX(-${clubScrollPosition.current}px)`,
                    transition: 'none'
                  }}
                >
                  {[...clubs, ...clubs, ...clubs].map((club, index) => {
                    const actualIndex = index % clubs.length;
                    return (
                      <div
                        key={index}
                        className="relative flex-shrink-0 w-52 group cursor-pointer"
                        onMouseEnter={() => {
                          setIsPausedClub(true);
                          setHoveredClub(actualIndex);
                        }}
                        onMouseLeave={() => {
                          setIsPausedClub(false);
                          setHoveredClub(null);
                        }}
                      >
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 h-40 flex flex-col items-center justify-center border border-gray-700 hover:border-green-500 hover:bg-gray-700/30 transition-all duration-300 hover:scale-105">
                          <img 
                            src={club.logo} 
                            alt={`${club.name} logo`}
                            className="w-20 h-20 object-contain mb-3 rounded-lg group-hover:opacity-70 transition-opacity duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                          <div className="text-5xl mb-3 group-hover:opacity-70 transition-opacity duration-300" style={{display: 'none'}}>🏆</div>
                          <h3 className="text-sm font-semibold text-center text-gray-300 group-hover:text-white line-clamp-2">
                            {club.name}
                          </h3>
                        </div>

                        {/* Hover Description */}
                        {hoveredClub === actualIndex && (
                          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-green-400 animate-fadeIn z-20 overflow-hidden">
                            <p className="text-xs text-gray-300 text-center leading-relaxed overflow-y-auto max-h-full">
                              {club.description}
                            </p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4">
                {clubs.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      clubScrollPosition.current = index * 220;
                      setCurrentClubIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === (currentClubIndex % clubs.length)
                        ? 'w-8 bg-green-500'
                        : 'w-2 bg-gray-700 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Club Heads Carousel - FIXED: Now shows contacts on ANY hovered card */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-green-500/50 transition-all duration-300 shadow-2xl overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 text-center text-green-400">Club Heads</h3>
              
              <div className="relative overflow-hidden">
                <div
                  className="flex gap-4"
                  style={{
                    transform: `translateX(-${headScrollPosition.current}px)`,
                    transition: 'none'
                  }}
                >
                  {[...clubHeads, ...clubHeads, ...clubHeads].map((head, index) => {
                    const actualIndex = index % clubHeads.length;
                    
                    return (
                      <div
                        key={index}
                        className="relative flex-shrink-0 w-52 group cursor-pointer"
                        onMouseEnter={() => {
                          setIsPausedHead(true);
                          setHoveredHead(actualIndex); // Track which head is hovered
                        }}
                        onMouseLeave={() => {
                          setIsPausedHead(false);
                          setHoveredHead(null); // Clear hover state
                        }}
                      >
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 h-64 flex flex-col items-center justify-center border border-gray-700 hover:border-green-500 hover:bg-gray-700/50 transition-all duration-300">
                          <div className="text-6xl mb-3 filter drop-shadow-lg">
                            {head.photo}
                          </div>
                          <h4 className="text-base font-bold mb-1 text-white text-center line-clamp-2">
                            {head.name}
                          </h4>
                          <p className="text-green-400 mb-1 text-xs font-medium text-center line-clamp-1">
                            {head.role}
                          </p>
                          <p className="text-gray-500 text-xs mb-2 text-center line-clamp-1">
                            {head.club}
                          </p>

                          {/* FIXED: Show Instagram/LinkedIn when THIS card is hovered */}
                          {hoveredHead === actualIndex && (
                            <div className="flex justify-center gap-3 mt-2 animate-fadeIn">
                              <a
                                href={head.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-blue-400/50"
                              >
                                <FaInstagram className="text-lg" />
                              </a>
                              <a
                                href={head.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-blue-600 p-2 rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-blue-500/50"
                              >
                                <FaLinkedin className="text-lg" />
                              </a>
                            </div>
                          )}

                          {/* Show text when NOT hovered */}
                          {hoveredHead !== actualIndex && (
                            <p className="text-gray-600 text-xs mt-2">
                              Hover to see contacts
                            </p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Carousel Indicators */}
              <div className="flex justify-center gap-2 mt-4 flex-wrap">
                {clubHeads.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      headScrollPosition.current = index * 220;
                      setCurrentHeadIndex(index);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      index === (currentHeadIndex % clubHeads.length)
                        ? 'w-8 bg-green-500'
                        : 'w-2 bg-gray-700 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Gallery - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 shadow-2xl h-full">
              <h3 className="text-2xl font-bold mb-4 text-center text-green-400">Gallery</h3>
              <div
                ref={galleryRef}
                className="grid grid-cols-2 gap-4 overflow-hidden"
                style={{ height: 'calc(100vh - 280px)', maxHeight: '800px' }}
              >
                {galleryImages.concat(galleryImages).concat(galleryImages).map((img, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-green-900/30 via-gray-800/30 to-green-700/30 rounded-xl flex items-center justify-center text-5xl hover:scale-110 transition-transform duration-300 aspect-square border border-gray-700 hover:border-green-500"
                  >
                    {img}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* All Clubs Grid */}
        {/* <div className="mt-12">
          <h3 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            All Technical Clubs
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clubs.map((club, index) => (
              <div
                key={index}
                className="bg-gray-900/50 backdrop-blur-xl rounded-xl p-6 border border-gray-800 hover:border-purple-500 hover:bg-gray-800/50 hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/20"
              >
                <div className="text-5xl mb-4 text-center filter drop-shadow-lg">{club.logo}</div>
                <h4 className="text-xl font-bold mb-3 text-center text-white">{club.name}</h4>
                <p className="text-gray-400 text-sm text-center leading-relaxed">{club.description}</p>
              </div>
            ))}
          </div>
        </div> */}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
          }
          75% {
            transform: translateY(-15px) translateX(5px);
          }
        }

        @keyframes gradient {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .animate-float {
          animation: float linear infinite;
        }

        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }

        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default SportsClubsPage;
