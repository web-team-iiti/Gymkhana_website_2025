"use client";
import React, { useState } from "react";

// --- 1. Custom CSS (Unchanged) ---
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
      background-position: 48px 0, 100% 50%; /* 12 * 4 = 48 */
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

  .glow-text {
    text-shadow: 0 0 6px currentColor, 0 0 15px currentColor;
  }
`;

// --- 2. Node Data (Angles updated to 45° rotation) ---
const councils = [
  {
    id: 1,
    color: "#48bb78", // Green
    icon: "snt.jpg",
    angle: 45, // Top-Right
    title: "Science and Technology Council",
    description:
      "The SnT Council of IIT Indore is a community of science and technology enthusiasts who love to explore the unthinkable.",
  },
  {
    id: 2, 
    color: "#fcd34d", // Yellow
    icon: "acad.jpg",
    angle: 135, // Top-Left
    title: "Academic Council",
    description:
      "The Academics Council has been trusted with the responsibility of managing executive activities in two of the most crucial aspects of student life - Academics and Career.",
  },
  {
    id: 3,
    color: "#63b3ed", // Blue
    icon: "gym.jpg",
    angle: 225, // Bottom-Left
    title: "Sports Council",
    description:
      "The Sports Council is the voice and face of IIT Indore sports community, responsible for management and conduction of all sporting events in the campus.",
  },
  {
    id: 4,
    color: "#f87171", // Red
    icon: "cult.jpg",
    angle: 315, // Bottom-Right
    title: "Cultural Council",
    description:
      "The Cultural Council of IIT Indore orchestrates a diverse array of cultural events throughout the year, fostering artistic expression and community engagement among students and faculty alike.",
  },
];

// --- 3. Connector Component (Unchanged) ---
const Connector = ({ angle, hexColor }) => {
  const dotSize = 4;
  const dotSpacing = 12;
  const waveSpeed = 3;
  const pulseSpeed = 2.5;

  const dottedPattern = `repeating-radial-gradient(circle, ${hexColor} 0 ${
    dotSize / 2
  }px, transparent ${dotSize / 2}px ${dotSpacing}px)`;
  
  const gradient = `linear-gradient(90deg, ${hexColor}, ${hexColor}aa, ${hexColor}50)`;

  return (
    <div
      className="absolute w-[300px] h-[300px] origin-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transform: `rotate(${-angle}deg)`
 }}
    >
      <div
        className="absolute left-1/2 top-1/2 -translate-y-1/2 pointer-events-none"
        style={{ width: "150px", height: `${dotSize}px` }}
      >
        <div
          aria-hidden
          className="absolute left-0 right-0"
          style={{
            height: `${dotSize}px`,
            borderRadius: 9999,
            backgroundImage: `${dottedPattern}, ${gradient}`,
            backgroundSize: `${dotSpacing * 2}px ${dotSize}px, 400% 400%`,
            backgroundBlendMode: "overlay",
            animation: `waveMove ${waveSpeed}s linear infinite, colorShift ${
              pulseSpeed * 3
            }s ease-in-out infinite, pulseGlow ${pulseSpeed}s ease-in-out infinite`,
            boxShadow: `0 0 12px ${hexColor}, 0 0 24px ${hexColor}50`,
          }}
        />
      </div>
    </div>
  );
};

// --- 4. Main Component (Unchanged) ---
const RadialMenu = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // --- Central Node ---
  const CentralNode = () => (
    <div className="z-10 flex items-center justify-center">
      <div
        className="
        w-36 h-36 p-2 rounded-full bg-black border-4 border-white 
        flex items-center justify-center text-4xl font-bold 
        shadow-[0_0_15px_rgba(255,255,255,0.8),inset_0_0_10px_rgba(255,255,255,0.6)]
        transition-all duration-300 hover:scale-105 cursor-pointer
      "
      >
        <img
          src="main_logo.png"
          alt="Main Logo"
          className="w-28 h-28 rounded-full object-cover"
        />
      </div>
    </div>
  );

  // --- Peripheral Nodes ---
  const PeripheralNode = ({ id, icon, color, angle, title, description }) => {
    const radius = 250;
    const radian = (angle * Math.PI) / 180;
    const nodeSize = 128; // w-32/h-32 = 8rem = 128px
    const nodePosX = 300 + radius * Math.cos(radian) - (nodeSize / 2);
    const nodePosY = 300 - radius * Math.sin(radian) - (nodeSize / 2);

    const isHovered = hoveredNode === id;

    const textRadius = radius + 80; 
    const textPosX = 300 + textRadius * Math.cos(radian);
    const textPosY = 300 - textRadius * Math.sin(radian);

    const handleMouseEnter = () => setHoveredNode(id);
    const handleMouseLeave = () => setHoveredNode(null);

    return (
      <>
        {/* The Icon Node */}
        <div
          className="absolute flex flex-col items-center justify-center transition-all duration-300 hover:z-30 cursor-pointer"
          style={{ 
            left: `${nodePosX}px`, 
            top: `${nodePosY}px`,
            width: `${nodeSize}px`,
            height: `${nodeSize}px`,
           }}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
        >
          <div
            className="relative w-full h-full rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300"
            style={{
              borderColor: color,
              boxShadow: isHovered
                ? `0 0 25px 6px ${color}, 0 0 40px 10px ${color}`
                : `0 0 10px 2px ${color}50`,
              transform: isHovered ? "scale(1.15)" : "scale(1)",
            }}
          >
            <img
              src={icon}
              alt={title}
              className="w-28 h-28 rounded-full object-cover" // w-28 = 7rem = 112px
            />
          </div>
        </div>

        {/* Hover Description Box */}
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

  // --- Render ---
  return (
    <>
      <style>{customStyles}</style>
      <div
        className="relative flex items-center justify-center text-white font-sans py-10 overflow-hidden"
        style={{
          backgroundImage: `
            url('/bgimg.png'),
            radial-gradient(#1a1a1a 1px, transparent 1px)
          `,
          backgroundSize: "cover, 50px 50px",
          backgroundPosition: "center, center",
          backgroundRepeat: "no-repeat, repeat",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
          {councils.map((node) => (
            <Connector
              key={`line-${node.id}`}
              angle={node.angle}
              hexColor={node.color}
            />
          ))}

          <CentralNode />

          {councils.map((node) => (
            <PeripheralNode key={node.id} {...node} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RadialMenu;