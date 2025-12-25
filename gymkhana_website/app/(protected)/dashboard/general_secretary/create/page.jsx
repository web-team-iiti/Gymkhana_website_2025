"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaPaperPlane, FaFileUpload, FaExclamationCircle } from "react-icons/fa";

// ❌ REMOVED: No more Supabase Client here. 
// We upload via our own API now.

export default function CreateProposalPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priority: "NORMAL",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            // Security Check: Restrict file size to 5MB
            if (e.target.files[0].size > 5 * 1024 * 1024) {
                alert("File is too big! Max 5MB allowed.");
                return;
            }
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // 1. Validation
        if (!file) {
            alert("Please upload a PDF file.");
            setLoading(false);
            return;
        }

        try {
            // 2. Prepare FormData (File + Text)
            // We use FormData instead of JSON because we are sending a binary file
            const data = new FormData();
            data.append("file", file);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("priority", formData.priority);
            // We don't need to send user_id, the server gets it from the session securely

            // 3. Send to our Backend API
            const res = await fetch("/api/proposals/create", {
                method: "POST",
                body: data, // Browser automatically sets the correct Content-Type for FormData
            });

            if (res.ok) {
                alert("Proposal Submitted Successfully!");
                router.push("/dashboard/general_secretary");
                router.refresh();
            } else {
                const errorData = await res.json();
                alert("Error: " + errorData.message);
            }

        } catch (error) {
            console.error(error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-white">Create New Proposal</h1>
                <p className="text-gray-400 mt-2">
                    As General Secretary, proposals you create go directly to the <span className="text-yellow-500 font-bold">Office</span> for review.
                </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-xl">

                {/* Title Input */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Proposal Title</label>
                    <input
                        type="text"
                        name="title"
                        required
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                        placeholder="e.g. Budget for Tech Fest 2025"
                        onChange={handleChange}
                    />
                </div>

                {/* Priority Toggle */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Urgency Level</label>
                    <div className="grid grid-cols-3 gap-4">
                        {["NORMAL", "HIGH", "URGENT"].map((level) => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: level })}
                                className={`py-3 rounded-xl text-sm font-bold border transition-all ${formData.priority === level
                                    ? level === "URGENT"
                                        ? "bg-red-500/20 border-red-500 text-red-500"
                                        : level === "HIGH"
                                            ? "bg-orange-500/20 border-orange-500 text-orange-500"
                                            : "bg-blue-500/20 border-blue-500 text-blue-500"
                                    : "bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-600"
                                    }`}
                            >
                                {level}
                                {level === "URGENT" && <FaExclamationCircle className="inline ml-2" />}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Brief Summary</label>
                    <textarea
                        name="description"
                        rows="4"
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                        placeholder="Describe the purpose and expected outcome..."
                        onChange={handleChange}
                    />
                </div>

                {/* File Upload */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Attach Official PDF</label>
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-8 text-center hover:border-yellow-500/50 transition-colors bg-gray-950/50">
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                            <FaFileUpload className="text-4xl text-gray-500 mb-3" />
                            <span className="text-gray-300 font-medium">
                                {file ? file.name : "Click to upload PDF"}
                            </span>
                            <span className="text-gray-600 text-xs mt-1">Max size: 5MB</span>
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl transition-all transform active:scale-95 flex items-center justify-center gap-2"
                >
                    {loading ? (
                        <span>Processing...</span>
                    ) : (
                        <>
                            <FaPaperPlane />
                            <span>Submit Proposal</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}