"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateEventByClubHead } from "./actions";
import { FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ClubHeadEventsClient({ events }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [currentTime, setCurrentTime] = useState(new Date());

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

  const startEdit = (e) => {
    setMessage({ type: "", text: "" });
    const startD = new Date(e.start_time);
    const startStr = new Date(startD.getTime() + (330 * 60000)).toISOString().slice(0, 16);
    const endD = new Date(e.end_time);
    const endStr = new Date(endD.getTime() + (330 * 60000)).toISOString().slice(0, 16);
    setEditingEvent({ ...e, start_time: startStr, end_time: endStr });
  };

  const cancelEdit = () => {
    setEditingEvent(null);
    setMessage({ type: "", text: "" });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.target);
    formData.append("id", editingEvent.id);

    const result = await updateEventByClubHead(formData);

    if (result.error) {
      setMessage({ type: "error", text: result.error });
      setLoading(false);
    } else {
      setMessage({ type: "success", text: "Event updated successfully!" });
      setEditingEvent(null);
      setLoading(false);
      router.refresh();
    }
  };

  const inputClasses = "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-950 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600";

  return (
    <div className="space-y-6">
      {/* Status Message */}
      {message.text && (
        <div className={`p-4 rounded-xl font-medium text-sm flex items-center gap-3 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
          {message.type === 'error' ? <FaExclamationCircle size={18} /> : <FaCheckCircle size={18} />}
          {message.text}
        </div>
      )}

      {/* Edit Form */}
      {editingEvent && (
        <form onSubmit={handleUpdate} className="bg-gray-950/50 p-4 sm:p-6 md:p-8 rounded-2xl border border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.1)] space-y-4 sm:space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-blue-500/5"></div>

          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 relative z-10">
            <h3 className="text-lg font-bold text-blue-400">Edit Event Details</h3>
            <button type="button" onClick={cancelEdit} className="text-sm font-medium text-gray-400 hover:text-white bg-gray-800 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto text-center">
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-400">Event Name</label>
              <input type="text" name="name" defaultValue={editingEvent.name} required className={inputClasses} />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-400">Venue Location</label>
              <input type="text" name="venue" defaultValue={editingEvent.venue || ""} placeholder="e.g. Main Auditorium" className={inputClasses} />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-400">Start Time</label>
              <input type="datetime-local" name="start_time" defaultValue={editingEvent.start_time} required className={`${inputClasses} custom-datetime`} />
            </div>
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-400">End Time</label>
              <input type="datetime-local" name="end_time" defaultValue={editingEvent.end_time} required className={`${inputClasses} custom-datetime`} />
            </div>
          </div>

          <div className="pt-2 relative z-10">
            <button type="submit" disabled={loading} className="w-full sm:w-auto font-bold px-8 py-3.5 rounded-xl bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
              {loading ? "Updating..." : "Update Event"}
            </button>
          </div>
        </form>
      )}

      {/* Events List */}
      {events.length === 0 ? (
        <div className="p-8 sm:p-12 text-center bg-gray-950 rounded-xl border border-gray-800 border-dashed flex flex-col items-center">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg className="w-7 h-7 sm:w-8 sm:h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-white mb-2">No Events Assigned</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">No IBCC events are currently assigned to your club. Contact the GS to get events assigned.</p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800">
            <table className="min-w-full text-sm text-left">
              <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-xs font-semibold border-b border-gray-800">
                <tr>
                  <th className="p-4">Event Name</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Start Time</th>
                  <th className="p-4">End Time</th>
                  <th className="p-4">Venue</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {events.map((e, idx) => {
                  const status = getEventStatus(e.start_time, e.end_time);
                  return (
                    <tr key={e.id} className={`${idx % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"} hover:bg-gray-800/50 transition-colors`}>
                      <td className="p-4 font-bold text-white">{e.name}</td>
                      <td className="p-4">
                        <span className={`px-3 py-1 inline-flex text-[10px] font-bold uppercase tracking-wider rounded-full ${status.color} shadow-sm`}>
                          {status.label === "Live" && <span className="w-1.5 h-1.5 rounded-full bg-red-500 mr-1.5 my-auto animate-ping"></span>}
                          {status.label}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400 font-medium">{new Date(e.start_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</td>
                      <td className="p-4 text-gray-400 font-medium">{new Date(e.end_time).toLocaleString("en-IN", { timeZone: "Asia/Kolkata", dateStyle: "medium", timeStyle: "short" })}</td>
                      <td className="p-4 text-gray-400">{e.venue || "—"}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => startEdit(e)} disabled={loading} title="Edit Event" className="p-2.5 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 rounded-xl transition-all shadow-sm border border-blue-500/20 hover:border-blue-500 disabled:opacity-50">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
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

                  {e.venue && (
                    <div className="flex items-center gap-1.5 text-xs text-gray-400">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                      <span className="font-medium">{e.venue}</span>
                    </div>
                  )}

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

                  <div className="flex justify-end mt-1 border-t border-gray-800/50 pt-3">
                    <button onClick={() => startEdit(e)} disabled={loading} className="px-4 py-2 text-blue-400 hover:text-white bg-blue-500/10 rounded-lg transition-all border border-blue-500/20 text-xs font-bold flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                      Edit Event
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
