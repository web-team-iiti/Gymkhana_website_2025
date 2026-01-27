"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FaBoxOpen, FaTrash, FaEdit, FaSpinner, FaCheckCircle } from "react-icons/fa";

const councilLabels = {
    SCITECH: "Science and Technology Council",
    ACADEMIC: "Academic Council",
    SPORTS: "Sports Council",
    CULTURAL: "Cultural Council",
    OUTREACH: "Outreach and Alumni Council"
};

export default function InventoryList({ items, userRole }) {
    const router = useRouter();
    const [loadingId, setLoadingId] = useState(null); // Track which item is processing

    // --- CONSUME LOGIC ---
    const handleConsume = async (id) => {
        if (!confirm("Mark this item as CONSUMED? This cannot be undone.")) return;
        setLoadingId(id);
        try {
            const res = await fetch("/api/inventory/consume", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) router.refresh();
            else alert("Update failed");
        } catch (err) { console.error(err); }
        finally { setLoadingId(null); }
    };

    // --- DELETE LOGIC ---
    const handleDelete = async (id) => {
        if (!confirm("Are you sure you want to DELETE this item?")) return;
        setLoadingId(id);
        try {
            const res = await fetch("/api/inventory/delete", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            });
            if (res.ok) router.refresh();
            else alert("Delete failed");
        } catch (err) { console.error(err); }
        finally { setLoadingId(null); }
    };

    if (items.length === 0) {
        return (
            <div className="bg-gray-900/50 border border-dashed border-gray-800 rounded-2xl p-10 text-center flex flex-col items-center justify-center min-h-[200px]">
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                    <FaBoxOpen className="text-gray-600 text-2xl" />
                </div>
                <p className="text-gray-400 font-medium">No inventory items found.</p>
                <p className="text-gray-600 text-sm mt-1">Try changing filters or add a new item.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {items.map((item) => (
                <div key={item.id} className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-lg hover:border-gray-700 transition-all flex flex-col md:flex-row gap-5 relative overflow-hidden group">

                    {/* Status Stripe */}
                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${item.status === 'AVAILABLE' ? 'bg-green-500' :
                            item.status === 'CONSUMED' ? 'bg-gray-600' : 'bg-red-500'
                        }`}></div>

                    <div className="flex-1 pl-2">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-3">
                            <h3 className="text-white font-bold text-lg leading-tight">{item.name}</h3>
                            <div className="flex flex-wrap gap-2">
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${item.status === 'AVAILABLE' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-gray-700 text-gray-400 border border-gray-600'
                                    }`}>
                                    {item.status}
                                </span>
                                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider ${item.type === 'CONSUMABLE' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                    }`}>
                                    {item.type === 'CONSUMABLE' ? 'Consumable' : 'Asset'}
                                </span>
                            </div>
                        </div>

                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">{item.description}</p>

                        {/* Metadata */}
                        <div className="flex flex-wrap gap-2">
                            <div className="bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono">
                                🏢 {councilLabels[item.council]?.replace(' Council', '') || item.council}
                            </div>
                            {item.club_name && (
                                <div className="bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono">
                                    📍 {item.club_name}
                                </div>
                            )}
                            <div className="bg-gray-950 border border-gray-800 rounded-lg px-3 py-1.5 text-xs text-gray-400 font-mono">
                                📅 {item.tenure}
                            </div>
                        </div>
                    </div>

                    {/* Actions Column */}
                    {userRole === 'general_secretary' && (
                        <div className="flex flex-col gap-2 justify-center shrink-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-800 md:border-l md:pl-5 w-full md:w-auto min-w-[140px]">

                            {/* Row 1: Edit & Delete */}
                            <div className="flex gap-2">
                                <Link
                                    href={`/dashboard/general_secretary/inventory/edit/${item.id}`}
                                    className="flex-1 bg-gray-800 hover:bg-white hover:text-black text-gray-300 px-3 py-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-2 border border-gray-700"
                                >
                                    <FaEdit /> Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(item.id)}
                                    disabled={loadingId === item.id}
                                    className="px-3 py-2 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg border border-red-500/20 transition-all flex items-center justify-center disabled:opacity-50"
                                >
                                    {loadingId === item.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                </button>
                            </div>

                            {/* Row 2: Consume (Only for Consumables) */}
                            {item.type === 'CONSUMABLE' && item.status === 'AVAILABLE' && (
                                <button
                                    onClick={() => handleConsume(item.id)}
                                    disabled={loadingId === item.id}
                                    className="w-full bg-purple-500/10 text-purple-400 border border-purple-500/30 px-3 py-2 rounded-lg text-xs font-bold hover:bg-purple-500 hover:text-white transition-all flex items-center justify-center gap-2 active:scale-95 disabled:opacity-50"
                                >
                                    {loadingId === item.id ? <FaSpinner className="animate-spin" /> : <FaCheckCircle />} Consume
                                </button>
                            )}
                        </div>
                    )}

                </div>
            ))}
        </div>
    );
}