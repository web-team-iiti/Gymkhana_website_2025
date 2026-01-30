"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaGlobe } from "react-icons/fa";

export default function ArchiveFilter({ isOpen, onClose }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get("status") || "ALL";

    const handleFilter = (status) => {
        const params = new URLSearchParams(searchParams);
        if (status === "ALL") {
            params.delete("status");
        } else {
            params.set("status", status);
        }
        router.replace(`?${params.toString()}`, { scroll: false });
        onClose(); // Close menu after selection
    };

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 top-[110%] w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in zoom-in-95 duration-200">

            <div className="px-4 py-3 border-b border-gray-800 text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                Filter by Status
            </div>

            <button
                onClick={() => handleFilter("ALL")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${currentStatus === 'ALL' ? 'bg-yellow-500/10 text-yellow-500' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
                <FaGlobe className={currentStatus === 'ALL' ? 'text-yellow-500' : 'text-gray-600'} />
                All Records
            </button>

            <button
                onClick={() => handleFilter("APPROVED")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${currentStatus === 'APPROVED' ? 'bg-green-500/10 text-green-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
                <FaCheckCircle className={currentStatus === 'APPROVED' ? 'text-green-400' : 'text-gray-600'} />
                Approved
            </button>

            <button
                onClick={() => handleFilter("REJECTED")}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-left ${currentStatus === 'REJECTED' ? 'bg-red-500/10 text-red-400' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
            >
                <FaTimesCircle className={currentStatus === 'REJECTED' ? 'text-red-400' : 'text-gray-600'} />
                Rejected
            </button>
        </div>
    );
}