"use client";
import React, { useRef, useEffect } from "react";
import { IoMailOutline, IoLogoLinkedin, IoLogoInstagram } from "react-icons/io5";

const TeamCarousel = () => {
  const scrollRef = useRef(null);

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

    // GS Cultural Affairs
    {
      name: "Apoorv Singh",
      title: "GENERAL SECRETARY",
      org: "CULTURAL AFFAIRS",
      img: "./acad.jpg",
      email: "apoorv@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS Academics UG
    {
      name: "Khush Singla",
      title: "GENERAL SECRETARY",
      org: "ACADEMIC AFFAIRS UG",
      img: "./acad.jpg",
      email: "khush@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS Hostel Affairs
    {
      name: "Atharvakant",
      title: "GENERAL SECRETARY",
      org: "HOSTEL AFFAIRS",
      img: "./acad.jpg",
      email: "atharvakant@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS MAC
    {
      name: "Shubham Kumar",
      title: "GENERAL SECRETARY",
      org: "MESS, CAFETERIA & ALLIED SERVICES",
      img: "./acad.jpg",
      email: "shubham@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS Science & Technology
    {
      name: "SatyaJeet Pani",
      title: "GENERAL SECRETARY",
      org: "SCIENCE AND TECHNOLOGY",
      img: "./acad.jpg",
      email: "satya@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS Academics PG
    {
      name: "Saurabh Yadav",
      title: "GENERAL SECRETARY",
      org: "ACADEMIC AFFAIRS PG",
      img: "./acad.jpg",
      email: "saurabh@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS COA
    {
      name: "Nawed Ashraf",
      title: "GENERAL SECRETARY",
      org: "CONSULTING, OUTREACH & ALUMNI",
      img: "./acad.jpg",
      email: "nawed@example.com",
      linkedin: "#",
      instagram: "#"
    },

    // GS Sports Affairs
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


  // 🌀 Smooth Auto-Scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollSpeed = 0.5;
    let animationFrameId;

    const scrollStep = () => {
      container.scrollLeft += scrollSpeed;

      if (
        container.scrollLeft + container.clientWidth >=
        container.scrollWidth
      ) {
        container.scrollLeft = 0;
      }

      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  const ProfileCard = ({ name, title, org, img, email, linkedin, instagram }) => {
    return (
      <div className="
        w-[300px] rounded-2xl shadow-lg overflow-hidden 
        transition-all duration-300 hover:-translate-y-2 mx-4 flex-shrink-0 
        border-2 border-white hover:border-yellow-400
      ">

        <img src={img} alt={name} className="w-full rounded-t-2xl" />

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
    <div className="relative w-full h-[80vh] sm:h-screen flex flex-col items-center justify-center overflow-hidden">

      {/* Background */}
      <div className="absolute top-0 left-0 z-[-2] h-screen w-screen bg-[#000000] 
          bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>

      <h1 className="sm:text-4xl text-2xl font-bold text-white sm:mb-6 tracking-widest uppercase">
        Our Secretaries
      </h1>

      <div ref={scrollRef} className="flex overflow-x-scroll scrollbar-hide w-full px-16 py-10 gap-6">
        {loopedMembers.map((m, i) => (
          <ProfileCard key={i} {...m} />
        ))}
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
