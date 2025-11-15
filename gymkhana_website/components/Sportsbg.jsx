'use client';

import React, { useRef, useEffect } from "react";

const BackgroundLayout = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const noisePoints = [];
    const numPoints = 60;
    const speed = 0.002;

    // Initialize points with random positions and movement
    for (let i = 0; i < numPoints; i++) {
      noisePoints.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 1.5,
        vy: (Math.random() - 0.5) * 1.5,
        radius: 150 + Math.random() * 100,
      });
    }

    const gradientColors = [
      "rgba(0, 255, 200, 0.3)",
      "rgba(0, 180, 255, 0.25)",
      "rgba(0, 100, 150, 0.3)",
    ];

    function animate() {
      // Dark background fade
      ctx.fillStyle = "rgba(0, 10, 20, 0.15)";
      ctx.fillRect(0, 0, width, height);

      // Draw glowy smoke blobs
      for (let i = 0; i < noisePoints.length; i++) {
        const p = noisePoints[i];

        p.x += p.vx;
        p.y += p.vy;

        // wrap around edges
        if (p.x < -200) p.x = width + 200;
        if (p.x > width + 200) p.x = -200;
        if (p.y < -200) p.y = height + 200;
        if (p.y > height + 200) p.y = -200;

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        gradient.addColorStop(0, gradientColors[i % gradientColors.length]);
        gradient.addColorStop(0.6, "rgba(0, 50, 80, 0.05)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(animate);
    }

    animate();

    // Resize handling
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      {/* Background Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      />

      {/* Foreground Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default BackgroundLayout;
