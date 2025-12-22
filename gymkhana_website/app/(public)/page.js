"use client";
import React from 'react';
import Clubs from '@/components/Clubs';
import RadialMenu from '@/components/Councils';
import UpcomingEvents from '@/components/NewsEvents';
import Galaxy from '@/components/Galaxy'; // Import Galaxy here

const Page = () => {
  return (
    <div>
      {/* Radial Menu stays separate (or move inside if you want galaxy there too) */}
      <RadialMenu />

      {/* 🌌 Unified Galaxy Wrapper for Clubs & Events */}
      <div className="relative w-full overflow-hidden bg-gray-950">
        
        {/* Background Layer: One single Galaxy instance */}
        <div className="absolute inset-0 z-0">
          <Galaxy
            mouseRepulsion={true}
            mouseInteraction={true}
            density={1.5}
            glowIntensity={0.5}
            saturation={0} // White stars
            hueShift={240}
          />
        </div>

        {/* Content Layer: The components sit on top */}
        <div className="relative z-10">
          <Clubs />
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default Page;