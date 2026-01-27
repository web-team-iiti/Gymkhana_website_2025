"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { FaCloudUploadAlt, FaSave, FaArrowLeft, FaFilePdf, FaLayerGroup } from "react-icons/fa";

export default function EditProposalForm({ proposal }) {
    const router = useRouter();
    const [submitting, setSubmitting] = useState(false);
    const [file, setFile] = useState(null); 

    const [formData, setFormData] = useState({
        title: proposal.title || "",
        description: proposal.description || "",
        priority: proposal.priority || "NORMAL", 
        pdfUrl: proposal.pdf_url || "",
    });

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) setFile(selectedFile);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const data = new FormData();
            data.append("id", proposal.id);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("priority", formData.priority); 
            
            if (file) data.append("file", file);

            const res = await fetch("/api/proposals/edit", {
                method: "PUT",
                body: data, 
            });

            if (res.ok) {
                router.push("/dashboard/general_secretary/my-proposals");
                router.refresh();
            } else {
                alert("Failed to update proposal.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto p-4 md:p-6 pb-24"> 
            
            <div className="flex items-center mb-4 md:mb-6">
                 <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 hover:text-white py-2 active:scale-95 transition-transform">
                    <FaArrowLeft size={14} /> <span className="text-sm font-medium">Cancel</span>
                </button>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl">
                <div className="p-5 md:p-8 border-b border-gray-800 bg-gray-900/50">
                    <h1 className="text-xl md:text-2xl font-bold text-white leading-tight">Correct & Resubmit</h1>
                    <p className="text-xs md:text-sm text-gray-400 mt-1">Update details based on feedback.</p>
                </div>

                <div className="p-5 md:p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Title */}
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Proposal Title</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="w-full bg-gray-950 border border-gray-800 text-white text-sm md:text-base rounded-xl px-4 py-3.5 focus:border-yellow-500 outline-none transition-colors"
                                required
                            />
                        </div>

                        {/* Urgency Level Selector */}
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                                Urgency Level
                            </label>
                            <div className="relative">
                                <select
                                    value={formData.priority}
                                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                                    className="w-full appearance-none bg-gray-950 border border-gray-800 text-white text-sm md:text-base rounded-xl px-4 py-3.5 focus:border-yellow-500 outline-none cursor-pointer transition-colors"
                                >
                                    <option value="NORMAL">Normal</option>
                                    <option value="HIGH">High</option>
                                    <option value="URGENT">Urgent</option>
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                                    <FaLayerGroup />
                                </div>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Description</label>
                            <textarea
                                rows="6"
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                className="w-full bg-gray-950 border border-gray-800 text-white text-sm md:text-base rounded-xl px-4 py-3.5 focus:border-yellow-500 outline-none resize-none transition-colors"
                                required
                            ></textarea>
                        </div>

                        {/* File Upload */}
                        <div className="space-y-2">
                            <label className="text-xs md:text-sm font-bold text-gray-400 uppercase tracking-wider">Document (PDF)</label>
                            <div className="border-2 border-dashed border-gray-800 rounded-xl bg-gray-950/30 p-4 hover:border-gray-700 hover:bg-gray-900/50 group transition-all">
                                <div className="flex items-center gap-3 mb-4 p-3 bg-gray-900 rounded-lg border border-gray-800">
                                    <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center shrink-0">
                                        <FaFilePdf className="text-red-500 text-xl" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <p className="text-[10px] uppercase font-bold text-gray-500 mb-0.5">Current Attachment</p>
                                        <a href={formData.pdfUrl} target="_blank" className="text-white text-sm font-medium hover:text-yellow-500 truncate block transition-colors">
                                            {formData.pdfUrl ? "View Existing PDF" : "No file attached"}
                                        </a>
                                    </div>
                                </div>
                                <label className="cursor-pointer flex flex-col items-center justify-center gap-3 py-4">
                                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-colors shadow-lg">
                                        <FaCloudUploadAlt size={20} className="text-blue-400" />
                                    </div>
                                    <div className="text-center">
                                        <span className="text-sm font-bold text-gray-300 group-hover:text-white block transition-colors">
                                            {file ? "Change Selected File" : "Upload New Version"}
                                        </span>
                                        <span className="text-xs text-gray-500 mt-1 block max-w-[200px] mx-auto truncate">
                                            {file ? file.name : "(Optional)"}
                                        </span>
                                    </div>
                                    <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
                                </label>
                            </div>
                        </div>

                        {/* Submit */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={submitting}
                                className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl flex items-center justify-center gap-2.5 shadow-xl shadow-yellow-500/10 active:scale-[0.98] transition-all"
                            >
                                {submitting ? "Updating..." : <><FaSave size={18} /> Save & Resubmit</>}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    );
}