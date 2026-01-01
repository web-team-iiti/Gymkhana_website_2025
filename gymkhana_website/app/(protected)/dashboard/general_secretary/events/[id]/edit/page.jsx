"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import { FaCalendarAlt, FaArrowLeft, FaSave, FaSpinner } from "react-icons/fa";

export default function EditEventPage() {
    const router = useRouter();
    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [formData, setFormData] = useState({
        title: "",
        subtitle: "",
        date: "",
        description: "",
    });

    // 1. Fetch Existing Data
    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`/api/events/${id}`); // We need a simple GET API for this
                if (!res.ok) throw new Error("Failed");
                const data = await res.json();

                // Format date for HTML input (YYYY-MM-DD)
                const dateObj = new Date(data.event_date);
                const dateStr = dateObj.toISOString().split('T')[0];

                setFormData({
                    title: data.title,
                    subtitle: data.subtitle,
                    date: dateStr,
                    description: data.description
                });
            } catch (err) {
                alert("Error loading event");
                router.push("/dashboard/general_secretary/events");
            } finally {
                setLoading(false);
            }
        };
        fetchEvent();
    }, [id, router]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch("/api/events/update", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, ...formData }),
            });

            if (res.ok) {
                router.push(`/dashboard/general_secretary/events/${id}`);
                router.refresh();
            } else {
                alert("Failed to update");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    };
    if (loading) return <div className="p-8 text-white">Loading event data...</div>;
    return (
        <div className="max-w-3xl mx-auto p-4 md:p-8 pb-20">
            <div className="mb-6">
                <Link href={`/dashboard/general_secretary/events/${id}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
                    <FaArrowLeft /> Cancel Editing
                </Link>
                <h1 className="text-2xl md:text-3xl font-bold text-white">Edit Event</h1>
            </div> 
            <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-8 shadow-xl space-y-6">
                {/* Title & Subtitle */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Event Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            required
                            className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Subtitle</label>
                        <input
                            type="text"
                            name="subtitle"
                            value={formData.subtitle}
                            className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Date */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Event Date</label>
                    <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-500" />
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            required
                            className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                            onChange={handleChange}
                        />
                    </div>
                </div>

                {/* Description */}
                <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</label>
                    <textarea
                        name="description"
                        rows="6"
                        value={formData.description}
                        required
                        className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        onChange={handleChange}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    disabled={saving}
                    className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-500/20 active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {saving ? <FaSpinner className="animate-spin" /> : <FaSave />} Save Changes
                </button>

            </form>
        </div>
    );
}