"use client";

import { useState, useEffect, useRef } from "react";
import { FaPlus, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { addEvent, deleteEvent, updateEvent, resolveContention } from "./actions";

export default function AdminIBCCEvents({ events, clubs, contentions = [] }) {
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [creatingEvent, setCreatingEvent] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Custom Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedClub, setSelectedClub] = useState("");
  const dropdownRef = useRef(null);

  // Sync selected club when opening/closing forms
  useEffect(() => {
    if (editingEvent) setSelectedClub(editingEvent.club_id || "");
    else setSelectedClub("");
  }, [editingEvent, creatingEvent]);

  // Handle click outside to close custom dropdown
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
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const getEventStatus = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);

    if (currentTime < startDate) return { label: "Upcoming", color: "text-blue-400 bg-blue-500/10 border border-blue-500/20" };
    if (currentTime >= startDate && currentTime <= endDate) return { label: "Live", color: "text-red-400 bg-red-500/10 border border-red-500/20" };
    return { label: "Completed", color: "text-gray-500 bg-gray-800/50 border border-gray-700/50" };
  };

  const handleAddOrUpdateEvent = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    
    let res;
    if (editingEvent) {
      formData.append("id", editingEvent.id);
      res = await updateEvent(formData);
    } else {
      res = await addEvent(formData);
    }

    if (res.error) {
      alert(res.error);
      setLoading(false);
    } else {
      window.location.reload();
    }
  };

  const handleDeleteEvent = async (id) => {
    if (!confirm("Are you sure you want to delete this event? This will also delete related scores!")) return;
    setLoading(true);
    const res = await deleteEvent(id);
    if (res.error) alert(res.error);
    else window.location.reload();
    setLoading(false);
  };

  const startEdit = (e) => {
    // Convert to format required by datetime-local input, strictly enforcing IST (+5:30)
    const startD = new Date(e.start_time);
    const startStr = new Date(startD.getTime() + (330 * 60000)).toISOString().slice(0, 16);
    
    const endD = new Date(e.end_time);
    const endStr = new Date(endD.getTime() + (330 * 60000)).toISOString().slice(0, 16);

    setEditingEvent({
      ...e,
      start_time: startStr,
      end_time: endStr
    });
  };

  const cancelForm = () => {
    setEditingEvent(null);
    setCreatingEvent(false);
  };

  const handleResolveContention = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const res = await resolveContention(formData);
    if (res.error) alert(res.error);
    else window.location.reload();
    setLoading(false);
  };

  const inputClasses = "p-2.5 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm";

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">IBCC Events</h1>
          <p className="text-xs md:text-base text-gray-400 mt-1 hidden md:block">Manage all IBCC events, resolve contentions, and assign events to clubs.</p>
        </div>
        <button 
          onClick={() => { setCreatingEvent(true); setEditingEvent(null); }}
          className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3.5 py-3 md:px-6 md:py-3 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-yellow-500/10 shrink-0"
        >
          <FaPlus size={16} /> 
          <span className="hidden md:inline">Add Event</span>
        </button>
      </div>

      {/* Contentions Section */}
      {contentions.length > 0 && (
        <section className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-red-500/30 shadow-[0_0_15px_rgba(239,68,68,0.1)]">
          <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <FaExclamationCircle /> Pending Contentions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {contentions.map(c => (
              <div key={c.id} className="bg-gray-950 p-5 rounded-xl border border-gray-800 flex flex-col gap-4 relative overflow-hidden group hover:border-red-500/50 transition-colors">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
                <div className="relative z-10">
                  <div className="flex flex-col sm:flex-row justify-between items-start mb-2 gap-2">
                    <div className="w-full">
                      <h3 className="font-bold text-white text-lg break-words">{c.contingent_name}</h3>
                      <p className="text-sm font-medium text-blue-400 break-words">{c.event_name}</p>
                    </div>
                    <div className="bg-gray-800 text-gray-300 px-3 py-1 rounded-lg text-sm font-mono border border-gray-700 whitespace-nowrap self-start sm:self-auto">
                      Score: <span className="font-bold text-white">{c.score}</span>
                    </div>
                  </div>
                  <div className="bg-gray-900/50 p-3 rounded-lg border border-gray-800">
                    <p className="text-sm text-gray-400 italic">"{c.reason}"</p>
                  </div>
                </div>
                <form onSubmit={handleResolveContention} className="mt-auto relative z-10 space-y-3">
                  <input type="hidden" name="contention_id" value={c.id} />
                  <textarea name="resolution_notes" placeholder="Resolution notes..." required className="w-full px-3 py-2 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 text-sm placeholder-gray-600 resize-none h-20"></textarea>
                  <button type="submit" disabled={loading} className="w-full bg-red-600 text-white text-sm font-bold px-4 py-2.5 rounded-lg hover:bg-red-500 transition-colors flex items-center justify-center gap-2 disabled:opacity-50">
                    <FaCheckCircle /> Resolve & Close
                  </button>
                </form>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Events Management Section */}
      <section className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-white">IBCC Events List</h2>
        </div>
        
        {(editingEvent || creatingEvent) && (
          <form onSubmit={handleAddOrUpdateEvent} className={`bg-gray-950/50 p-4 sm:p-6 md:p-8 rounded-2xl border mb-8 space-y-4 sm:space-y-6 relative overflow-hidden ${editingEvent ? 'border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-green-500/30 shadow-[0_0_15px_rgba(34,197,94,0.1)]'}`}>
            {/* Subtle background glow */}
            <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${editingEvent ? 'bg-blue-500/5' : 'bg-green-500/5'}`}></div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
              <h3 className={`text-lg font-bold ${editingEvent ? 'text-blue-400' : 'text-green-400'}`}>
                {editingEvent ? "Update Event Details" : "Create New Event"}
              </h3>
              <button type="button" onClick={cancelForm} className="text-sm font-medium text-gray-400 hover:text-white bg-gray-800 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto text-center">
                Cancel
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400">Event Name</label>
                <input type="text" name="name" defaultValue={editingEvent?.name || ""} placeholder="e.g. Dance Battle" required className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 text-white text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-600 ${editingEvent ? 'focus:ring-blue-500/50 focus:border-blue-500' : 'focus:ring-green-500/50 focus:border-green-500'}`} />
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400">Assign to Club (Optional)</label>
                <div className="relative" ref={dropdownRef}>
                  {/* Hidden Input for Form Submission */}
                  <input type="hidden" name="club_id" value={selectedClub} />
                  
                  {/* Custom Select Button */}
                  <button
                    type="button"
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 transition-all ${editingEvent ? 'focus:ring-blue-500/50 focus:border-blue-500' : 'focus:ring-green-500/50 focus:border-green-500'}`}
                  >
                    <span className={`truncate ${selectedClub ? 'text-white font-medium' : 'text-gray-500'}`}>
                      {selectedClub ? clubs.find(c => c.id === selectedClub)?.name : "-- Select Club --"}
                    </span>
                    <svg className={`w-4 h-4 sm:w-5 sm:h-5 shrink-0 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                  </button>

                  {/* Custom Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl overflow-hidden max-h-60 overflow-y-auto shadow-black/50">
                      <div 
                        onClick={() => { setSelectedClub(""); setIsDropdownOpen(false); }}
                        className={`px-4 py-3 cursor-pointer transition-colors text-sm sm:text-base ${selectedClub === "" ? 'bg-gray-700 text-yellow-400 font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                      >
                        -- Select Club --
                      </div>
                      {clubs.map(club => (
                        <div 
                          key={club.id}
                          onClick={() => { setSelectedClub(club.id); setIsDropdownOpen(false); }}
                          className={`px-4 py-3 cursor-pointer transition-colors text-sm sm:text-base ${selectedClub === club.id ? 'bg-gray-700 text-yellow-400 font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                        >
                          {club.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400">Start Time</label>
                <input type="datetime-local" name="start_time" defaultValue={editingEvent?.start_time || ""} required className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 text-white text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 transition-all custom-datetime ${editingEvent ? 'focus:ring-blue-500/50 focus:border-blue-500' : 'focus:ring-green-500/50 focus:border-green-500'}`} />
              </div>
              
              <div className="space-y-1.5 sm:space-y-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400">End Time</label>
                <input type="datetime-local" name="end_time" defaultValue={editingEvent?.end_time || ""} required className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 text-white text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 transition-all custom-datetime ${editingEvent ? 'focus:ring-blue-500/50 focus:border-blue-500' : 'focus:ring-green-500/50 focus:border-green-500'}`} />
              </div>
              
              <div className="space-y-1.5 sm:space-y-2 md:col-span-2">
                <label className="block text-xs sm:text-sm font-semibold text-gray-400">Venue Location</label>
                <input type="text" name="venue" defaultValue={editingEvent?.venue || ""} placeholder="e.g. Main Auditorium" className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 text-white text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-600 ${editingEvent ? 'focus:ring-blue-500/50 focus:border-blue-500' : 'focus:ring-green-500/50 focus:border-green-500'}`} />
              </div>
            </div>

            <div className="pt-2 relative z-10">
              <button type="submit" disabled={loading} className={`w-full sm:w-auto font-bold px-8 py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${editingEvent ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]' : 'bg-green-600 text-white hover:bg-green-500 shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]'}`}>
                {editingEvent ? "Update Event Details" : "Create Event"}
              </button>
            </div>
          </form>
        )}

        {/* Mobile View: Card Layout */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {events.map((e) => {
            const status = getEventStatus(e.start_time, e.end_time);
            return (
              <div key={e.id} className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex flex-col gap-3 relative overflow-hidden group">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-bold text-white text-lg break-words">{e.name}</h3>
                  <span className={`shrink-0 px-2.5 py-1 inline-flex text-[10px] font-bold uppercase tracking-wider rounded-full ${status.color} shadow-sm`}>
                    {status.label === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 my-auto animate-ping"></span>}
                    {status.label}
                  </span>
                </div>
                
                <div className="flex flex-col gap-1 text-xs text-gray-400 font-medium">
                  <div className="flex justify-between items-center bg-gray-900/50 p-2 rounded-lg">
                    <span>Starts:</span>
                    <span className="text-gray-300">{new Date(e.start_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                  <div className="flex justify-between items-center bg-gray-900/50 p-2 rounded-lg">
                    <span>Ends:</span>
                    <span className="text-gray-300">{new Date(e.end_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</span>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-1 border-t border-gray-800/50 pt-3">
                  <button onClick={() => startEdit(e)} disabled={loading} className="px-3 py-2 text-blue-400 hover:text-white bg-blue-500/10 rounded-lg transition-all border border-blue-500/20 text-xs font-bold flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Edit
                  </button>
                  <button onClick={() => handleDeleteEvent(e.id)} disabled={loading} className="px-3 py-2 text-red-400 hover:text-white bg-red-500/10 rounded-lg transition-all border border-red-500/20 text-xs font-bold flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Delete
                  </button>
                </div>
              </div>
            );
          })}
          {events.length === 0 && (
            <div className="p-8 text-center text-gray-500 bg-gray-950 rounded-xl border border-gray-800">No events found.</div>
          )}
        </div>

        {/* Desktop View: Table Layout */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-xs font-semibold border-b border-gray-800">
              <tr>
                <th className="p-4">Event Name</th>
                <th className="p-4">Status</th>
                <th className="p-4">Start Time</th>
                <th className="p-4">End Time</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {events.map((e, index) => {
                const status = getEventStatus(e.start_time, e.end_time);
                return (
                  <tr key={e.id} className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"} hover:bg-gray-800/50 transition-colors`}>
                    <td className="p-4 font-bold text-white">{e.name}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 inline-flex text-[10px] font-bold uppercase tracking-wider rounded-full ${status.color} shadow-sm`}>
                        {status.label === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 my-auto animate-ping"></span>}
                        {status.label}
                      </span>
                    </td>
                    <td className="p-4 text-gray-400 font-medium">{new Date(e.start_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</td>
                    <td className="p-4 text-gray-400 font-medium">{new Date(e.end_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</td>
                    <td className="p-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button onClick={() => startEdit(e)} disabled={loading} title="Edit Event" className="p-2.5 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 rounded-xl transition-all shadow-sm border border-blue-500/20 hover:border-blue-500 disabled:opacity-50 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                        <button onClick={() => handleDeleteEvent(e.id)} disabled={loading} title="Delete Event" className="p-2.5 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 rounded-xl transition-all shadow-sm border border-red-500/20 hover:border-red-500 disabled:opacity-50 shrink-0">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {events.length === 0 && (
                <tr><td colSpan="5" className="p-8 text-center text-gray-500">No events found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
