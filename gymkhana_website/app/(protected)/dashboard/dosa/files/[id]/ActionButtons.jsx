"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaFileSignature, FaUndo, FaTimesCircle } from "react-icons/fa";

export default function DosaActionButtons({ proposalId }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [remark, setRemark] = useState("");

  const handleAction = async (action) => {
    // Validation: Remark is mandatory for Rejection/Revert
    if ((action === 'REJECT' || action === 'REVERT') && !remark.trim()) {
        alert("Please provide a remark for this decision.");
        return;
    }

    if (!confirm("Are you sure you want to finalize this decision?")) return;
    setLoading(true);

    try {
      const res = await fetch("/api/proposals/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId,
          action, // 'APPROVE', 'REVERT', 'REJECT'
          remark
        }),
      });

      if (res.ok) {
        router.push("/dashboard/dosa"); // Go back to dashboard
        router.refresh();
      } else {
        alert("Action failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
      <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
        <FaFileSignature className="text-yellow-500" /> Dean's Authority
      </h3>
      
      <textarea
        className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-green-500 outline-none mb-4"
        rows="3"
        placeholder="Enter your final remarks or approval note..."
        value={remark}
        onChange={(e) => setRemark(e.target.value)}
      ></textarea>

      <div className="grid grid-cols-1 gap-3">
        {/* 1. FINAL APPROVAL */}
        <button
          onClick={() => handleAction("APPROVE")}
          disabled={loading}
          className="w-full py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50 shadow-lg shadow-green-900/20"
        >
          {loading ? "Signing..." : (
             <><span>Approve & Sign</span> <FaFileSignature /></>
          )}
        </button>

        <div className="grid grid-cols-2 gap-3 mt-2">
            {/* 2. REVERT TO GS */}
            <button
            onClick={() => handleAction("REVERT")}
            disabled={loading}
            className="w-full py-3 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/50 text-yellow-500 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
            <FaUndo /> Needs Fix
            </button>

            {/* 3. REJECT PERMANENTLY */}
            <button
            onClick={() => handleAction("REJECT")}
            disabled={loading}
            className="w-full py-3 bg-red-600/20 hover:bg-red-600/30 border border-red-600/50 text-red-500 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
            >
            <FaTimesCircle /> Reject
            </button>
        </div>
      </div>
    </div>
  );
}