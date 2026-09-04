"use client";

import { useState, useMemo, useEffect, useRef } from "react";
import { FaTrophy, FaMedal, FaFilter, FaCheck } from "react-icons/fa";
import { fetchFullLeaderboardData } from "../publicActions";

export default function LeaderboardClient({ contingents: initialContingents, events: initialEvents, scores: initialScores }) {
  const [selectedEventId, setSelectedEventId] = useState("all");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const [contingents, setContingents] = useState(initialContingents);
  const [events, setEvents] = useState(initialEvents);
  const [scores, setScores] = useState(initialScores);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchFullLeaderboardData();
        if (data.contingents && data.contingents.length > 0) {
          setContingents(data.contingents);
          setEvents(data.events);
          setScores(data.scores);
        }
      } catch (error) {
        console.error("Failed to poll leaderboard data");
      }
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const leaderboard = useMemo(() => {
    // 1. Calculate scores for each contingent based on filter
    const contingentScores = contingents.map(contingent => {
      let totalScore = 0;
      const relevantScores = scores.filter(s => s.contingent_id === contingent.id);

      for (const scoreObj of relevantScores) {
        if (selectedEventId === "all" || selectedEventId === scoreObj.event_id.toString()) {
          totalScore += scoreObj.score;
        }
      }

      return {
        ...contingent,
        totalScore
      };
    });

    // 2. Sort by score descending
    return contingentScores.sort((a, b) => b.totalScore - a.totalScore);
  }, [contingents, scores, selectedEventId]);

  return (
    <div className="max-w-5xl mx-auto mb-20">
      <div className="mb-8 flex flex-col sm:flex-row items-center justify-between bg-gray-900 p-4 md:p-6 rounded-2xl border border-gray-800 shadow-xl">
        <div className="flex items-center gap-3 mb-4 sm:mb-0">
          <div className="bg-yellow-500/10 p-3 rounded-xl text-yellow-500">
            <FaTrophy size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Rankings</h2>
            <p className="text-sm text-gray-400">Current standings for IBCC</p>
          </div>
        </div>
        
        <div className="w-full sm:w-auto relative" ref={dropdownRef}>
          {/* --- UNIFIED DROPDOWN VIEW (Desktop & Mobile) --- */}
          <div className="flex justify-end w-full">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className={`flex items-center justify-between w-full sm:w-64 gap-2 px-4 h-[48px] rounded-xl border transition-all font-bold text-sm ${
                selectedEventId !== "all" || isDropdownOpen
                  ? "bg-yellow-500 text-gray-900 border-yellow-500 shadow-lg shadow-yellow-500/20"
                  : "bg-gray-900 text-gray-400 border-gray-800 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2 truncate">
                <FaFilter size={14} className="shrink-0" /> 
                <span className="truncate">
                  {selectedEventId === "all" ? "Filter by Event" : events.find(e => e.id.toString() === selectedEventId)?.name}
                </span>
              </div>
              <svg className={`w-4 h-4 shrink-0 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-full sm:w-72 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100 max-h-[60vh] sm:max-h-80 overflow-y-auto custom-scrollbar">
                <div className="flex flex-col p-1.5">
                  <button
                    onClick={() => { setSelectedEventId("all"); setIsDropdownOpen(false); }}
                    className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                      selectedEventId === "all"
                        ? "bg-yellow-500/10 text-yellow-500"
                        : "text-gray-300 hover:bg-gray-800 hover:text-white"
                    }`}
                  >
                    Overall (All Events)
                    {selectedEventId === "all" && <FaCheck size={12} className="shrink-0 ml-2" />}
                  </button>
                  {events.map((event) => (
                    <button
                      key={event.id}
                      onClick={() => { setSelectedEventId(event.id.toString()); setIsDropdownOpen(false); }}
                      className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors text-left ${
                        selectedEventId === event.id.toString()
                          ? "bg-yellow-500/10 text-yellow-500"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                      }`}
                    >
                      <span className="truncate pr-2">{event.name}</span>
                      {selectedEventId === event.id.toString() && <FaCheck size={12} className="shrink-0 ml-2" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-gray-900 shadow-2xl rounded-2xl overflow-hidden border border-gray-800">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-gray-950 border-b border-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider w-24 text-center">
                  Rank
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Contingent
                </th>
                <th scope="col" className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {leaderboard.map((item, index) => {
                let rankStyle = "text-gray-400";
                if (index === 0) rankStyle = "text-yellow-400 font-black text-xl drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]";
                if (index === 1) rankStyle = "text-gray-300 font-bold text-lg drop-shadow-[0_0_8px_rgba(209,213,219,0.3)]";
                if (index === 2) rankStyle = "text-amber-600 font-bold text-lg drop-shadow-[0_0_8px_rgba(217,119,6,0.3)]";

                return (
                  <tr key={item.id} className="group hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-5 whitespace-nowrap text-center">
                      <span className={`inline-flex items-center justify-center ${rankStyle}`}>
                        {index < 3 && <FaMedal className="mr-1.5" size={index === 0 ? 20 : 16}/>}
                        #{index + 1}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap">
                      <span className="text-base text-gray-100 font-bold tracking-wide group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 whitespace-nowrap text-right">
                      <span className="text-xl text-white font-black font-mono bg-gray-950 px-3 py-1 rounded-md border border-gray-800">
                        {item.totalScore}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
