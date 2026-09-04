"use client";

import { useState } from "react";
import { submitContention } from "./actions";

export default function ContentionForm({ scoreId }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const formData = new FormData();
    formData.append("score_id", scoreId);
    formData.append("reason", reason);

    const result = await submitContention(formData);
    
    if (result.error) {
      setMessage(result.error);
      setLoading(false);
    } else {
      setIsOpen(false);
      window.location.reload();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 text-sm font-semibold py-3 px-4 border border-red-500/20 text-red-400 bg-red-500/10 hover:bg-red-500 hover:text-white hover:shadow-[0_0_15px_rgba(239,68,68,0.3)] rounded-xl transition-all"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
        Raise Contention
      </button>
    );
  }

  return (
    <div className="mt-4 p-4 bg-gray-950 rounded-xl border border-gray-800">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reason for Discrepancy</label>
        <textarea 
          placeholder="Please explain the issue..."
          value={reason}
          onChange={e => setReason(e.target.value)}
          required
          rows={3}
          className="text-sm p-3 bg-gray-900 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors placeholder-gray-600 custom-scrollbar"
        />
        {message && <p className="text-xs font-medium text-red-400">{message}</p>}
        <div className="flex gap-3 pt-2">
          <button 
            type="submit" 
            disabled={loading}
            className="flex-1 bg-red-600 text-white font-medium text-sm py-2 rounded-lg hover:bg-red-500 shadow-lg shadow-red-900/20 transition-all disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button 
            type="button" 
            onClick={() => setIsOpen(false)}
            className="flex-1 bg-gray-800 text-gray-300 font-medium text-sm py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
