"use client";
import React from "react";
import { IoMail, IoLocationSharp, IoCall, IoGlobeOutline } from "react-icons/io5";
import Particles from "@/components/Particles";

// --- SVG Logo (Arrow Function) ---
const Logo = () => (
  <div className="flex items-center justify-center w-24 h-24 rounded-2xl bg-gray-200 shadow-inner">
    <span className="text-4xl font-bold text-gray-700">SG</span>
  </div>
);

// --- Contact Info Component (Arrow Function) ---
const ContactInfo = () => (
  <div className="flex flex-col p-10 space-y-10">
    <img src="/main_logo.png" className="w-24 h-24 object-contain" alt="Logo" />

    <div className="space-y-6">
      <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-gray-100"><span className="text-yellow-500">CONTACT </span>US</h2>

      {/* Email */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-100 rounded-xl text-blue-600 text-2xl shadow-md">
          <IoMail />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">President</h3>
          <a href="mailto:studentgym@iiti.ac.in" target="_blank" rel="noopener noreferrer"
            className="text-blue-400 hover:text-blue-500 hover:underline transition-colors duration-200"
          >
            studentgym@iiti.ac.in
          </a>
        </div>
      </div>

      {/* Phone */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-green-100 rounded-xl text-green-600 text-2xl shadow-md">
          <IoCall />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Phone</h3>
          <p className="text-gray-300">+1 (555) 123-4567</p>
        </div>
      </div>

      {/* Website */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-purple-100 rounded-xl text-purple-600 text-2xl shadow-md">
          <IoGlobeOutline />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Website</h3>
          <a target="_blank" rel="noopener noreferrer"
            href="https://www.iiti.ac.in/"
            className="text-purple-400 hover:text-purple-500 hover:underline"
          >
            https://www.iiti.ac.in/
          </a>
        </div>
      </div>

      {/* Address */}
      <div className="flex items-start gap-4">
        <div className="p-3 bg-red-100 rounded-xl text-red-600 text-2xl shadow-md">
          <IoLocationSharp />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-300">Address</h3>
          <p className="text-gray-300 leading-relaxed">
            Indian Institute of Technology Indore,
            <br />
            Khandwa Road, Simrol,
            <br />
            Indore 453552
          </p>
        </div>
      </div>
    </div>
  </div>
);

// --- Map Component (Arrow Function) ---
const MapView = () => (
  <div className="w-full h-full min-h-[400px] md:min-h-0 relative">
    {/* Corrected Google Maps Embed URL for IIT Indore */}
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3685.568700076758!2d75.92073487604535!3d22.52035963488053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962efcccbce7145%3A0x784e8cb69818596b!2sIIT%20Indore!5e0!3m2!1sen!2sin!4v1708450000000!5m2!1sen!2sin"
      width="100%"
      height="100%"
      style={{ border: 0 }}
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      title="IIT Indore Location"
      className="rounded-b-3xl md:rounded-r-3xl md:rounded-bl-none"
    ></iframe>
  </div>
);


// --- Main Component (Arrow Function) ---
const App = () => (
  // 🟢 Added bg-black to make white particles visible
  <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black py-12 px-4">

    {/* 🌌 Background Layer: Particles */}
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

    {/* Content Layer (z-10 ensures it's above particles) */}
    <div className="relative z-10 w-full max-w-6xl mx-auto bg-gray-950/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-gray-800">
      <div className="grid grid-cols-1 md:grid-cols-2">

        {/* Contact Info */}
        <div className="flex flex-col justify-center">
          <ContactInfo />
        </div>

        {/* Map */}
        <div className="w-full h-full">
          <MapView />
        </div>

      </div>
    </div>
  </div>
);

export default App;