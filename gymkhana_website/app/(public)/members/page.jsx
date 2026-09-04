"use client";

import React, { useRef, useEffect, useState } from "react";
import { IoMailOutline, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

const TeamCarousel = () => {
  const scrollRef = useRef(null);

  // 1️⃣ Add State for pausing
  const [isPaused, setIsPaused] = useState(false);

  const members = [
    {
      name: "Moksha Tyagi",
      title: "PRESIDENT",
      org: "STUDENT`S GYMKHANA",
      img: "/secretaries/President.jpeg",
      email: "president.sg@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/moksha-tyagi-220406330/",
      instagram: "#"
    },
    {
      name: "Dhruv Bhardwaj",
      title: "GENERAL SECRETARY",
      org: "SCIENCE AND TECHNOLOGY",
      img: "/secretaries/GS SnT.jpeg",
      email: "gs.scitech@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/dhruv-bhardwaj-b82b0631b/",
      instagram: "#"
    },
    {
      name: "Sohil Dangi",
      title: "GENERAL SECRETARY",
      org: "CULTURALS",
      img: "/secretaries/GS Cult.jpg",
      email: "gs.culturals@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/sohil-dangi/",
      instagram: "#"
    },
    {
      name: "Badal singh",
      title: "GENERAL SECRETARY",
      org: "HOSTEL AFFAIRS",
      img: "/secretaries/GS Hostel.jpeg",
      email: "gs.hostel@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/badal-singh-b659a0319/",
      instagram: "#"
    },
    {
      name: "Kavyansh Raj Singh",
      title: "GENERAL SECRETARY",
      org: "ACADEMIC AFFAIRS UG",
      img: "/secretaries/GS Acads Ug.png",
      email: "gs.acad.ug@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/kavyanshsingh/",
      instagram: "#"
    },
    {
      name: "Lakshya Shukla",
      title: "GENERAL SECRETARY",
      org: "SPORTS AFFAIRS",
      img: "/secretaries/GS Sports.jpg",
      email: "gs.sports@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/lakshya-shukla-853542345/",
      instagram: "#"
    },
    {
      name: "Vishal Shakya",
      title: "GENERAL SECRETARY",
      org: "COUNSELLING, OUTREACH AND ALUMNI",
      img: "/secretaries/GS COA.jpg",
      email: "gs.coa@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/vishal-shakya-a3872628b/",
      instagram: "#"
    },
    {
      name: "Yogendra Bihare",
      title: "GENERAL SECRETARY",
      org: "MESS, CAFETARIA AND ALLIED SERVICES",
      img: "/secretaries/GS MAC.jpg",
      email: "gs.dining@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/yogendra-bihare-b91b25251/",
      instagram: "#"
    },
    {
      name: "Isha Sharma",
      title: "GENERAL SECRETARY",
      org: "ACADEMIC AFFAIRS PG",
      img: "/secretaries/GS Acad Pg.jpeg",
      email: "gs.acad.pg@iiti.ac.in",
      linkedin: "https://www.linkedin.com/in/isha-sharma-a92b7a1a2/",
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

      {/* Static CSS Particles Background */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:40px_40px] [background-position:20px_20px] opacity-30"></div>
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_2px,transparent_2px)] [background-size:90px_90px] [background-position:40px_40px] opacity-20"></div>
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