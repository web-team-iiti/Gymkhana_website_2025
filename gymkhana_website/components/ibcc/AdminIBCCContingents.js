"use client";

import { useState } from "react";
import { addContingent, deleteContingent, updateContingent } from "./actions";

export default function AdminIBCCContingents({ contingents, users }) {
  const [loading, setLoading] = useState(false);
  const [editingContingent, setEditingContingent] = useState(null);

  const handleAddOrUpdateContingent = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    
    let res;
    if (editingContingent) {
      formData.append("id", editingContingent.id);
      res = await updateContingent(formData);
    } else {
      res = await addContingent(formData);
    }

    if (res.error) {
      alert(res.error);
      setLoading(false);
    } else {
      window.location.reload();
    }
  };

  const startEdit = (c) => {
    setEditingContingent(c);
  };

  const cancelEdit = () => {
    setEditingContingent(null);
  };

  const handleDeleteContingent = async (id) => {
    if (!confirm("Are you sure you want to delete this contingent? This will also delete related scores and contentions!")) return;
    setLoading(true);
    const res = await deleteContingent(id);
    if (res.error) alert(res.error);
    else window.location.reload();
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      {/* Add Contingent Leader Section */}
      <section className="bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-4">Add Contingent Leader</h2>
        <p className="text-gray-400 mb-6 text-xs sm:text-sm">Add a new leader by their name and email. Once added, they will appear in the assignment list below.</p>
        
        <form action={async (formData) => {
          setLoading(true);
          const email = formData.get("email");
          const name = formData.get("name");
          const { promoteToContingentLeader } = await import('./actions');
          const res = await promoteToContingentLeader(email, name);
          if (res.error) alert(res.error);
          else {
            alert(`Success! ${name} is now a Contingent Leader.`);
            window.location.reload();
          }
          setLoading(false);
        }} className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          <input 
            type="text" 
            name="name" 
            placeholder="Leader Name" 
            required 
            className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-950 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all placeholder-gray-600" 
          />
          <input 
            type="email" 
            name="email" 
            placeholder="leader@iiti.ac.in" 
            required 
            className="flex-1 px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-950 border border-gray-700 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500/50 focus:border-yellow-500 transition-all placeholder-gray-600" 
          />
          <button type="submit" disabled={loading} className="font-bold px-6 py-3 sm:py-3 text-sm sm:text-base bg-yellow-600 text-white rounded-xl hover:bg-yellow-500 transition-all disabled:opacity-50 whitespace-nowrap shadow-[0_0_15px_rgba(202,138,4,0.3)] hover:shadow-[0_0_20px_rgba(234,179,8,0.5)] w-full sm:w-auto">
            Add Leader
          </button>
        </form>
      </section>

      {/* Create Contingent Section */}
      <section className="bg-gray-900 p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-800">
        <h2 className="text-xl font-bold text-white mb-6">Manage Contingents</h2>
        
        {/* key forces full re-render when switching between edit targets so checkboxes reset properly */}
        <form key={editingContingent?.id || "new"} onSubmit={handleAddOrUpdateContingent} className="bg-gray-950/50 p-4 sm:p-6 md:p-8 rounded-2xl border border-gray-800 mb-8 space-y-4 sm:space-y-6 relative overflow-hidden">
          {/* Subtle background glow */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${editingContingent ? 'bg-blue-500/10' : 'bg-green-500/5'}`}></div>

          <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <h3 className={`text-lg font-bold ${editingContingent ? 'text-blue-400' : 'text-green-400'}`}>
              {editingContingent ? "Edit Contingent" : "Add New Contingent"}
            </h3>
            {editingContingent && (
              <button type="button" onClick={cancelEdit} className="w-full sm:w-auto text-gray-400 hover:text-white text-sm bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 transition-colors text-center">
                Cancel Edit
              </button>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative z-10">
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-400">Contingent Name</label>
              <input type="text" name="name" defaultValue={editingContingent?.name || ""} placeholder="e.g. CSE + SSE" required className={`w-full px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 text-white text-sm sm:text-base rounded-xl focus:outline-none focus:ring-2 transition-all placeholder-gray-600 ${editingContingent ? 'focus:ring-blue-500/50 focus:border-blue-500' : 'focus:ring-green-500/50 focus:border-green-500'}`} />
            </div>
            
            <div className="space-y-1.5 sm:space-y-2">
              <label className="block text-xs sm:text-sm font-semibold text-gray-400">Assign Leaders (Optional)</label>
              <div className={`w-full max-h-48 overflow-y-auto px-3 py-2.5 sm:px-4 sm:py-3 bg-gray-900 border border-gray-700 rounded-xl space-y-2 ${editingContingent ? 'focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500' : 'focus-within:border-green-500 focus-within:ring-1 focus-within:ring-green-500'}`}>
                {users.map(user => {
                  const isChecked = editingContingent?.leader_ids?.includes(user.id) || false;
                  return (
                    <label key={user.id} className="flex items-center gap-3 cursor-pointer p-1 hover:bg-gray-800 rounded">
                      <input 
                        type="checkbox" 
                        name="leader_ids" 
                        value={user.id} 
                        defaultChecked={isChecked}
                        className="w-4 h-4 shrink-0 text-blue-500 bg-gray-800 border-gray-600 rounded focus:ring-blue-600 focus:ring-offset-gray-900"
                      />
                      <span className="text-white text-xs sm:text-sm">{user.name} <span className="text-gray-500 text-[10px] sm:text-xs">({user.email})</span></span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-2 relative z-10">
            <button type="submit" disabled={loading} className={`w-full sm:w-auto font-bold px-8 py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 ${editingContingent ? 'bg-blue-600 text-white hover:bg-blue-500 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)]' : 'bg-green-600 text-white hover:bg-green-500 shadow-[0_0_20px_rgba(22,163,74,0.3)] hover:shadow-[0_0_25px_rgba(34,197,94,0.5)]'}`}>
              {editingContingent ? "Update Contingent" : "Create Contingent"}
            </button>
          </div>
        </form>

        {/* Mobile View: Card Layout */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {contingents.map((c) => (
            <div key={c.id} className="bg-gray-950 p-4 rounded-xl border border-gray-800 flex flex-col gap-3 relative overflow-hidden">
              <div className="flex justify-between items-start gap-2 border-b border-gray-800/50 pb-2">
                <h3 className="font-bold text-white text-lg break-words">{c.name}</h3>
              </div>
              
              <div className="flex flex-col gap-1 text-sm text-gray-400">
                <span className="text-xs font-semibold text-gray-500 uppercase">Assigned Leaders</span>
                <span className="font-medium text-blue-400 leading-relaxed">
                  {c.leader_name || <span className="text-gray-600 italic">No leader assigned</span>}
                </span>
              </div>

              <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-800/50">
                <button onClick={() => startEdit(c)} disabled={loading} className="px-3 py-2 text-blue-400 hover:text-white bg-blue-500/10 rounded-lg transition-all border border-blue-500/20 text-xs font-bold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg> Edit
                </button>
                <button onClick={() => handleDeleteContingent(c.id)} disabled={loading} className="px-3 py-2 text-red-400 hover:text-white bg-red-500/10 rounded-lg transition-all border border-red-500/20 text-xs font-bold flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg> Delete
                </button>
              </div>
            </div>
          ))}
          {contingents.length === 0 && (
            <div className="p-8 text-center text-gray-500 bg-gray-950 rounded-xl border border-gray-800">No contingents found.</div>
          )}
        </div>

        {/* Desktop View: Table Layout */}
        <div className="hidden md:block overflow-x-auto rounded-xl border border-gray-800">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-950 text-gray-400 uppercase tracking-wider text-xs font-semibold border-b border-gray-800">
              <tr>
                <th className="p-4 w-1/3">Contingent Name</th>
                <th className="p-4 w-1/2">Assigned Leaders</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {contingents.map((c, index) => (
                <tr key={c.id} className={`${index % 2 === 0 ? "bg-gray-900" : "bg-gray-900/50"} hover:bg-gray-800/50 transition-colors`}>
                  <td className="p-4 font-bold text-white">{c.name}</td>
                  <td className="p-4 text-blue-400 font-medium">{c.leader_name || <span className="text-gray-600 italic font-normal">No leader assigned</span>}</td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button onClick={() => startEdit(c)} disabled={loading} title="Edit Contingent" className="p-2.5 text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 rounded-xl transition-all shadow-sm border border-blue-500/20 hover:border-blue-500 disabled:opacity-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                    </button>
                    <button onClick={() => handleDeleteContingent(c.id)} disabled={loading} title="Delete Contingent" className="p-2.5 text-red-400 hover:text-white bg-red-500/10 hover:bg-red-600 rounded-xl transition-all shadow-sm border border-red-500/20 hover:border-red-500 disabled:opacity-50">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                    </button>
                  </td>
                </tr>
              ))}
              {contingents.length === 0 && (
                <tr><td colSpan="3" className="p-8 text-center text-gray-500">No contingents found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
