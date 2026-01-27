"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
    FaSave, FaSpinner, FaLayerGroup, FaCube, 
    FaTag, FaInfoCircle, FaCalendarAlt, FaChevronDown
} from "react-icons/fa";

const councilOptions = [
    { value: "SCITECH", label: "Science and Technology" },
    { value: "ACADEMIC", label: "Academic Council" },
    { value: "SPORTS", label: "Sports Council" },
    { value: "CULTURAL", label: "Cultural Council" },
    { value: "OUTREACH", label: "Outreach & Alumni" },
];

export default function AddInventoryForm() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState("NON_CONSUMABLE");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);
        formData.set("type", type); 
        // ⚡ REMOVED: File appending logic. We just send text data now.

        try {
            const res = await fetch("/api/inventory/add", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || "API Failed");
            }

            router.push("/dashboard/general_secretary/inventory");
            router.refresh();

        } catch (error) {
            console.error(error);
            alert(`Failed: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            
            <div className="space-y-5">
                {/* Item Name */}
                <div className="relative">
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Item Name</label>
                    <div className="relative group">
                        <FaCube className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <input name="name" required placeholder="e.g. PA System, Podium" className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-4 py-4 text-white text-sm focus:border-yellow-500 outline-none transition-all" />
                    </div>
                </div>

                {/* Council & Tenure */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Council</label>
                        <div className="relative group">
                            <FaLayerGroup className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none z-10" />
                            <select name="council" required className="w-full appearance-none bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-10 py-4 text-white text-sm focus:border-yellow-500 outline-none cursor-pointer relative z-0">
                                <option value="" className="text-gray-500">Select Council...</option>
                                {councilOptions.map((c) => (
                                    <option key={c.value} value={c.value}>{c.label}</option>
                                ))}
                            </select>
                            <FaChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none text-xs" />
                        </div>
                    </div>
                    <div>
                        <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Tenure</label>
                        <div className="relative group">
                            <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                            <input name="tenure" placeholder="e.g. 2024-25" required className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-4 py-4 text-white text-sm focus:border-yellow-500 outline-none transition-all" />
                        </div>
                    </div>
                </div>

                 {/* Club Name (Optional) */}
                 <div>
                    <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">
                        Club Name <span className="text-gray-600 normal-case">(Optional)</span>
                    </label>
                    <div className="relative group">
                        <FaTag className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
                        <input name="club_name" placeholder="Leave blank if Council Asset" className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-4 py-4 text-white text-sm focus:border-yellow-500 outline-none transition-all placeholder:text-gray-600" />
                    </div>
                </div>
            </div>

            {/* Visual Type Selector */}
            <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3 block ml-1">Inventory Type</label>
                <div className="grid grid-cols-2 gap-3">
                    <label className="cursor-pointer">
                        <input type="radio" name="type" value="NON_CONSUMABLE" className="peer sr-only" checked={type === "NON_CONSUMABLE"} onChange={() => setType("NON_CONSUMABLE")} />
                        <div className="h-16 flex flex-col items-center justify-center rounded-xl border-2 border-gray-800 bg-gray-950 transition-all peer-checked:border-blue-500 peer-checked:bg-blue-500/10 peer-checked:text-blue-400 hover:bg-gray-900 group shadow-sm">
                            <span className="text-sm font-bold">Asset</span>
                            <span className="text-[10px] text-gray-500">Non-Consumable</span>
                        </div>
                    </label>
                    <label className="cursor-pointer">
                        <input type="radio" name="type" value="CONSUMABLE" className="peer sr-only" checked={type === "CONSUMABLE"} onChange={() => setType("CONSUMABLE")} />
                        <div className="h-16 flex flex-col items-center justify-center rounded-xl border-2 border-gray-800 bg-gray-950 transition-all peer-checked:border-purple-500 peer-checked:bg-purple-500/10 peer-checked:text-purple-400 hover:bg-gray-900 group shadow-sm">
                            <span className="text-sm font-bold">Consumable</span>
                            <span className="text-[10px] text-gray-500">Use & Throw</span>
                        </div>
                    </label>
                </div>
            </div>

            {/* Description */}
            <div>
                <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 block ml-1">Description</label>
                <div className="relative">
                    <FaInfoCircle className="absolute left-4 top-4 text-gray-500 pointer-events-none" />
                    <textarea name="description" placeholder="Short details..." className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-11 pr-4 py-3.5 text-white text-sm h-28 focus:border-yellow-500 outline-none resize-none" />
                </div>
            </div>

            {/* ❌ REMOVED BILL UPLOAD SECTION */}

            {/* Actions */}
            <div className="flex gap-3 pt-4">
                 <button type="button" onClick={() => router.back()} className="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-300 font-bold py-4 rounded-xl transition-all border border-gray-800 active:scale-95">Cancel</button>
                <button type="submit" disabled={loading} className="flex-[2] bg-yellow-500 text-gray-900 font-bold py-4 rounded-xl hover:bg-yellow-400 flex items-center justify-center gap-2 shadow-xl shadow-yellow-500/10 active:scale-95 transition-all disabled:opacity-70">
                    {loading ? <FaSpinner className="animate-spin" /> : <FaSave />} 
                    <span>Save Item</span>
                </button>
            </div>
        </form>
    );
}