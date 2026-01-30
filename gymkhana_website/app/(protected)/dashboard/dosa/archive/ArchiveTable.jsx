"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FaCheckCircle, FaTimesCircle, FaSearch, FaFilter, FaCalendarAlt, FaUser, FaChevronRight } from "react-icons/fa";
import ArchiveFilter from "@/components/ArchiveFilter"; // 👈 Import the new component

export default function ArchiveTable({ files, initialSearch }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [text, setText] = useState(initialSearch || "");
  const [isTyping, setIsTyping] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false); // 👈 New toggle state

  const filterRef = useRef(null); // 👈 Ref to detect outside clicks
  const currentStatus = searchParams.get("status"); // To style button active state

  // Close filter dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Debounced Search Effect
  useEffect(() => {
    const timer = setTimeout(() => {
      const currentQuery = searchParams.get("query") || "";
      if (text !== currentQuery) {
        const params = new URLSearchParams(searchParams);
        if (text) params.set("query", text);
        else params.delete("query");
        router.replace(`?${params.toString()}`, { scroll: false });
        setIsTyping(false);
      }
    }, 500);
    return () => clearTimeout(timer);
  }, [text, router, searchParams]);

  const handleSearchChange = (e) => {
    setText(e.target.value);
    setIsTyping(true);
  };

  return (
    <div className="space-y-6">

      {/* --- Search & Filter Bar --- */}
      <div className="flex flex-col md:flex-row gap-2 md:gap-3">

        {/* Search Input */}
        <div className="relative flex-1">
          <FaSearch className={`absolute left-3 top-3.5 ${isTyping ? "text-yellow-500 animate-pulse" : "text-gray-500"}`} />
          <input
            type="text"
            placeholder="Search title, student..."
            className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-red-500 transition-colors"
            value={text}
            onChange={handleSearchChange}
          />
        </div>

        {/* 👇 Filter Button + Dropdown Component */}
        <div className="relative shrink-0 z-20" ref={filterRef}>
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`w-full md:w-auto h-[46px] px-5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${isFilterOpen || currentStatus
                ? "bg-yellow-500 text-black border-yellow-500"
                : "bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-600 hover:text-white"
              }`}
          >
            <FaFilter />
            <span>{currentStatus ? currentStatus : "Filter"}</span>
          </button>

          <ArchiveFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
        </div>

      </div>

      {files.length === 0 ? (
        <div className="p-12 text-center text-gray-500 bg-gray-900 rounded-2xl border border-gray-800">
          {isTyping ? "Searching database..." : "No records found matching your criteria."}
        </div>
      ) : (
        <>
          {/* ======================= */}
          {/* 📱 MOBILE VIEW (CARDS)  */}
          {/* ======================= */}
          <div className="grid grid-cols-1 gap-3 md:hidden">
            {files.map((file) => (
              <Link
                key={file.id}
                href={`/dashboard/dosa/files/${file.id}`}
                className="bg-gray-900 border border-gray-800 p-4 rounded-xl active:scale-[0.99] transition-transform"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="font-bold text-white line-clamp-2 pr-2">{file.title}</div>
                  <span className={`shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold border ${file.current_stage === 'APPROVED'
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : 'bg-red-500/10 text-red-400 border-red-500/20'
                    }`}>
                    {file.current_stage === 'APPROVED' ? <FaCheckCircle /> : <FaTimesCircle />}
                    {file.current_stage}
                  </span>
                </div>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-gray-500 mt-3">
                  <div className="flex items-center gap-1.5">
                    <FaUser className="text-gray-600" /> {file.creator_name?.split(' ')[0]}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <FaCalendarAlt className="text-gray-600" /> {new Date(file.created_at).toLocaleDateString()}
                  </div>
                  <div className="ml-auto text-gray-400 flex items-center gap-1">
                    View <FaChevronRight size={10} />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ======================= */}
          {/* 💻 DESKTOP VIEW (TABLE) */}
          {/* ======================= */}
          <div className="hidden md:block bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-xl">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-950 text-gray-400 text-xs uppercase tracking-wider border-b border-gray-800">
                  <th className="p-4 font-bold">Proposal</th>
                  <th className="p-4 font-bold">Category</th>
                  <th className="p-4 font-bold">Submitted By</th>
                  <th className="p-4 font-bold">Date</th>
                  <th className="p-4 font-bold text-center">Status</th>
                  <th className="p-4 font-bold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800 text-sm text-gray-300">
                {files.map((file) => (
                  <tr key={file.id} className="hover:bg-gray-800/50 transition-colors group">
                    <td className="p-4">
                      <div className="font-bold text-white group-hover:text-red-400 transition-colors">{file.title}</div>
                      <div className="text-xs text-gray-500">#{file.id.substring(0, 8)}</div>
                    </td>
                    <td className="p-4"><span className="bg-gray-800 px-2 py-1 rounded text-xs">General</span></td>
                    <td className="p-4">{file.creator_name}</td>
                    <td className="p-4">{new Date(file.created_at).toLocaleDateString()}</td>
                    <td className="p-4 text-center">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border ${file.current_stage === 'APPROVED' ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-400 border-red-500/20'
                        }`}>
                        {file.current_stage === 'APPROVED' ? <FaCheckCircle /> : <FaTimesCircle />}
                        {file.current_stage}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link href={`/dashboard/dosa/files/${file.id}`} className="text-gray-400 hover:text-white underline text-xs">View Record</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      <div className="text-center text-xs text-gray-600 pb-8">
        {files.length >= 100 ? "Showing top 100 results." : `Found ${files.length} records`}
      </div>
    </div>
  );
}