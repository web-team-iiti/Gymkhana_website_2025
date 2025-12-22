"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt, FaArrowLeft } from "react-icons/fa";

import SpotlightCard from "@/components/Spotlight";
import FloatingLines from "@/components/Floatingline";
/* ---------------- MOCK DATA ---------------- */

const mockEvents = [
  {
    id: "1",
    title: "Gymkhana Sports",
    subtitle: "Inter-Hostel Tournament",
    date: "Oct 28, 2025",
    description:
      "Annual inter-hostel sports competition. Come cheer for your hostel!",
    imageUrl: [
      "https://placehold.co/800x500/1a202c/9ca3af?text=Gymkhana+Sports",
      "https://placehold.co/800x500/1a202c/9ca3af?text=Gymkhana+Sports",
      "https://placehold.co/800x500/1a202c/9ca3af?text=Gymkhana+Sports",
    ],
  },
  {
    id: "2",
    title: "Cultural Night",
    subtitle: "Rhythm of India",
    date: "Nov 05, 2025",
    description:
      "A celebration of diverse Indian art forms, music, and dance.",
    imageUrl: [
      "https://placehold.co/800x500/1a202c/9ca3af?text=Cultural+Night",
      "https://placehold.co/800x500/1a202c/9ca3af?text=Cultural+Night",
      "https://placehold.co/800x500/1a202c/9ca3af?text=Cultural+Night",
    ],
  },
];

/* ---------------- PAGE ---------------- */

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const router = useRouter();

  const event = mockEvents.find((e) => e.id === eventId);
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!event?.imageUrl || event.imageUrl.length <= 1) return;

    intervalRef.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % event.imageUrl.length);
    }, 3000);

    return () => clearInterval(intervalRef.current);
  }, [event]);

  if (!event) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <button
          onClick={() => router.push("/events")}
          className="flex items-center gap-2 bg-blue-700 px-6 py-2 rounded-full"
        >
          <FaArrowLeft />
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* 🌌 FLOATING LINES BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <FloatingLines
          linesGradient={["#00e5ff", "#3b82f6", "#9333ea"]}
          animationSpeed={1}
          parallax
          interactive
        />
      </div>

      {/* 🌑 DARK OVERLAY (for contrast) */}
      <div className="absolute inset-0 bg-gray-950/80 z-10" />

      {/* ✨ CONTENT */}
      <div className="relative z-20 flex justify-center py-16 px-4">
        <SpotlightCard
          className="max-w-3xl w-full rounded-2xl"
          spotlightColor="rgba(0, 200, 255, 0.25)"
        >
          <div className="bg-gray-900/70 backdrop-blur-md border border-gray-800 rounded-2xl p-6 md:p-8 shadow-xl">
            {/* IMAGE CAROUSEL */}
            <div className="relative overflow-hidden rounded-xl mb-8 h-[300px] md:h-[500px]">
              <div
                className="flex transition-transform duration-700 h-full"
                style={{ transform: `translateX(-${current * 100}%)` }}
              >
                {event.imageUrl.map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    className="min-w-full h-full object-cover"
                    alt=""
                  />
                ))}
              </div>

              <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2">
                {event.imageUrl.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrent(idx)}
                    className={`w-3 h-3 rounded-full ${
                      current === idx
                        ? "bg-blue-500 scale-110"
                        : "bg-gray-400/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* CONTENT */}
            <h1 className="text-4xl font-bold text-center mb-2">
              {event.title}
            </h1>
            <p className="text-blue-400 text-center mb-2">
              {event.subtitle}
            </p>

            <div className="flex justify-center text-gray-400 mb-6">
              <FaCalendarAlt className="mr-2" />
              {event.date}
            </div>

            <p className="text-gray-300 text-center mb-10">
              {event.description}
            </p>

            <div className="flex justify-center">
              <button
                onClick={() => router.push("/events")}
                className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 px-6 py-2 rounded-full"
              >
                <FaArrowLeft />
                Back to Events
              </button>
            </div>
          </div>
        </SpotlightCard>
      </div>
    </div>
  );
}
