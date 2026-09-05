"use client";

import { useState, useEffect, useRef } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaCircle, FaSearch, FaFilter, FaCheck } from "react-icons/fa";

export default function ScheduleClient({ events }) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getEventStatus = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (currentTime < startDate) return { label: "Upcoming", color: "text-blue-400 bg-blue-500/10 border-blue-500/20" };
    if (currentTime >= startDate && currentTime <= endDate) return { label: "Live Now", color: "text-red-500 bg-red-500/10 border-red-500/20 animate-pulse font-bold", isLive: true };
    return { label: "Completed", color: "text-gray-500 bg-gray-800/50 border-gray-700/50" };
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("en-IN", { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Kolkata' });
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-IN", { weekday: 'short', month: 'short', day: 'numeric', timeZone: 'Asia/Kolkata' });
  };

  const filteredEvents = events.filter((event) => {
    const status = getEventStatus(event.start_time, event.end_time);
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (event.venue && event.venue.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesStatus = statusFilter === "All" || status.label === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-4xl mx-auto mb-20">
      
      {/* Search and Filters */}
      <div className="flex gap-3 mb-6" ref={dropdownRef}>
        <div className="relative flex-1">
          <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search events or venues..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-full bg-gray-900 shadow-lg border border-gray-800 text-white rounded-2xl pl-12 pr-4 py-3.5 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        
        {/* --- 1. DESKTOP VIEW (Horizontal List) --- */}
        <div className="hidden md:flex gap-2">
          {["All", "Live Now", "Upcoming", "Completed"].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`whitespace-nowrap px-5 py-3.5 rounded-2xl text-sm font-bold transition-all border shadow-lg ${
                statusFilter === status 
                  ? 'bg-blue-600 text-white border-blue-500 shadow-blue-500/20' 
                  : 'bg-gray-900 text-gray-400 border-gray-800 hover:border-gray-600 hover:text-white'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* --- 2. MOBILE VIEW (Dropdown) --- */}
        <div className="md:hidden relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`
              flex items-center justify-center w-[54px] h-[54px] rounded-2xl border transition-all shadow-lg
              ${statusFilter !== 'All' || isFilterOpen
                ? "bg-blue-600 text-white border-blue-500 shadow-blue-500/20"
                : "bg-gray-900 text-gray-400 border-gray-800"
              }
            `}
          >
            <FaFilter size={18} />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-900 border border-gray-800 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
              <div className="flex flex-col p-1.5">
                {["All", "Live Now", "Upcoming", "Completed"].map((status) => {
                  const isActive = statusFilter === status;
                  return (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterOpen(false);
                      }}
                      className={`
                        flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-colors
                        ${isActive
                          ? "bg-blue-500/10 text-blue-500"
                          : "text-gray-300 hover:bg-gray-800 hover:text-white"
                        }
                      `}
                    >
                      {status}
                      {isActive && <FaCheck size={12} />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="bg-gray-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-800 p-2 md:p-4">
        <div className="flex flex-col space-y-4">
          {filteredEvents.length === 0 ? (
            <div className="p-12 text-center text-gray-500 border border-dashed border-gray-700 rounded-2xl m-4 bg-gray-950/50">
              <FaCalendarAlt size={32} className="mx-auto mb-4 opacity-30 text-blue-500" />
              <h3 className="text-xl font-bold text-gray-300 mb-2">No Events Found</h3>
              <p className="text-sm">We couldn't find any events matching your current search or filters.</p>
              {(searchQuery || statusFilter !== "All") && (
                <button 
                  onClick={() => { setSearchQuery(""); setStatusFilter("All"); }}
                  className="mt-4 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white text-sm font-semibold rounded-lg transition-colors"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            filteredEvents.map((event) => {
              const status = getEventStatus(event.start_time, event.end_time);
              return (
                <div key={event.id} className={`p-5 md:p-6 bg-gray-950/50 rounded-2xl border ${status.isLive ? 'border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]' : 'border-gray-800 hover:border-blue-500/30'} transition-all group relative overflow-hidden`}>
                  
                  {/* Background Glow for Live Events */}
                  {status.isLive && <div className="absolute -top-10 -right-10 w-32 h-32 bg-red-500/10 blur-3xl rounded-full pointer-events-none"></div>}

                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center relative z-10">
                    <div className="mb-4 md:mb-0">
                      <h3 className={`text-2xl font-bold mb-2 ${status.isLive ? 'text-white' : 'text-gray-200 group-hover:text-blue-400'} transition-colors`}>{event.name}</h3>
                      
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-400">
                        <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                          <FaCalendarAlt className="text-blue-500" />
                          <span>{formatDate(event.start_time)}</span>
                          <span className="mx-1 text-gray-600">•</span>
                          <span className="text-gray-300">{formatTime(event.start_time)} - {formatTime(event.end_time)}</span>
                        </div>
                        
                        {event.venue && (
                          <div className="flex items-center gap-2 bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-800">
                            <FaMapMarkerAlt className="text-yellow-500" />
                            <span>{event.venue}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    <div className="mt-2 md:mt-0">
                      <span className={`px-4 py-1.5 inline-flex text-xs leading-5 uppercase tracking-wider rounded-full border ${status.color}`}>
                        {status.isLive && <FaCircle size={8} className="mr-2 my-auto animate-ping text-red-500" />}
                        {status.label}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
