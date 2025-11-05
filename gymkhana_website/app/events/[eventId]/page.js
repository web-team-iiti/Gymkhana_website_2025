"use client";

import React, { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import { FaCalendarAlt } from "react-icons/fa";

// 🧩 Same dummy data from UpcomingEvents
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
            "https://placehold.co/800x500/1a202c/9ca3af?text=Gymkhana+Sports"
        ]
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
        ]
    },
    {
        id: "3",
        title: "Tech Workshop",
        subtitle: "AI & Machine Learning",
        date: "Nov 12, 2025",
        description:
            "Hands-on workshop on the fundamentals of AI and ML with Python.",
        imageUrl: [
            "https://placehold.co/800x500/1a202c/9ca3af?text=Tech+Workshop",
            "https://placehold.co/800x500/1a202c/9ca3af?text=Tech+Workshop",
            "https://placehold.co/800x500/1a202c/9ca3af?text=Tech+Workshop",
        ]
    },
    {
        id: "4",
        title: "Academic Seminar",
        subtitle: "Career Pathways",
        date: "Nov 15, 2025",
        description:
            "Learn about diverse career opportunities after graduation from industry experts.",
        imageUrl: [
            "https://placehold.co/800x500/1a202c/9ca3af?text=Career+Seminar",
            "https://placehold.co/800x500/1a202c/9ca3af?text=Career+Seminar",
            "https://placehold.co/800x500/1a202c/9ca3af?text=Career+Seminar",
        ]
    },
    {
        id: "5",
        title: "Coding Competition",
        subtitle: "Code Sprint '25",
        date: "Nov 20, 2025",
        description:
            "Put your problem-solving skills to the test in our annual coding sprint.",
        imageUrl: [
            "https://placehold.co/800x500/1a202c/9ca3af?text=Code+Sprint",
            "https://placehold.co/800x500/1a202c/9ca3af?text=Code+Sprint",
            "https://placehold.co/800x500/1a202c/9ca3af?text=Code+Sprint",
        ]
    },
];

const EventDetailsPage = () => {
    const { eventId } = useParams();
    const router = useRouter();

    const event = mockEvents.find((e) => e.id === eventId);
    const [current, setCurrent] = useState(0);
    const intervalRef = useRef(null);

    useEffect(() => {
        if (!event?.imageUrl || event.imageUrl.length <= 1) return;

        intervalRef.current = setInterval(() => {
            setCurrent((prev) => (prev + 1) % event.imageUrl.length);
        }, 3000); // Auto-scroll every 3 seconds

        return () => clearInterval(intervalRef.current);
    }, [event]);

    if (!event) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white text-center">
                <h1 className="text-3xl font-bold mb-4">Event not found</h1>
                <button
                    onClick={() => router.push("/events")}
                    className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-4 py-2"
                >
                    Back to Events
                </button>
            </div>
        );
    }

    return (
        <div className="w-full flex flex-col items-center py-16 bg-gray-950 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] text-white">
            <div className="max-w-3xl w-full">
                {/* 🖼️ Auto-scrolling image carousel (centered & fixed height) */}
                <div className="relative overflow-hidden rounded-2xl shadow-lg mb-8 w-full h-[500px]">
                    <div
                        className="flex transition-transform duration-700 ease-in-out h-full"
                        style={{
                            transform: `translateX(-${current * 100}%)`,
                        }}
                    >
                        {event.imageUrl.map((src, idx) => (
                            <div key={idx} className="min-w-full h-full flex-shrink-0">
                                <img
                                    src={src}
                                    alt={`${event.title} ${idx + 1}`}
                                    className="w-full h-full object-cover"
                                    onError={(e) =>
                                    (e.target.src =
                                        "https://placehold.co/800x500/1a202c/9ca3af?text=Event+Image")
                                    }
                                />
                            </div>
                        ))}
                    </div>

                    {/* Dots for tracking */}
                    {event.imageUrl.length > 1 && (
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            {event.imageUrl.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => setCurrent(idx)}
                                    className={`w-3 h-3 rounded-full transition-all duration-300 ${current === idx ? "bg-blue-500 scale-110" : "bg-gray-400/70"
                                        }`}
                                ></button>
                            ))}
                        </div>
                    )}
                </div>

                <h1 className="text-4xl font-bold mb-2 text-center">{event.title}</h1>
                <p className="text-lg text-blue-400 text-center mb-2">
                    {event.subtitle}
                </p>

                <div className="flex items-center justify-center text-gray-400 mb-4">
                    <FaCalendarAlt className="mr-2" /> {event.date}
                </div>

                <p className="text-gray-300 text-center leading-relaxed mb-8">
                    {event.description}
                </p>

                <div className="flex justify-center">
                    <button
                        onClick={() => router.push("/events")}
                        className="bg-blue-700 hover:bg-blue-800 rounded-full py-2 px-6 transition"
                    >
                        ← Back to Events
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EventDetailsPage;
