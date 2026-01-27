"use client";

import React, { useState, useRef, useEffect } from "react";
import SearchInput from "@/components/SearchInput";
import BillsFilter from "@/components/BillsFilter";
import { FaFilter } from "react-icons/fa";

export default function BillsControls() {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input (Reusing your component) */}
            <div className="flex-1">
                <SearchInput placeholder="Search assets, events, or bills..." />
            </div>

            {/* Filter Button & Dropdown */}
            <div className="relative" ref={filterRef}>
                <button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className={`h-[50px] px-6 rounded-xl font-bold text-sm flex items-center gap-2 border transition-all ${isFilterOpen
                            ? "bg-yellow-500 text-black border-yellow-500"
                            : "bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-600 hover:text-white"
                        }`}
                >
                    <FaFilter />
                    <span>Filter</span>
                </button>

                {/* The Dropdown Component */}
                <BillsFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
            </div>
        </div>
    );
}