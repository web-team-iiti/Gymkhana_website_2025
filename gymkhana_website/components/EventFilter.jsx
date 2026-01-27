"use client";

import { useState, useRef, useEffect } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { FaFilter, FaCheck } from "react-icons/fa";

export default function EventFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    // Ref to detect clicks outside the dropdown
    const dropdownRef = useRef(null);

    const currentFilter = searchParams.get("filter") || "all";

    const filters = [
        { id: "all", label: "All Events" },
        { id: "upcoming", label: "Upcoming" },
        { id: "live", label: "Live Now" },
        { id: "completed", label: "Completed" },
    ];

    const handleFilter = (filterId) => {
        const params = new URLSearchParams(searchParams);
        if (filterId === "all") {
            params.delete("filter");
        } else {
            params.set("filter", filterId);
        }
        replace(`${pathname}?${params.toString()}`);
        setIsOpen(false); // Close dropdown immediately
    };

    // Close dropdown if clicking outside of it
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
        <>
            {/* --- 1. DESKTOP VIEW (Horizontal List) --- */}
            <div className="hidden md:flex items-center gap-3">
                {filters.map((filter) => (
                    <button
                        key={filter.id}
                        onClick={() => handleFilter(filter.id)}
                        className={`
              px-5 py-3 rounded-xl text-sm font-bold transition-all border
              ${currentFilter === filter.id
                                ? "bg-yellow-500 text-gray-900 border-yellow-500 shadow-lg shadow-yellow-500/20"
                                : "bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-700 hover:text-white"
                            }
            `}
                    >
                        {filter.label}
                    </button>
                ))}
            </div>

            {/* --- 2. MOBILE VIEW (Dropdown) --- */}
            <div className="md:hidden relative" ref={dropdownRef}>
                {/* Toggle Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            flex items-center justify-center w-[50px] h-[50px] rounded-xl border transition-all
            ${currentFilter !== 'all' || isOpen
                            ? "bg-yellow-500 text-gray-900 border-yellow-500 shadow-lg shadow-yellow-500/20"
                            : "bg-gray-900 text-gray-400 border-gray-800"
                        }
          `}
                >
                    <FaFilter size={18} />
                </button>

                {/* The Dropdown Box */}
                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                        <div className="flex flex-col p-1.5">
                            {filters.map((filter) => {
                                const isActive = currentFilter === filter.id;
                                return (
                                    <button
                                        key={filter.id}
                                        onClick={() => handleFilter(filter.id)}
                                        className={`
                      flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors
                      ${isActive
                                                ? "bg-yellow-500/10 text-yellow-500"
                                                : "text-gray-300 hover:bg-gray-800 hover:text-white"
                                            }
                    `}
                                    >
                                        {filter.label}
                                        {isActive && <FaCheck size={12} />}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}