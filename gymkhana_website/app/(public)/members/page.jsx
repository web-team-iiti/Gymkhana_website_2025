"use client";
import Particles from "@/components/Particles";
import React, { useRef, useEffect, useState } from "react";
import { IoMailOutline, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

const TeamCarousel = () => {
  const scrollRef = useRef(null);
  
  // 1️⃣ Add State for pausing
  const [isPaused, setIsPaused] = useState(false);

  const members = [
    {
      name: "Naveen Sharma",
      title: "PRESIDENT",
      org: "STUDENT'S GYMKHANA",
      img: "./acad.jpg",
      email: "naveen@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Apoorv Singh",
      title: "GENERAL SECRETARY",
      org: "CULTURAL AFFAIRS",
      img: "./acad.jpg",
      email: "apoorv@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Khush Singla",
      title: "GENERAL SECRETARY",
      org: "ACADEMIC AFFAIRS UG",
      img: "./acad.jpg",
      email: "khush@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Atharvakant",
      title: "GENERAL SECRETARY",
      org: "HOSTEL AFFAIRS",
      img: "./acad.jpg",
      email: "atharvakant@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Shubham Kumar",
      title: "GENERAL SECRETARY",
      org: "MESS, CAFETERIA & ALLIED SERVICES",
      img: "./acad.jpg",
      email: "shubham@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "SatyaJeet Pani",
      title: "GENERAL SECRETARY",
      org: "SCIENCE AND TECHNOLOGY",
      img: "./acad.jpg",
      email: "satya@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Saurabh Yadav",
      title: "GENERAL SECRETARY",
      org: "ACADEMIC AFFAIRS PG",
      img: "./acad.jpg",
      email: "saurabh@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Nawed Ashraf",
      title: "GENERAL SECRETARY",
      org: "CONSULTING, OUTREACH & ALUMNI",
      img: "./acad.jpg",
      email: "nawed@example.com",
      linkedin: "#",
      instagram: "#"
    },
    {
      name: "Prayag Lakhani",
      title: "GENERAL SECRETARY",
      org: "SPORTS AFFAIRS",
      img: "./acad.jpg",
      email: "prayag@example.com",
      linkedin: "#",
      instagram: "#"
    }
  ];

  // 🌀 Smooth Auto-Scroll Logic
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = 0.5;
    let animationFrameId;

    const scrollStep = () => {
      // 2️⃣ Only scroll if NOT paused
      if (!isPaused) {
        container.scrollLeft += scrollSpeed;

        // Reset logic: seamless loop
        // If we scrolled past half the width (first set of items), snap back to 0
        if (container.scrollLeft >= container.scrollWidth / 2) {
           container.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]); // Re-run effect when pause state changes

  const ProfileCard = ({ name, title, org, img, email, linkedin, instagram }) => {
    return (
      <div className="
        w-[300px] rounded-2xl shadow-lg overflow-hidden 
        transition-all duration-300 hover:-translate-y-2 mx-4 flex-shrink-0 
        border-2 border-white hover:border-yellow-400 bg-white group
      ">
        <img src={img} alt={name} className="w-full h-64 object-cover rounded-t-2xl" />

        <div className="text-center py-10 bg-white">
          <h3 className="text-2xl font-bold text-gray-800 mb-2 uppercase">{name}</h3>
          <p className="text-sm font-semibold text-blue-500 tracking-wider uppercase">{title}</p>
          <p className="text-sm text-gray-500 tracking-wide mt-1 uppercase">{org}</p>

          <div className="flex justify-center gap-4 mt-6">
            <a href={`mailto:${email}`} className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-full text-gray-600 text-xl transition-all duration-300 hover:bg-red-100 hover:text-red-600 hover:scale-110">
              <IoMailOutline />
            </a>

            <a href={linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-full text-gray-600 text-xl transition-all duration-300 hover:bg-blue-100 hover:text-[#0A66C2] hover:scale-110">
              <IoLogoLinkedin />
            </a>

            <a href={instagram} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center w-11 h-11 bg-gray-100 rounded-full text-gray-600 text-xl transition-all duration-300 hover:bg-pink-100 hover:text-pink-600 hover:scale-110">
              <IoLogoInstagram />
            </a>
          </div>
        </div>
      </div>
    );
  };

  const loopedMembers = [...members, ...members];

  return (
    <div className="relative w-full py-10  flex flex-col items-center justify-center overflow-hidden bg-black">
      
      {/* 1. Particles Background Layer */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={700}
          particleSpread={10}
          speed={0.1}
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </div>

      {/* 2. Content Layer */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-white sm:mb-6 tracking-widest uppercase drop-shadow-md">
          <span className="text-yellow-500">OUR</span> Secretaries
        </h1>

        <div 
          ref={scrollRef} 
          className="flex overflow-x-scroll scrollbar-hide w-full px-16 py-10 gap-6"
          // 3️⃣ Event Listeners for Hover Pause
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          // Optional: Touch support for mobile users
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setTimeout(() => setIsPaused(false), 2000)}
        >
          {loopedMembers.map((m, i) => (
            <ProfileCard key={i} {...m} />
          ))}
        </div>
      </div>

      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}
      </style>
    </div>
  );
};

export default TeamCarousel;