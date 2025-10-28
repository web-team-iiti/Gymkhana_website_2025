"use client";
import React, { useState } from "react";

// --- 1. Custom CSS for Wave Animation and Glow Effects ---
const customStyles = `
  /* Continuous synchronized outward wave */
  @keyframes wave-sync {
    0% {
      stroke-dashoffset: 150;
      stroke-opacity: 0.2;
    }
    30% {
      stroke-opacity: 0.8;
    }
    60% {
      stroke-dashoffset: 0;
      stroke-opacity: 1;
    }
    100% {
      stroke-dashoffset: -150;
      stroke-opacity: 0.2;
    }
  }

  /* One-time pulse when hovered */
  @keyframes wave-pulse {
    0% {
      stroke-dashoffset: 150;
      stroke-opacity: 0.6;
    }
    50% {
      stroke-dashoffset: 50;
      stroke-opacity: 1;
    }
    100% {
      stroke-dashoffset: 0;
      stroke-opacity: 0;
    }
  }

  .connector-line {
    stroke-width: 2;
    pointer-events: none;
    stroke-dasharray: 6 8;
    filter: drop-shadow(0 0 6px currentColor);
  }

  .wave-sync {
    animation: wave-sync 2s linear infinite;
  }

  .wave-pulse {
    animation: wave-pulse 0.8s ease-out forwards;
  }

  .glow-text {
    text-shadow: 0 0 6px currentColor, 0 0 15px currentColor;
  }
`;

// --- 2. Node Data ---
const councils = [
  {
    id: 1,
    color: "#48bb78",
    icon: "snt.jpg",
    angle: 45,
    title: "Science and Technology Council",
    description:
      "The SnT Council of IIT Indore is a community of science and technology enthusiasts who love to explore the unthinkable.",
  },
  {
    id: 2,
    color: "#f87171",
    icon: "cult.jpg",
    angle: 315,
    title: "Cultural Council",
    description:
      "The Cultural Council of IIT Indore orchestrates a diverse array of cultural events throughout the year, fostering artistic expression and community engagement among students and faculty alike.",
  },
  {
    id: 3,
    color: "#63b3ed",
    icon: "gym.jpg",
    angle: 225,
    title: "Sports Council",
    description:
      "The Sports Council is the voice and face of IIT Indore sports community, responsible for management and conduction of all sporting events in the campus.",
  },
  {
    id: 4,
    color: "#fcd34d",
    icon: "acad.jpg",
    angle: 135,
    title: "Academic Council",
    description:
      "The Academics Council has been trusted with the responsibility of managing executive activities in two of the most crucial aspects of student life - Academics and Career.",
  },
];

// --- 3. Connector Component ---
const Connector = ({ angle, hexColor, isPulsing, animationKey }) => {
  const animationClass = isPulsing ? "wave-pulse" : "wave-sync";
  return (
    <svg
      key={animationKey}
      className="absolute w-[300px] h-[300px] origin-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      style={{ transform: `rotate(${angle}deg)` }}
      viewBox="0 0 300 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="150"
        y1="150"
        x2="300"
        y2="150"
        stroke={hexColor}
        className={`connector-line ${animationClass}`}
      />
    </svg>
  );
};

// --- 4. Main Component ---
const RadialMenu = () => {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [pulseKeyMap, setPulseKeyMap] = useState({});

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
    const posX = 300 + radius * Math.cos(radian) - 35;
    const posY = 300 - radius * Math.sin(radian) - 35;
    const isHovered = hoveredNode === id;

    const textRadius = radius + 40;
    const textPosX = 300 + textRadius * Math.cos(radian);
    const textPosY = 300 - textRadius * Math.sin(radian);

    const handleMouseEnter = () => {
      setHoveredNode(id);
      setPulseKeyMap((prev) => ({
        ...prev,
        [id]: Date.now(),
      }));
    };

    const handleMouseLeave = () => setHoveredNode(null);

    return (
      <>
        <div
          className="absolute flex flex-col items-center justify-center transition-all duration-300 hover:z-30 cursor-pointer"
          style={{ left: `${posX}px`, top: `${posY}px` }}
          onMouseOver={handleMouseEnter}
          onMouseOut={handleMouseLeave}
        >
          <div
            className="relative w-32 h-32 rounded-full bg-black border-2 flex items-center justify-center transition-all duration-300"
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
              className="w-28 h-28 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Hover Description */}
        {isHovered && (
          <div
            className="absolute z-50 transition-all max-w-sm duration-300 opacity-100 backdrop-blur-md rounded-2xl p-4 text-center shadow-lg pointer-events-none"
            style={{
              left: `${textPosX - 150}px`,
              top: `${textPosY}px`,
              transform: "translate(-50%, -50%) scale(1)",
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
        className="relative flex items-center justify-center text-white font-sans min-h-screen"
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
        {/* Optional dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Main Radial Menu */}
        <div className="relative w-[600px] h-[600px] flex items-center justify-center">
          {councils.map((node) => (
            <Connector
              key={`line-${node.id}`}
              animationKey={pulseKeyMap[node.id] || `line-${node.id}`}
              angle={node.angle}
              hexColor={node.color}
              isPulsing={hoveredNode === node.id}
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
