"use client";

import React, { useState, useRef, useEffect } from "react";
import SearchInput from "./SearchInput";       // Reusing your component
import InventoryFilters from "./InventoryFilters"; // Reusing the component above
import { FaFilter, FaTimes } from "react-icons/fa";

export default function InventoryControls() {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown if clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="flex items-center gap-3 w-full relative z-20" ref={dropdownRef}>
            
            {/* 1. Reuse SearchInput (Expands to fill space) */}
            <div className="flex-1">
                {/* Note: Ensure SearchInput.jsx has className="w-full ..." */}
                <SearchInput placeholder="Search items..." />
            </div>

            {/* 2. The Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`h-[48px] w-[48px] flex items-center justify-center rounded-xl border transition-all shrink-0 ${
                    isOpen
                        ? "bg-yellow-500 text-black border-yellow-500 shadow-lg"
                        : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white hover:border-gray-600"
                }`}
            >
                {isOpen ? <FaTimes size={18} /> : <FaFilter size={16} />}
            </button>

            {/* 3. The Dropdown Menu (Passed isOpen state) */}
            <InventoryFilters isOpen={isOpen} onClose={() => setIsOpen(false)} />

        </div>
    );
}