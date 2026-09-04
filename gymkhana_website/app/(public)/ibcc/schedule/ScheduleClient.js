"use client";

import { useState, useEffect } from "react";
import { FaCalendarAlt, FaMapMarkerAlt, FaCircle } from "react-icons/fa";

export default function ScheduleClient({ events }) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
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

  return (
    <div className="max-w-4xl mx-auto mb-20">
      <div className="bg-gray-900 shadow-2xl rounded-3xl overflow-hidden border border-gray-800 p-2 md:p-4">
        <div className="flex flex-col space-y-4">
          {events.length === 0 ? (
            <div className="p-12 text-center text-gray-500 border border-dashed border-gray-700 rounded-2xl m-4">
              <FaCalendarAlt size={32} className="mx-auto mb-3 opacity-50" />
              <p>No events scheduled yet.</p>
            </div>
          ) : (
            events.map((event) => {
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
