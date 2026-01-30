

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { FaInstagram, FaLinkedin } from 'react-icons/fa';
import Background from "@/components/Background";


const TechnicalClubsPage = () => {
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
      name: "Aeromodelling Club",
      logo: "/aeroclub.jpg",
      description: "A group of enthusiastic people who love to make UAVs. We deal with designing, building, and flying miniaturized aircraft. The club participates in various technical fests and competitions across the country."
    },
    {
      name: "Astronomy Club",
      logo: "/astronomyclub.jpg",
      description: "A hub of cosmic exploration open to everyone with curiosity about the universe. We offer stargazing sessions, astronomy workshops, and provide advanced resources for those who want to dive deeper."
    },
    {
      name: "CAE Club",
      logo: "/cae.png",
      description: "Computer-Aided Engineering Club deals with common engineering problems and develops optimum solutions using CAE software. We conduct workshops, seminars, webinars, and CAD competitions."
    },
    {
      name: "CFA Club",
      logo: "/CFA.jpg",
      description: "The Finance and Analytics Club aims to prepare students for corporate and research-based financial problems. We focus on financial modeling, data analysis, and investment strategies."
    },
    {
      name: "Concrete Club",
      logo: "/concreate.jpg",
      description: "Dedicated to exploring concrete technology and civil engineering applications. The club conducts workshops on construction materials, structural design, and sustainable building practices."
    },
    {
      name: "Electronics Club",
      logo: "/electronics.png",
      description: "A motley of electronics fanatics providing a platform to explore the fascinating field of electronics. We conduct lecture series, workshops, seminars, and competitions with hands-on experience."
    },
    {
      name: "Cynaptics",
      logo: "/cynaptics.jpg",
      description: "Focused on artificial intelligence, machine learning, and neural networks. The club works on cutting-edge AI projects, organizes workshops on deep learning, and participates in AI competitions."
    },
    {
      name: "GDSC",
      logo: "/gdsc.png",
      description: "Google Developer Student Club - A vibrant community of developers exploring web development, AI/ML, Android development, and cloud computing. We empower students through workshops and hackathons."
    },
    {
      name: "Gymkhana Web Team",
      logo: "/Web_Team_Logo.aeedf74e.png",
      description: "The technical backbone of Student Gymkhana, responsible for developing and maintaining the official Gymkhana website and various web applications using modern web technologies."
    },
    {
      name: "IVDC",
      logo: "/ivdc.jpg",
      description: "Intelligent Vehicle Design Club focuses on automotive engineering, autonomous vehicles, and intelligent transportation systems. We design concept vehicles and participate in Formula Student competitions."
    },
    {
      name: "Metacryst",
      logo: "/MetaCryst Logo1.a914f007.png",
      description: "A club dedicated to materials science and crystallography. We explore the structure, properties, and applications of various materials, conduct research projects in materials engineering."
    },
    {
      name: "Programming Club",
      logo: "/pclub.png",
      description: "A community of highly enthusiastic students focused on development, algorithms, security, ML, and all aspects of programming. We organize coding competitions, hackathons, and workshops."
    },
    {
      name: "Quantum Computing Club",
      logo: "/quantum computing.abcb2b09.jpg",
      description: "Exploring the revolutionary field of quantum computing. The club conducts workshops on quantum algorithms, quantum cryptography, and provides hands-on experience with quantum platforms."
    },
    {
      name: "Robotics Club",
      logo: "/robotics.jpg",
      description: "A diverse group of students who loves to build robots. We build micromouse, hexapod, line followers, humanoids, and robotic arms. If you're thrilled by robots, this is the place to be."
    },
    {
      name: "Biocrats Club",
      logo: "/Biocrats.jpg",
      description: "Dedicated to biological sciences, biotechnology, and biomedical engineering. We conduct workshops on bioinformatics, synthetic biology, and organize seminars on the latest advances."
    }
  ];

  const clubHeads = [
    { name: "Sibasish Barik", role: "Head", club: "Aeromodelling Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Parul Pahurkar", role: "Head", club: "Astronomy Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Adinath Apte", role: "President", club: "CAE Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Rajnish Bairwa", role: "Head", club: "Concrete Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Advay Kunte", role: "President", club: "Electronics Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Harshvardhan Choudhary", role: "President", club: "Cynaptics", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Vedant Dinkar", role: "Head", club: "GDSC", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Yash Vardhan Solanki", role: "Head", club: "Gymkhana Web Team", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Nambiar Anand", role: "President", club: "IVDC", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Shubham Prajapati", role: "Head", club: "Metacryst", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Krishay Rathaure", role: "President (Cybersecurity)", club: "Programming Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Vedant Jain", role: "President (CP)", club: "Programming Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Tanvi Agarwal", role: "President (Software)", club: "Programming Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Arham Aneeq", role: "President", club: "Quantum Computing Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Tejas Santosh Bhavekar", role: "President", club: "Robotics Club", photo: "👤", instagram: "#", linkedin: "#" },
    { name: "Anjali Singh", role: "Club Head", club: "Biocrats Club", photo: "👤", instagram: "#", linkedin: "#" }
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
       <Background />

      <div className="relative z-10 max-w-7xl mx-auto p-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold mb-4 bg-gradient-to-r from-purple-700 via-purple-400 to-purple-200 bg-clip-text text-transparent animate-gradient">
            Technical Clubs
          </h1>
          <p className="text-xl text-gray-400">IIT Indore Student Gymkhana</p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Club Carousel - Smooth Continuous Scroll */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-2xl overflow-hidden">
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
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 h-40 flex flex-col items-center justify-center border border-gray-700 hover:border-purple-500 hover:bg-gray-700/30 transition-all duration-300 hover:scale-105">
                          <img 
                            src={club.logo} 
                            alt={`${club.name} logo`}
                            className="w-20 h-20 object-contain mb-3 rounded-lg group-hover:opacity-70 transition-opacity duration-300"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              e.target.nextSibling.style.display = 'block';
                            }}
                          />
                          <div className="text-5xl mb-3 group-hover:opacity-70 transition-opacity duration-300" style={{display: 'none'}}>⚙️</div>
                          <h3 className="text-sm font-semibold text-center text-gray-300 group-hover:text-white line-clamp-2">
                            {club.name}
                          </h3>
                        </div>

                        {/* Hover Description */}
                        {hoveredClub === actualIndex && (
                          <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md rounded-xl p-4 flex items-center justify-center border border-purple-400 animate-fadeIn z-20 overflow-hidden">
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
                        ? 'w-8 bg-purple-500'
                        : 'w-2 bg-gray-700 hover:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Club Heads Carousel - FIXED: Now shows contacts on ANY hovered card */}
            <div className="bg-gray-900/50 backdrop-blur-xl rounded-2xl p-6 border border-gray-800 hover:border-purple-500/50 transition-all duration-300 shadow-2xl overflow-hidden">
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">Club Heads</h3>
              
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
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 h-64 flex flex-col items-center justify-center border border-gray-700 hover:border-purple-500 hover:bg-gray-700/50 transition-all duration-300">
                          <div className="text-6xl mb-3 filter drop-shadow-lg">
                            {head.photo}
                          </div>
                          <h4 className="text-base font-bold mb-1 text-white text-center line-clamp-2">
                            {head.name}
                          </h4>
                          <p className="text-purple-400 mb-1 text-xs font-medium text-center line-clamp-1">
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
                                className="bg-gradient-to-r from-purple-600 to-pink-600 p-2 rounded-full hover:scale-110 transition-transform shadow-lg hover:shadow-purple-400/50"
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
                        ? 'w-8 bg-purple-500'
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
              <h3 className="text-2xl font-bold mb-4 text-center text-purple-400">Gallery</h3>
              <div
                ref={galleryRef}
                className="grid grid-cols-2 gap-4 overflow-hidden"
                style={{ height: 'calc(100vh - 280px)', maxHeight: '800px' }}
              >
                {galleryImages.concat(galleryImages).concat(galleryImages).map((img, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-br from-purple-900/30 via-gray-800/30 to-purple-700/30 rounded-xl flex items-center justify-center text-5xl hover:scale-110 transition-transform duration-300 aspect-square border border-gray-700 hover:border-purple-500"
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

export default TechnicalClubsPage;
