"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FaTrophy, FaCalendarAlt, FaPlayCircle, FaTimes } from 'react-icons/fa';
import { fetchLiveIBCCData } from '@/app/(public)/ibcc/publicActions';

export default function IBCCPodiumHome({ leaderboard: initialLeaderboard, liveEvent: initialLiveEvent }) {
  const [showToast, setShowToast] = useState(false);
  const [leaderboard, setLeaderboard] = useState(initialLeaderboard);
  const [liveEvent, setLiveEvent] = useState(initialLiveEvent);

  useEffect(() => {
    if (liveEvent) {
      // Delay showing toast for a smooth entrance
      const timer = setTimeout(() => setShowToast(true), 1500);
      return () => clearTimeout(timer);
    } else {
      setShowToast(false);
    }
  }, [liveEvent]);

  // Real-time polling every 10 seconds
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const data = await fetchLiveIBCCData();
        if (data.leaderboard && data.leaderboard.length > 0) {
          setLeaderboard(data.leaderboard);
        }
        setLiveEvent(data.liveEvent);
      } catch (error) {
        console.error("Failed to poll IBCC data");
      }
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);

  if (!leaderboard || leaderboard.length === 0) return null;

  const top3 = leaderboard.slice(0, 3);
  // Pad with nulls if fewer than 3
  while (top3.length < 3) top3.push(null);

  // Rearrange for visual podium: [2nd, 1st, 3rd]
  const podiumOrder = [top3[1], top3[0], top3[2]];
  const podiumHeights = ["h-32", "h-48", "h-24"];
  const podiumColors = [
    "bg-gradient-to-t from-gray-400/20 to-gray-300/40 border-gray-300", // Silver
    "bg-gradient-to-t from-yellow-500/20 to-yellow-400/40 border-yellow-400", // Gold
    "bg-gradient-to-t from-amber-700/20 to-amber-600/40 border-amber-600" // Bronze
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-16">
      
      {/* --- Live Toast (Bottom Right on Desktop, Full Width Bottom on Mobile) --- */}
      {liveEvent && (
        <div className={`fixed bottom-4 left-4 right-4 md:left-auto md:bottom-6 md:right-6 z-50 transition-all duration-700 transform ${showToast ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'}`}>
          <div className="bg-gray-900 border border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] rounded-2xl p-4 pr-12 relative flex items-center gap-4">
            <button onClick={() => setShowToast(false)} className="absolute top-2 right-2 text-gray-500 hover:text-white p-2">
              <FaTimes size={14} />
            </button>
            <div className="relative flex h-4 w-4 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
            </div>
            <div className="truncate">
              <p className="text-red-400 font-bold text-xs uppercase tracking-widest mb-0.5">Live Now</p>
              <h4 className="text-white font-bold text-sm truncate">{liveEvent.name}</h4>
              <Link href="/ibcc/schedule" className="text-xs text-gray-400 hover:text-yellow-500 underline underline-offset-2 mt-1 inline-block">
                View Schedule
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* --- Main Podium Section --- */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 bg-gray-900/40 border border-gray-800/60 rounded-3xl p-6 sm:p-8 md:p-12 backdrop-blur-sm relative overflow-hidden">
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 md:w-96 h-64 md:h-96 bg-yellow-500/5 rounded-full blur-3xl pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 left-0 w-64 md:w-96 h-64 md:h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none -translate-x-1/3 translate-y-1/3"></div>

        {/* Text Content */}
        <div className="flex-1 text-center md:text-left relative z-10 w-full">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-4 sm:mb-6 whitespace-nowrap">
            <FaTrophy /> Inter Branch Cultural Clashes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 leading-tight">
            Who will take the <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-amber-600 block sm:inline">Crown?</span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 max-w-lg mx-auto md:mx-0">
            Follow the ultimate battle between branches in Cultural events. See the current standings and upcoming battles.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-4 w-full">
            <Link href="/ibcc/leaderboard" className="w-full sm:w-auto bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold px-6 py-3.5 rounded-xl transition-all shadow-[0_0_20px_rgba(234,179,8,0.3)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)] flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaTrophy /> Full Leaderboard
            </Link>
            <Link href="/ibcc/schedule" className="w-full sm:w-auto bg-gray-800 hover:bg-gray-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all border border-gray-700 hover:border-gray-600 flex items-center justify-center gap-2 text-sm sm:text-base">
              <FaCalendarAlt /> Live Schedule
            </Link>
          </div>
        </div>

        {/* The Podium */}
        <div className="flex-1 w-full max-w-md flex items-end justify-center gap-1 sm:gap-2 md:gap-4 relative z-10 mt-8 md:mt-0 h-48 sm:h-56 md:h-64">
          {podiumOrder.map((contingent, index) => {
            const isFirst = index === 1;
            const rank = isFirst ? 1 : (index === 0 ? 2 : 3);
            
            return (
              <div key={index} className="flex flex-col items-center w-1/3 relative group">
                {/* Score & Name floating above */}
                {contingent ? (
                  <div className={`flex flex-col items-center mb-2 sm:mb-4 text-center transition-transform duration-500 group-hover:-translate-y-2`}>
                    <span className={`text-lg sm:text-xl font-black ${isFirst ? 'text-yellow-400 drop-shadow-[0_0_8px_rgba(250,204,21,0.5)]' : 'text-white'}`}>
                      {contingent.total_score}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-400 font-bold tracking-wide line-clamp-1 px-1 sm:px-2 mt-0.5 sm:mt-1 w-full">
                      {contingent.name}
                    </span>
                  </div>
                ) : (
                  <div className="mb-2 sm:mb-4 h-8 sm:h-12"></div>
                )}
                
                {/* The Pillar */}
                <div className={`w-full ${isFirst ? 'h-32 sm:h-40 md:h-48' : rank === 2 ? 'h-24 sm:h-28 md:h-32' : 'h-16 sm:h-20 md:h-24'} ${podiumColors[index]} rounded-t-lg border-t-4 border-l border-r shadow-lg flex items-start justify-center relative overflow-hidden backdrop-blur-sm`}>
                  {/* Inner shine */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
                  
                  <span className={`mt-2 sm:mt-4 text-xl sm:text-2xl md:text-3xl font-black opacity-40 ${isFirst ? 'text-yellow-100' : 'text-white'}`}>
                    {rank}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
