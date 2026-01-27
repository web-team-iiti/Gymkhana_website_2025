"use client";

import React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { FaCheck } from "react-icons/fa";

const filterOptions = [
    { id: "SCITECH", label: "Science & Tech" },
    { id: "ACADEMIC", label: "Academic" },
    { id: "SPORTS", label: "Sports" },
    { id: "CULTURAL", label: "Cultural" },
    { id: "OUTREACH", label: "Outreach" },
    { id: "EVENT", label: "Events" }, // 👈 Added Option
];

export default function BillsFilter({ isOpen, onClose }) {
    const searchParams = useSearchParams();
    const currentFilter = searchParams.get("council");

    // Helper to generate URL with existing search params + new filter
    const getLink = (value) => {
        const params = new URLSearchParams(searchParams);
        if (value) params.set("council", value);
        else params.delete("council"); // 'All' removes the param
        return `?${params.toString()}`;
    };

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-full mt-2 w-56 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 origin-top-right">
            <div className="flex flex-col p-1.5">

                {/* 'All' Option */}
                <Link
                    href={getLink(null)}
                    onClick={onClose}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${!currentFilter
                            ? "bg-yellow-500/10 text-yellow-500"
                            : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }`}
                >
                    <span>All Items</span>
                    {!currentFilter && <FaCheck size={12} />}
                </Link>

                {/* Filter Options */}
                {filterOptions.map((opt) => {
                    const isActive = currentFilter === opt.id;
                    return (
                        <Link
                            key={opt.id}
                            href={getLink(opt.id)}
                            onClick={onClose}
                            className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors ${isActive
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                }`}
                        >
                            <span>{opt.label}</span>
                            {isActive && <FaCheck size={12} />}
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}