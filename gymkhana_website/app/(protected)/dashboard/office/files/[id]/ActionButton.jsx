"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPaperPlane, FaUndo, FaTimes, FaPen } from "react-icons/fa";

export default function ActionButtons({ proposalId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState("");

  const handleAction = async (action) => {
    const confirmMessage = action === 'REJECT' 
      ? "⚠️ Are you sure you want to REJECT this proposal? This cannot be undone."
      : `Confirm action: ${action.toLowerCase()}?`;

    if (!confirm(confirmMessage)) return;

    if ((action === 'REJECT' || action === 'REVERT') && !remark.trim()) {
      alert("Please add a remark explaining why you are rejecting or reverting.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/proposals/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ proposalId, action, remark }),
      });

      if (res.ok) {
        alert("Action successful!");
        router.push("/dashboard/office/files");
        router.refresh();
      } else {
        const err = await res.json();
        alert("Error: " + err.message);
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900/50 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl shadow-xl">
      <div className="flex items-center gap-2 mb-4 text-white">
        <FaPen className="text-yellow-500" />
        <h3 className="font-bold text-lg">Official Action</h3>
      </div>
      
      <div className="relative mb-6">
        <textarea
          className="w-full bg-gray-950 border border-gray-800 rounded-xl p-4 text-gray-200 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500/50 outline-none transition-all resize-none text-sm leading-relaxed"
          rows="4"
          placeholder="Enter your official remarks or feedback here..."
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
        />
        <span className="absolute bottom-3 right-3 text-xs text-gray-600">
            {remark.length > 0 ? "Ready to submit" : "Optional for approvals"}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {/* FORWARD */}
        <button
          onClick={() => handleAction("FORWARD")}
          disabled={loading}
          className="group flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-gradient-to-br from-green-600/20 to-green-600/10 border border-green-600/30 hover:border-green-500 hover:from-green-600/30 hover:to-green-600/20 transition-all text-green-400 hover:text-green-300 active:scale-95"
        >
          <FaPaperPlane className="text-xl mb-1 group-hover:-translate-y-1 transition-transform" />
          <span className="font-bold text-sm">Approve</span>
        </button>

        {/* REVERT */}
        <button
          onClick={() => handleAction("REVERT")}
          disabled={loading}
          className="group flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-gradient-to-br from-yellow-600/20 to-yellow-600/10 border border-yellow-600/30 hover:border-yellow-500 hover:from-yellow-600/30 hover:to-yellow-600/20 transition-all text-yellow-400 hover:text-yellow-300 active:scale-95"
        >
          <FaUndo className="text-xl mb-1 group-hover:-rotate-45 transition-transform" />
          <span className="font-bold text-sm">Revert</span>
        </button>

        {/* REJECT */}
        <button
          onClick={() => handleAction("REJECT")}
          disabled={loading}
          className="group flex flex-col items-center justify-center gap-1 p-4 rounded-xl bg-gradient-to-br from-red-600/20 to-red-600/10 border border-red-600/30 hover:border-red-500 hover:from-red-600/30 hover:to-red-600/20 transition-all text-red-400 hover:text-red-300 active:scale-95"
        >
          <FaTimes className="text-xl mb-1 group-hover:scale-110 transition-transform" />
          <span className="font-bold text-sm">Reject</span>
        </button>
      </div>
      
      {loading && (
        <div className="mt-4 text-center text-xs text-gray-500 animate-pulse">
            Processing request...
        </div>
      )}
    </div>
  );
}