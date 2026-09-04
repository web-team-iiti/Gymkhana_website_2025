"use client";

import { useState } from "react";
import { addEvent, deleteEvent, updateEvent, resolveContention } from "./actions";

export default function AdminIBCCPanel({ events, contentions, clubs, showContentions = true, showCreateEvent = true, showEventList = true }) {
  const [loading, setLoading] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

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

  const handleResolve = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const res = await resolveContention(formData);
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

  const cancelEdit = () => setEditingEvent(null);

  const inputClasses = "p-2.5 bg-gray-950 border border-gray-800 text-white rounded-lg focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 w-full text-sm";

  return (
    <div className="space-y-8">
      {/* Pending Contentions Section */}
      {showContentions && (
        <section className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-red-500/20">
          <h2 className="text-xl font-bold text-red-400 mb-6 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </span>
            Pending Contentions
          </h2>
          {contentions.length === 0 ? (
            <p className="text-gray-400 text-sm italic">No pending contentions. All clear!</p>
          ) : (
            <div className="space-y-4">
              {contentions.map(c => (
                <div key={c.id} className="border border-red-500/20 rounded-xl p-5 bg-red-500/5 hover:border-red-500/40 transition-colors">
                  <div className="flex justify-between items-start mb-4">
                      <div>
                          <h3 className="font-bold text-white text-lg">{c.contingent_name}</h3>
                          <p className="text-sm font-medium text-blue-400">{c.event_name}</p>
                      </div>
                      <div className="text-right">
                          <span className="text-xs text-gray-500 uppercase font-bold tracking-wider block mb-1">Contested Score</span>
                          <span className="text-xl font-bold text-red-400">{c.score}</span>
                      </div>
                  </div>
                  
                  <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
                      <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-2">Reason for Contention</p>
                      <p className="text-sm text-gray-300 leading-relaxed">{c.reason}</p>
                  </div>
                  
                  <form onSubmit={handleResolve} className="flex flex-col sm:flex-row gap-3">
                    <input type="hidden" name="contention_id" value={c.id} />
                    <input type="text" name="resolution_notes" placeholder="Resolution notes (required)..." required className="flex-1 p-3 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white focus:outline-none focus:border-green-500" />
                    <button type="submit" disabled={loading} className="bg-green-600 text-white font-medium px-6 py-3 rounded-lg text-sm hover:bg-green-500 shadow-lg shadow-green-900/20 disabled:opacity-50 whitespace-nowrap">
                      Mark Resolved
                    </button>
                  </form>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Events Management Section */}
      {(showCreateEvent || showEventList) && (
        <section className="bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-800">
          <h2 className="text-xl font-bold text-white mb-6">Manage Events</h2>
          
          {showCreateEvent && (
            <form onSubmit={handleAddOrUpdateEvent} className="bg-gray-950/50 p-6 md:p-8 rounded-2xl border border-gray-800 mb-8 space-y-6 relative overflow-hidden">
              {/* Subtle background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-lg font-bold text-blue-400">
                  {editingEvent ? "Edit Event Details" : "Create New Event"}
                </h3>
                {editingEvent && (
                  <button type="button" onClick={cancelEdit} className="text-sm font-medium text-gray-400 hover:text-white bg-gray-800 px-4 py-2 rounded-lg transition-colors">
                    Cancel Edit
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-400">Event Name</label>
                  <input type="text" name="name" defaultValue={editingEvent?.name || ""} placeholder="e.g. Dance Battle" required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-400">Assign to Club (Optional)</label>
                  <select name="club_id" defaultValue={editingEvent?.club_id || ""} className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none cursor-pointer">
                    <option value="" className="text-gray-500">-- Select Club --</option>
                    {clubs.map(club => <option key={club.id} value={club.id}>{club.name}</option>)}
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-400">Start Time</label>
                  <input type="datetime-local" name="start_time" defaultValue={editingEvent?.start_time || ""} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all custom-datetime" />
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-400">End Time</label>
                  <input type="datetime-local" name="end_time" defaultValue={editingEvent?.end_time || ""} required className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all custom-datetime" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-400">Venue Location</label>
                  <input type="text" name="venue" defaultValue={editingEvent?.venue || ""} placeholder="e.g. Main Auditorium" className="w-full px-4 py-3 bg-gray-900 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-gray-600" />
                </div>
              </div>

              <div className="pt-2 relative z-10">
                <button type="submit" disabled={loading} className="w-full sm:w-auto bg-blue-600 text-white font-bold px-8 py-3.5 rounded-xl hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] transition-all disabled:opacity-50 flex items-center justify-center gap-2">
                  {editingEvent ? "Update Event Details" : "Create New Event"}
                </button>
              </div>
            </form>
          )}

          {showEventList && (
            <div className="overflow-x-auto rounded-xl border border-gray-800">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-xs font-semibold border-b border-gray-800">
                  <tr>
                    <th className="p-4">Event Name</th>
                    <th className="p-4">Start Time</th>
                    <th className="p-4">End Time</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {events.map((e, index) => (
                    <tr key={e.id} className={index % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"}>
                      <td className="p-4 font-medium text-white">{e.name}</td>
                      <td className="p-4 text-gray-400">{new Date(e.start_time).toLocaleString()}</td>
                      <td className="p-4 text-gray-400">{new Date(e.end_time).toLocaleString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => startEdit(e)} disabled={loading} className="text-blue-400 hover:text-blue-300 font-medium px-3 py-1 bg-blue-400/10 hover:bg-blue-400/20 rounded transition-colors mr-2">
                            Edit
                        </button>
                        <button onClick={() => handleDeleteEvent(e.id)} disabled={loading} className="text-red-400 hover:text-red-300 font-medium px-3 py-1 bg-red-400/10 hover:bg-red-400/20 rounded transition-colors">
                            Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  {events.length === 0 && (
                    <tr><td colSpan="4" className="p-8 text-center text-gray-500">No events found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
}
