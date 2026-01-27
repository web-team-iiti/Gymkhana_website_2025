"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaCalendarAlt, FaArrowLeft, FaMapMarkerAlt } from "react-icons/fa";
import SpotlightCard from "@/components/Spotlight";
import FloatingLines from "@/components/Floatingline";

export default function PublicEventDetails({ event }) {
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    // Handle case where image_urls might be null or empty
    const images = event.image_urls && event.image_urls.length > 0
        ? event.image_urls
        : ["https://placehold.co/800x500/1a202c/9ca3af?text=No+Image"];

    // Carousel Logic
    useEffect(() => {
        if (images.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(intervalRef.current);
    }, [images.length]);

    const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });

    return (
        <div className="relative overflow-hidden text-white bg-[#050505]">

            {/* 🌌 FLOATING LINES BACKGROUND */}
            <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
                <FloatingLines
                    linesGradient={["#00e5ff", "#3b82f6", "#9333ea"]}
                    animationSpeed={1}
                    parallax
                    interactive
                />
            </div>

            {/* ✨ CONTENT */}
            <div className="relative z-20 flex justify-center py-16 px-4">
                <SpotlightCard
                    className="max-w-4xl w-full rounded-3xl border-none bg-transparent"
                    spotlightColor="rgba(0, 200, 255, 0.15)"
                >
                    <div className="bg-gray-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 md:p-10 shadow-2xl">

                        {/* BACK BUTTON */}
                        <div className="mb-6">
                            <Link
                                href="/events"
                                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-medium"
                            >
                                <FaArrowLeft /> Back to Events
                            </Link>
                        </div>

                        {/* IMAGE CAROUSEL */}
                        <div className="relative overflow-hidden rounded-2xl mb-8 aspect-video w-full bg-gray-950">
                            <div
                                className="flex transition-transform duration-700 ease-in-out h-full"
                                style={{ transform: `translateX(-${current * 100}%)` }}
                            >
                                {images.map((src, idx) => (
                                    <img
                                        key={idx}
                                        src={src}
                                        className="min-w-full h-full object-cover"
                                        alt={`${event.title} slide ${idx + 1}`}
                                    />
                                ))}
                            </div>

                            {/* Dots Indicators */}
                            {images.length > 1 && (
                                <div className="absolute bottom-4 inset-x-0 flex justify-center gap-2 z-10">
                                    {images.map((_, idx) => (
                                        <button key={idx} onClick={() => setCurrent(idx)}
                                            className={`transition-all duration-300 rounded-full ${current === idx
                                                    ? "w-8 h-2 bg-white"
                                                    : "w-2 h-2 bg-white/50 hover:bg-white/80"
                                                }`}
                                            aria-label={`Go to slide ${idx + 1}`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* TEXT CONTENT */}
                        <div className="text-center space-y-4">
                            <h1 className="text-xl sm:text-2xl md:text-4xl font-extrabold tracking-tight text-white">
                                {event.title}
                            </h1>

                            <p className="text-lg md:text-xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-bold uppercase tracking-wider">
                                {event.subtitle}
                            </p>

                            <div className="flex items-center justify-center gap-2 text-gray-300 py-2">
                                <div className="bg-white/5 px-4 py-2 rounded-full flex items-center gap-2 border border-white/5">
                                    <FaCalendarAlt className="text-blue-400" />
                                    <span>{formattedDate}</span>
                                </div>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-700 to-transparent my-8" />

                            <p className="text-gray-300 leading-relaxed text-lg max-w-2xl mx-auto whitespace-pre-wrap">
                                {event.description}
                            </p>
                        </div>

                    </div>
                </SpotlightCard>
            </div>
        </div>
    );
}