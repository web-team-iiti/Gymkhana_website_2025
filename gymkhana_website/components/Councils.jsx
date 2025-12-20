"use client";
import React, { useState } from "react";

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
    angle: 45,
    title: "Science and Technology Council",
    description: "The SnT Council of IIT Indore is a community of science and technology enthusiasts who love to explore the unthinkable.",
  },
  {
    id: 2,
    color: "#fcd34d", // Yellow
    icon: "acad.jpg",
    angle: 135,
    title: "Academic Council",
    description: "The Academics Council has been trusted with the responsibility of managing executive activities in two of the most crucial aspects of student life - Academics and Career.",
  },
  {
    id: 3,
    color: "#63b3ed", // Blue
    icon: "gym.jpg",
    angle: 225,
    title: "Sports Council",
    description: "The Sports Council is the voice and face of IIT Indore sports community, responsible for management and conduction of all sporting events in the campus.",
  },
  {
    id: 4,
    color: "#f87171", // Red
    icon: "cult.jpg",
    angle: 315,
    title: "Cultural Council",
    description: "The Cultural Council of IIT Indore orchestrates a diverse array of cultural events throughout the year, fostering artistic expression and community engagement among students and faculty alike.",
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
const RadialMenu = () => {
  const [hoveredNode, setHoveredNode] = useState(null);

  // --- Central Node (Suns Intact) ---
  const CentralNode = ({ mobile }) => {
    const centralSunStyle = {
      background: "white",
      boxShadow: "0 0 15px white, 0 0 30px gold", // This is the "Rosni"
    };

    return (
      <div className={`z-10 flex items-center justify-center relative ${mobile ? "mb-8" : ""}`}>
        <div
          className={`absolute rounded-full pointer-events-none ${mobile ? "inset-[-12px]" : "inset-[-20px]"}`}
          style={{ animation: "orbit-cw 12s linear infinite" }}
        >
          {/* Top Sun */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={centralSunStyle} />
          {/* Right Sun */}
          <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={centralSunStyle} />
          {/* Bottom Sun */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-4 h-4 rounded-full" style={centralSunStyle} />
          {/* Left Sun */}
          <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full" style={centralSunStyle} />
        </div>

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

  // --- Desktop Peripheral Node (NO SUNS) ---
  const PeripheralNode = ({ id, icon, color, angle, title, description }) => {
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
        <div
          className="absolute flex flex-col items-center justify-center transition-all duration-300 hover:z-30 cursor-pointer"
          style={{ left: `${nodePosX}px`, top: `${nodePosY}px`, width: `${nodeSize}px`, height: `${nodeSize}px` }}
          onMouseOver={() => setHoveredNode(id)}
          onMouseOut={() => setHoveredNode(null)}
        >
          {/* Orbit Line (Dashed) - Kept, but NO SUNS inside */}
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
        </div>

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

        {/* 📱 MOBILE LAYOUT (SUNS INCLUDED) */}
        <div className="relative z-10 w-full px-6 py-10 flex flex-col items-center gap-8 md:hidden">
          <CentralNode mobile={true} />
           
          {councils.map((council, index) => (
            <div
              key={council.id}
              className="w-full max-w-sm rounded-2xl border bg-black/60 backdrop-blur-md p-5 flex flex-col items-center text-center transition-transform active:scale-95"
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
                {/* ☀️ Mobile Sun 1 */}
                <div className="absolute inset-[-6px] rounded-full pointer-events-none" style={{ animation: "orbit-ccw 4s linear infinite" }}>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white" 
                         style={{ backgroundColor: council.color, boxShadow: `0 0 8px ${council.color}` }} />
                </div>

                {/* ☀️ Mobile Sun 2 */}
                <div className="absolute inset-[-6px] rounded-full pointer-events-none" style={{ animation: "orbit-cw 7s linear infinite" }}>
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 rounded-full bg-white" 
                         style={{ backgroundColor: council.color, boxShadow: `0 0 8px ${council.color}` }} />
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
            </div>
          ))}
        </div>

        {/* 💻 DESKTOP LAYOUT (SUNS REMOVED) */}
        <div className="hidden md:flex relative w-[600px] h-[600px] items-center justify-center">
          {councils.map((node) => (
            <Connector key={`line-${node.id}`} angle={node.angle} hexColor={node.color} />
          ))}
          <CentralNode mobile={false} />
          {councils.map((node) => (
            <PeripheralNode key={node.id} {...node} />
          ))}
        </div>
      </div>
    </>
  );
};

export default RadialMenu;