"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaPaperPlane, FaUndo, FaTimesCircle } from "react-icons/fa";

export default function ActionButtons({ proposalId }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [remark, setRemark] = useState("");

    const handleAction = async (action) => {
        if (!confirm("Are you sure you want to perform this action?")) return;
        setLoading(true);

        try {
            const res = await fetch("/api/proposals/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    proposalId,
                    action, // 'FORWARD', 'REVERT', 'REJECT'
                    remark
                }),
            });

            if (res.ok) {
                router.push("/dashboard/adosa/files"); // Go back to Inbox
                router.refresh();
            } else {
                alert("Action failed");
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
            <h3 className="text-white font-bold text-lg mb-4">Your Decision</h3>

            <textarea
                className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white text-sm focus:ring-2 focus:ring-purple-500 outline-none mb-4"
                rows="3"
                placeholder="Add a remark (Optional for approval, required for rejection)..."
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
            ></textarea>

            <div className="grid grid-cols-1 gap-3">
                {/* 1. FORWARD TO DEAN */}
                <button
                    onClick={() => handleAction("FORWARD")}
                    disabled={loading}
                    className="w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                >
                    {loading ? "Processing..." : (
                        <><span>Forward to Dean</span> <FaPaperPlane /></>
                    )}
                </button>

                <div className="grid grid-cols-2 gap-3">
                    {/* 2. REVERT TO OFFICE */}
                    <button
                        onClick={() => handleAction("REVERT")}
                        disabled={loading}
                        className="w-full py-3 bg-yellow-600/20 hover:bg-yellow-600/30 border border-yellow-600/50 text-yellow-500 font-bold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
                    >
                        <FaUndo /> Revert
                    </button>

                    {/* 3. REJECT */}
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