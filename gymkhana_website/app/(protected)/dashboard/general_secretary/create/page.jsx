"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FaPaperPlane, FaFileUpload, FaExclamationCircle, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";

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

        if (!file) {
            alert("Please upload a PDF file.");
            setLoading(false);
            return;
        }

        try {
            const data = new FormData();
            data.append("file", file);
            data.append("title", formData.title);
            data.append("description", formData.description);
            data.append("priority", formData.priority);

            const res = await fetch("/api/proposals/create", {
                method: "POST",
                body: data,
            });

            if (res.ok) {
                alert("Proposal Submitted Successfully!");
                router.push("/dashboard/general_secretary/my-proposals");
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
        // Restored max-w-4xl for Desktop width
        <div className="max-w-4xl mx-auto p-4 md:p-0 pb-20 md:pb-0">
            
            {/* Header */}
            <div className="mb-6 md:mb-8">
                {/* Back button only visible on mobile for better UX, or keep mostly hidden on desktop if preferred */}
                <Link href="/dashboard/general_secretary/my-proposals" className="md:hidden inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
                    <FaArrowLeft /> Back to List
                </Link>
                
                <h1 className="text-2xl md:text-3xl font-bold text-white">Create New Proposal</h1>
                <p className="text-sm md:text-base text-gray-400 mt-1 md:mt-2">
                    As General Secretary, proposals you create go directly to the <span className="text-yellow-500 font-bold">Office</span> for review.
                </p>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-8 shadow-xl">

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
                    <div className="grid grid-cols-3 gap-2 md:gap-4">
                        {["NORMAL", "HIGH", "URGENT"].map((level) => (
                            <button
                                key={level}
                                type="button"
                                onClick={() => setFormData({ ...formData, priority: level })}
                                className={`py-3 md:py-3 rounded-xl text-xs md:text-sm font-bold border transition-all flex flex-col md:flex-row items-center justify-center gap-1 ${formData.priority === level
                                    ? level === "URGENT"
                                        ? "bg-red-500/20 border-red-500 text-red-500"
                                        : level === "HIGH"
                                            ? "bg-orange-500/20 border-orange-500 text-orange-500"
                                            : "bg-blue-500/20 border-blue-500 text-blue-500"
                                    : "bg-gray-950 border-gray-800 text-gray-500 hover:border-gray-600"
                                    }`}
                            >
                                {level === "URGENT" && <FaExclamationCircle className="mb-1 md:mb-0 md:mr-2" />}
                                {level}
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
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                        placeholder="Describe the purpose and expected outcome..."
                        onChange={handleChange}
                    />
                </div>

                {/* File Upload */}
                <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Attach Official PDF</label>
                    <div className={`border-2 border-dashed rounded-xl p-6 md:p-8 text-center transition-all bg-gray-950/50 ${file ? 'border-green-500/50 bg-green-500/5' : 'border-gray-700 hover:border-yellow-500/50'}`}>
                        <input
                            type="file"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="hidden"
                            id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center justify-center w-full h-full">
                            {file ? (
                                <>
                                    <div className="bg-green-500/20 p-3 rounded-full text-green-500 mb-2">
                                        <FaFileUpload size={24} />
                                    </div>
                                    <span className="text-green-400 font-bold text-sm truncate max-w-[200px] md:max-w-full">{file.name}</span>
                                    <span className="text-gray-500 text-xs mt-1">Click to change</span>
                                </>
                            ) : (
                                <>
                                    <FaFileUpload className="text-3xl md:text-4xl text-gray-500 mb-3" />
                                    <span className="text-gray-300 font-medium text-sm">Click to upload PDF</span>
                                    <span className="text-gray-600 text-xs mt-1">Max size: 5MB</span>
                                </>
                            )}
                        </label>
                    </div>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3.5 md:py-4 rounded-xl transition-all transform active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-yellow-500/20"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <div className="w-4 h-4 border-2 border-gray-900 border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing...</span>
                        </div>
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