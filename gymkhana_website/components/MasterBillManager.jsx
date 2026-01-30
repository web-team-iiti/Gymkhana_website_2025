"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaEye, FaCloudUploadAlt, FaFilePdf, FaSpinner, FaCalendarAlt, FaBoxOpen, FaFilter, FaExclamationTriangle } from "react-icons/fa";
import SearchInput from "@/components/SearchInput";
import BillsFilter from "@/components/BillsFilter";

// 👇 Added 'readOnly' prop (default is false)
export default function MasterBillManager({ uploadedBills, missingItems, readOnly = false }) {
    const [activeTab, setActiveTab] = useState("missing");
    const [uploadingId, setUploadingId] = useState(null);
    const [deletingId, setDeletingId] = useState(null);
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterRef = useRef(null);
    const router = useRouter();

    // Close filter dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(event) {
            if (filterRef.current && !filterRef.current.contains(event.target)) {
                setIsFilterOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // --- UPLOAD LOGIC ---
    const handleFileUpload = async (e, item) => {
        if (readOnly) return; // Guard clause
        const file = e.target.files[0];
        if (!file) return;

        setUploadingId(item.id);
        const formData = new FormData();
        formData.append("file", file);
        formData.append("entity_id", item.id);
        formData.append("entity_name", item.name);
        formData.append("category", item.category);

        try {
            const res = await fetch("/api/bills/upload", { method: "POST", body: formData });
            if (!res.ok) throw new Error("Upload failed");
            router.refresh();
        } catch (error) { alert(error.message); } finally { setUploadingId(null); }
    };

    // --- DELETE LOGIC ---
    const handleDelete = async (id) => {
        if (readOnly) return; // Guard clause
        if (!confirm("Permanently delete this bill and its file?")) return;
        setDeletingId(id);
        try {
            const res = await fetch("/api/bills/delete", { method: "DELETE", body: JSON.stringify({ id }) });
            if (!res.ok) throw new Error("Delete failed");
            router.refresh();
        } catch (e) { alert(e.message); } finally { setDeletingId(null); }
    };

    return (
        <div className="space-y-6">

            {/* Controls */}
            <div className="flex flex-wrap md:flex-nowrap gap-3">
                <div className="flex-1 min-w-[200px]">
                    <SearchInput placeholder="Search items, events, or bills..." />
                </div>
                <div className="relative z-20 shrink-0" ref={filterRef}>
                    <button
                        onClick={() => setIsFilterOpen(!isFilterOpen)}
                        className={`h-[48px] px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 border transition-all ${isFilterOpen ? "bg-yellow-500 text-black border-yellow-500" : "bg-gray-900 text-gray-300 border-gray-800 hover:border-gray-600 hover:text-white"
                            }`}
                    >
                        <FaFilter /> <span className="hidden xs:inline">Filter</span>
                    </button>
                    <BillsFilter isOpen={isFilterOpen} onClose={() => setIsFilterOpen(false)} />
                </div>
                <div className="w-full md:w-auto bg-gray-900 p-1 rounded-xl border border-gray-800 h-[48px] overflow-x-auto no-scrollbar order-last md:order-none">
                    <div className="flex h-full">
                        <button onClick={() => setActiveTab("missing")} className={`flex-1 md:flex-none px-4 md:px-5 h-full rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'missing' ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-gray-400 hover:text-white'}`}>
                            Missing <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-md">{missingItems.length}</span>
                        </button>
                        <button onClick={() => setActiveTab("uploaded")} className={`flex-1 md:flex-none px-4 md:px-5 h-full rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 whitespace-nowrap ${activeTab === 'uploaded' ? 'bg-green-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}>
                            Uploaded <span className="text-[10px] bg-black/20 px-1.5 py-0.5 rounded-md">{uploadedBills.length}</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- MISSING ITEMS --- */}
            {activeTab === "missing" && (
                <div className="space-y-3">
                    {missingItems.map((item) => (
                        <div key={item.id} className="bg-gray-900 border border-gray-800 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-3 md:gap-4">
                                <div className={`w-10 h-10 md:w-12 md:h-12 shrink-0 rounded-full flex items-center justify-center font-bold border ${item.category === 'EVENT' ? 'bg-purple-500/10 text-purple-500 border-purple-500/20' : 'bg-blue-500/10 text-blue-500 border-blue-500/20'}`}>
                                    {item.category === 'EVENT' ? <FaCalendarAlt size={14} /> : <FaBoxOpen size={14} />}
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-white text-sm truncate pr-2">{item.name}</h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        <span className="text-[10px] text-gray-500 flex items-center gap-1.5 bg-gray-800 px-2 py-0.5 rounded-md">{item.council}</span>
                                        <span className={`text-[10px] px-2 py-0.5 rounded-md border ${item.category === 'EVENT' ? 'text-purple-400 border-purple-500/20 bg-purple-500/5' : 'text-blue-400 border-blue-500/20 bg-blue-500/5'}`}>{item.category === 'EVENT' ? 'Event' : 'Asset'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* 👇 Condition: Only show Upload Button if NOT Read Only */}
                            {!readOnly ? (
                                <label className={`w-full sm:w-auto cursor-pointer bg-yellow-500 hover:bg-yellow-400 text-black text-xs font-bold px-4 py-3 sm:py-2 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/10 transition-all ${uploadingId === item.id ? 'opacity-70 pointer-events-none' : ''}`}>
                                    {uploadingId === item.id ? <FaSpinner className="animate-spin" /> : <FaCloudUploadAlt />}
                                    <span>{uploadingId === item.id ? "Uploading..." : "Upload Bill"}</span>
                                    <input type="file" accept="image/*,.pdf" className="hidden" disabled={uploadingId === item.id} onChange={(e) => handleFileUpload(e, item)} />
                                </label>
                            ) : (
                                <span className="text-xs text-red-500 font-bold border border-red-500/30 bg-red-500/10 px-3 py-2 rounded-lg flex items-center gap-2">
                                    <FaExclamationTriangle /> Pending Upload
                                </span>
                            )}
                        </div>
                    ))}
                    {missingItems.length === 0 && <div className="text-center text-gray-500 py-10">No missing bills.</div>}
                </div>
            )}

            {/* --- UPLOADED BILLS --- */}
            {activeTab === "uploaded" && (
                <div className="space-y-3">
                    {uploadedBills.map((bill) => (
                        <div key={bill.id} className="bg-gray-900 border border-gray-800 rounded-xl p-3 md:p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-gray-800/50 transition-colors">
                            <div className="flex items-center gap-4">
                                <a href={bill.pdf_url} target="_blank" className="w-12 h-12 md:w-14 md:h-14 shrink-0 bg-black rounded-lg overflow-hidden border border-gray-800 flex items-center justify-center hover:scale-105 transition-transform">
                                    {bill.pdf_url.includes(".pdf") ? <FaFilePdf className="text-red-500 text-xl" /> : <img src={bill.pdf_url} alt="Bill" className="w-full h-full object-cover" />}
                                </a>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-white text-sm truncate pr-2">{bill.entity_name}</h3>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        <span className={`text-[10px] px-2 py-0.5 rounded-md border ${bill.category === 'EVENT' ? 'text-purple-400 bg-purple-500/10 border-purple-500/20' : 'text-blue-400 bg-blue-500/10 border-blue-500/20'}`}>{bill.category}</span>
                                        <span className="text-[10px] text-gray-500 py-0.5">{new Date(bill.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <a href={bill.pdf_url} target="_blank" className="flex-1 sm:flex-none bg-gray-800 hover:bg-white hover:text-black text-gray-300 text-xs font-bold px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-colors border border-gray-700">
                                    <FaEye /> View
                                </a>

                                {/* 👇 Condition: Hide Delete Button if Read Only */}
                                {!readOnly && (
                                    <button
                                        onClick={() => handleDelete(bill.id)}
                                        disabled={deletingId === bill.id}
                                        className="px-4 bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 rounded-lg flex items-center justify-center border border-red-500/20 transition-colors disabled:opacity-50"
                                    >
                                        {deletingId === bill.id ? <FaSpinner className="animate-spin" /> : <FaTrash />}
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                    {uploadedBills.length === 0 && <div className="text-center text-gray-500 py-10">No matching bills found.</div>}
                </div>
            )}
        </div>
    );
}