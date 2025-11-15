// 'use client';

// import React, { useRef, useEffect } from "react";

// const CulturalBackground = ({ children }) => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext('2d');

//     let time = 0;
//     const waves = [];

//     // Wave class
//     class Wave {
//       constructor(offset, amplitude, wavelength, speed, color) {
//         this.offset = offset;
//         this.amplitude = amplitude;
//         this.wavelength = wavelength;
//         this.speed = speed;
//         this.color = color;
//       }

//       draw() {
//         ctx.beginPath();
//         for (let x = 0; x <= canvas.width; x += 1) {
//           const y =
//             canvas.height / 2 +
//             this.amplitude * Math.sin((x + time * this.speed) / this.wavelength + this.offset);
//           ctx.lineTo(x, y);
//         }
//         ctx.strokeStyle = this.color;
//         ctx.lineWidth = 2;
//         ctx.stroke();
//       }
//     }

//     // Create multiple waves
//     const waveColors = [
//       'rgba(255,192,203,0.3)', // pink
//       'rgba(255,255,102,0.3)', // yellow
//       'rgba(255,182,193,0.2)', // lighter pink
//     ];

//     for (let i = 0; i < 3; i++) {
//       const wave = new Wave(
//         Math.random() * Math.PI * 2, // offset
//         20 + Math.random() * 30,      // amplitude
//         200 + Math.random() * 300,    // wavelength
//         0.5 + Math.random() * 0.5,    // speed
//         waveColors[i % waveColors.length]
//       );
//       waves.push(wave);
//     }

//     const animate = () => {
//       // Slight gradient background
//       const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
//       gradient.addColorStop(0, 'rgba(20,20,30,1)');
//       gradient.addColorStop(1, 'rgba(10,10,20,1)');
//       ctx.fillStyle = gradient;
//       ctx.fillRect(0, 0, canvas.width, canvas.height);

//       time += 1;
//       waves.forEach(wave => wave.draw());

//       requestAnimationFrame(animate);
//     };

//     const handleResize = () => {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;
//     };
//     window.addEventListener('resize', handleResize);
//     handleResize();

//     animate();

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div className="relative">
//       <canvas
//         ref={canvasRef}
//         className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
//       />
//       <div className="relative z-10">{children}</div>
//     </div>
//   );
// };

// export default CulturalBackground;


'use client';

import React, { useRef, useEffect } from "react";

const CulturalBackground = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    resize();

    let time = 0;

    const draw = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Dark background base
      ctx.fillStyle = "#080010"; // nearly black with a hint of purple
      ctx.fillRect(0, 0, width, height);

      const layerCount = 3;
      for (let i = 0; i < layerCount; i++) {
        const waveOffset = time * (0.8 + i * 0.3); // controls motion speed per layer
        const waveHeight = height / (2.5 + i * 0.3);

        // Magenta → yellow per layer, soft glow
        const gradient = ctx.createLinearGradient(0, 0, width, height);
        gradient.addColorStop(0, `hsla(300, 100%, ${45 + i * 3}%, ${0.7 - i * 0.1})`);
        gradient.addColorStop(1, `hsla(55, 100%, ${50 + i * 3}%, ${0.7 - i * 0.1})`);
        ctx.fillStyle = gradient;
        ctx.globalAlpha = 0.6 - i * 0.15;

        // Moving wave shape
        ctx.beginPath();
        for (let x = 0; x <= width; x += 5) {
          const y =
            Math.sin(x * 0.004 + waveOffset) * (80 - i * 20) +
            Math.cos(x * 0.002 + waveOffset * 0.7) * (50 - i * 10) +
            waveHeight;
          x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.closePath();
        ctx.fill();
      }

      // Optional faint glow overlay for depth
      const glow = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        width * 0.8
      );
      glow.addColorStop(0, "rgba(255,255,255,0.02)");
      glow.addColorStop(1, "rgba(0,0,0,0)");
      ctx.globalAlpha = 1;
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      time += 0.008; // control animation speed
      requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative">
      {/* Flowing magenta-yellow background */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      />
      
      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
export default CulturalBackground;

