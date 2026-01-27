"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";

const councils = [
    { id: "SCITECH", label: "Science and Technology Council" },
    { id: "ACADEMIC", label: "Academic Council" },
    { id: "SPORTS", label: "Sports Council" },
    { id: "CULTURAL", label: "Cultural Council" },
    { id: "OUTREACH", label: "Outreach and Alumni Council" },
];

export default function InventoryFilters({ isOpen, onClose }) {
    const searchParams = useSearchParams();
    const currentCouncil = searchParams.get("council");

    // Helper to generate links (replaces router.push for better SEO/Performance)
    const getLink = (value) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set("council", value);
        else params.delete("council");
        return `?${params.toString()}`;
    };

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-full mt-2 w-full md:w-64 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <div className="flex flex-col p-1.5 max-h-[60vh] overflow-y-auto">
                
                {/* 'All' Option */}
                <Link
                    href={getLink(null)}
                    onClick={onClose}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                        !currentCouncil
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                >
                    <span>All Councils</span>
                    {!currentCouncil && <FaCheck size={12} />}
                </Link>

                {/* Council Options */}
                {councils.map((c) => {
                    const isActive = currentCouncil === c.id;
                    return (
                        <Link
                            key={c.id}
                            href={getLink(c.id)}
                            onClick={onClose}
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                                isActive
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                            }`}
                        >
                            <span>{c.label}</span>
                            {isActive && <FaCheck size={12} />}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}