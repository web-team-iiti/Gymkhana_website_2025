"use client";
import React, { useState } from "react";
import Link from "next/link";

// --- 1. Custom CSS ---
const customStyles = `
  @keyframes waveMove {
    0% {
      mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 80%, transparent 100%);
      -webkit-mask-image: linear-gradient(90deg, transparent 0%, black 10%, black 80%, transparent 100%);
      background-position: 0 0, 0% 50%;
    }
    100% {
      mask-image: linear-gradient(90deg, transparent 30%, black 60%, transparent 90%);
      -webkit-mask-image: linear-gradient(90deg, transparent 30%, black 60%, transparent 90%);
      background-position: 48px 0, 100% 50%;
    }
  }

  @keyframes colorShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes pulseGlow {
    0% { filter: brightness(0.9); }
    50% { filter: brightness(1.3); }
    100% { filter: brightness(0.9); }
  }

  @keyframes orbit-cw {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes orbit-ccw {
    from { transform: rotate(360deg); }
    to { transform: rotate(0deg); }
  }

  /* Mobile Float Animation */
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-6px); }
  }

  .glow-text {
    text-shadow: 0 0 6px currentColor, 0 0 15px currentColor;
  }
`;

// --- 2. Node Data ---
const councils = [
  {
    id: 1,
    color: "#48bb78", // Green
    icon: "snt.jpg",
    angle: 18,
    title: "Science and Technology Council",
    description: "The SnT Council of IIT Indore is a community of science and technology enthusiasts who love to explore the unthinkable.",
  },
  {
    id: 2,
    color: "#fcd34d", // Yellow
    icon: "acad.jpg",
    angle: 90, // Top
    title: "Academic Council",
    description: "The Academics Council has been trusted with the responsibility of managing executive activities in two of the most crucial aspects of student life - Academics and Career.",
  },
  {
    id: 3,
    color: "#63b3ed", // Blue
    icon: "gym.jpg",
    angle: 162,
    title: "Sports Council",
    description: "The Sports Council is the voice and face of IIT Indore sports community, responsible for management and conduction of all sporting events in the campus.",
  },
  {
    id: 4,
    color: "#f87171", // Red
    icon: "cult.jpg",
    angle: 234,
    title: "Cultural Council",
    description: "The Cultural Council of IIT Indore orchestrates a diverse array of cultural events throughout the year, fostering artistic expression and community engagement.",
  },
  {
    id: 5,
    color: "#a855f7", // Purple 
    icon: "alumni.jpeg",
    angle: 306,
    title: "Outreach and Alumni Council",
    description: "The Outreach and Alumni Council acts as a bridge between the institute, its alumni network, and external organizations to foster long-term relationships and brand building.",
  },
];

// --- 3. Connector (Desktop Only) ---
const Connector = ({ angle, hexColor }) => {
  const dotSize = 4;
  const dotSpacing = 12;
  const waveSpeed = 3;
  const pulseSpeed = 2.5;
  const dottedPattern = `repeating-radial-gradient(circle, ${hexColor} 0 ${dotSize / 2}px, transparent ${dotSize / 2}px ${dotSpacing}px)`;
  const gradient = `linear-gradient(90deg, ${hexColor}, ${hexColor}aa, ${hexColor}50)`;

  return (
    <div
      className="absolute w-[300px] h-[300px] origin-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transform: `rotate(${-angle}deg)` }}
    >
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 pointer-events-none" style={{ width: "150px", height: `${dotSize}px` }}>
        <div
          aria-hidden
          className="absolute left-0 right-0"
          style={{
            height: `${dotSize}px`,
            borderRadius: 9999,
            backgroundImage: `${dottedPattern}, ${gradient}`,
            backgroundSize: `${dotSpacing * 2}px ${dotSize}px, 400% 400%`,
            backgroundBlendMode: "overlay",
            animation: `waveMove ${waveSpeed}s linear infinite, colorShift ${pulseSpeed * 3}s ease-in-out infinite, pulseGlow ${pulseSpeed}s ease-in-out infinite`,
            boxShadow: `0 0 12px ${hexColor}, 0 0 24px ${hexColor}50`,
          }}
        />
      </div>
    </div>
  );
};

// --- 4. Main Component ---
export default function RadialMenu({ dbCouncils = [] }) {
  const [hoveredNode, setHoveredNode] = useState(null);

  // Map db UUIDs to the hardcoded councils list by matching title/name
  const mergedCouncils = councils.map(c => {
    const dbC = dbCouncils.find(db => db.name === c.title);
    return { ...c, uuid: dbC ? dbC.id : c.id }; // Fallback to local id if not found
  });

  // --- Central Node (Longer Glow Tail) ---
  const CentralNode = ({ mobile = false }) => {
    return (
      <div className={`z-10 flex items-center justify-center relative ${mobile ? "mb-8" : ""}`}>
        {/* Revolving Dark Glow Container */}
        <div
          className={`absolute rounded-full pointer-events-none ${mobile ? "inset-[-12px]" : "inset-[-24px]"}`}
          style={{ animation: "orbit-cw 5s linear infinite" }} 
        >
           <div 
             className="absolute inset-0 rounded-full"
             style={{
               background: "conic-gradient(from 0deg, transparent 0%, transparent 15%, rgba(147, 51, 234, 0.3) 45%, rgba(147, 51, 234, 1) 100%)",
               filter: "blur(12px)", 
               opacity: 0.8,
             }}
           />
        </div>

        {/* Central Logo */}
        <div
          className={`
            ${mobile ? "w-28 h-28" : "w-36 h-36"} 
            p-2 rounded-full bg-black border-4 border-white 
            flex items-center justify-center text-4xl font-bold 
            shadow-[0_0_15px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.6)]
            transition-all duration-300 hover:scale-105 cursor-pointer relative z-20
          `}
        >
          <img src="main_logo.png" alt="Main Logo" className="w-full h-full rounded-full object-cover" />
        </div>
      </div>
    );
  };

  // --- Desktop Peripheral Node ---
  const PeripheralNode = ({ id, uuid, icon, color, angle, title, description }) => {
    const radius = 250;
    const radian = (angle * Math.PI) / 180;
    const nodeSize = 128;
    const nodePosX = 300 + radius * Math.cos(radian) - nodeSize / 2;
    const nodePosY = 300 - radius * Math.sin(radian) - nodeSize / 2;
    const isHovered = hoveredNode === id;
    const textRadius = radius + 80;
    const textPosX = 300 + textRadius * Math.cos(radian);
    const textPosY = 300 - textRadius * Math.sin(radian);

    return (
      <>
        <Link
          href={`/councils/${uuid}`}
          className="absolute flex flex-col items-center justify-center transition-all duration-300 hover:z-30 cursor-pointer"
          style={{ left: `${nodePosX}px`, top: `${nodePosY}px`, width: `${nodeSize}px`, height: `${nodeSize}px` }}
          onMouseOver={() => setHoveredNode(id)}
          onMouseOut={() => setHoveredNode(null)}
        >
          <div className="absolute inset-[-10px] rounded-full border border-dashed opacity-30 pointer-events-none" style={{ borderColor: color }} />

          <div
            className="relative w-full h-full rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: color,
              boxShadow: isHovered ? `0 0 25px 6px ${color}, 0 0 40px 10px ${color}` : `0 0 10px 2px ${color}50`,
              transform: isHovered ? "scale(1.15)" : "scale(1)",
            }}
          >
            <img src={icon} alt={title} className="w-28 h-28 rounded-full object-cover" />
          </div>
        </Link>

        {isHovered && (
          <div
            className="absolute z-50 transition-all w-[384px] duration-300 opacity-100 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg pointer-events-none"
            style={{
              left: `${textPosX}px`,
              top: `${textPosY}px`,
              transform: "translate(-50%, -50%)",
              background: "rgba(0, 0, 0, 0.75)",
              border: `2px solid ${color}`,
              boxShadow: `0 0 20px ${color}, 0 0 40px ${color}55`,
              color,
            }}
          >
            <h3 className="text-lg font-semibold mb-2 glow-text">{title}</h3>
            <p className="text-sm leading-snug text-gray-200">{description}</p>
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <style>{customStyles}</style>
      <div
        className="relative min-h-screen w-full flex items-center justify-center text-white font-sans overflow-hidden"
        style={{
          backgroundImage: `url('/bgimg.png'), radial-gradient(#1a1a1a 1px, transparent 1px)`,
          backgroundSize: "cover, 50px 50px",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        {/* 📱 MOBILE LAYOUT (UPDATED) */}
        <div className="relative z-10 w-full px-6 py-10 flex flex-col items-center gap-8 md:hidden">
          <CentralNode mobile={true} />

          {mergedCouncils.map((council, index) => (
            <Link
              href={`/councils/${council.uuid}`}
              key={council.id}
              className="w-full max-w-sm rounded-2xl border bg-black/60 backdrop-blur-md p-5 flex flex-col items-center text-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                borderColor: council.color,
                boxShadow: `0 0 15px ${council.color}40`,
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${index * 1}s`
              }}
            >
              <div
                className="w-20 h-20 rounded-full border-2 mb-4 relative flex items-center justify-center"
                style={{ borderColor: council.color }}
              >
                {/* --- UPDATED: Colored Glow Tail for each Council --- */}
                <div 
                  className="absolute inset-[-8px] rounded-full pointer-events-none" 
                  style={{ animation: "orbit-cw 4s linear infinite" }}
                >
                   <div 
                     className="absolute inset-0 rounded-full"
                     style={{
                       // Using Hex Alpha: 00 = 0% opacity, 4d = 30% opacity, ff = 100% opacity
                       background: `conic-gradient(from 0deg, transparent 0%, transparent 15%, ${council.color}4d 45%, ${council.color} 100%)`,
                       filter: "blur(8px)", 
                       opacity: 1,
                     }}
                   />
                </div>

                <div className="w-full h-full rounded-full overflow-hidden z-10">
                  <img src={council.icon} alt={council.title} className="w-full h-full object-cover" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-2" style={{ color: council.color, textShadow: `0 0 10px ${council.color}` }}>
                {council.title}
              </h3>

              <p className="text-sm text-gray-300 leading-relaxed">
                {council.description}
              </p>
            </Link>
          ))}
        </div>

        {/* 💻 DESKTOP LAYOUT */}
        <div className="hidden md:flex relative w-[600px] h-[600px] items-center justify-center">
          {councils.map((node) => (
            <Connector key={`line-${node.id}`} angle={node.angle} hexColor={node.color} />
          ))}
          <CentralNode mobile={false} />
          {mergedCouncils.map((node) => (
            <PeripheralNode key={node.id} {...node} />
          ))}
        </div>
      </div>
    </>
  );
};