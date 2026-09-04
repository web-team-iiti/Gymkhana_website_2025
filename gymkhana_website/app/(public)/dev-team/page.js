"use client";

import React from "react";
import { FaGithub, FaLinkedin, FaEnvelope, FaUserCircle } from "react-icons/fa";

export default function DevTeamPage() {
  const teamMembers = [
    {
      name: "Abhishek Kumar Verma",
      role: "Lead Developer",
      icon: <FaUserCircle className="w-20 h-20 text-gray-400 group-hover:text-yellow-500 group-hover:scale-110 transition-all duration-500" />, 
      github: "https://github.com/abhishekverma9",
      linkedin: "https://www.linkedin.com/in/abhishek-verma-900178329",
      email: "mailto:cse240001005@iiti.ac.in",
    },
    {
      name: "Devanshi Mahto",
      role: "Developer",
      icon: <FaUserCircle className="w-20 h-20 text-gray-400 group-hover:text-yellow-500 group-hover:scale-110 transition-all duration-500" />, 
      github: "https://github.com/Devanshi-Mahto",
      linkedin: "#",
      email: "#",
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white py-12 sm:py-16 px-4 sm:px-12 lg:px-24">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 sm:mb-16 space-y-3 sm:space-y-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-yellow-600">
            Meet the Dev Team
          </h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-2">
            The talented minds behind the Student's Gymkhana IIT Indore portal. 
            We build digital experiences that connect and empower our student community.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 sm:gap-8 md:gap-12">
          {teamMembers.map((member, idx) => (
            <div 
              key={idx} 
              className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all duration-300 group shadow-lg hover:shadow-yellow-500/10 w-full max-w-[300px] sm:max-w-none sm:w-80"
            >
              <div className="h-48 bg-gray-800 relative flex items-center justify-center overflow-hidden">
                {/* Fallback pattern background if no photo */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500 via-gray-900 to-black"></div>
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-900 relative z-10 bg-gray-950 flex items-center justify-center shadow-inner">
                  {member.icon}
                </div>
              </div>
              
              <div className="p-6 text-center space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mt-1">
                    {member.role}
                  </p>
                </div>
                
                <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-800">
                  <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-white transition-colors">
                    <FaGithub size={20} />
                  </a>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-blue-500 transition-colors">
                    <FaLinkedin size={20} />
                  </a>
                  <a href={member.email} className="text-gray-500 hover:text-red-400 transition-colors">
                    <FaEnvelope size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
