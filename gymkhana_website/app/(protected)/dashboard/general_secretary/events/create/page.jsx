"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudUploadAlt, FaCalendarAlt, FaArrowLeft, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    date: "",
    description: "",
  });
  
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 3) {
        alert("You can only upload a maximum of 3 images.");
        return;
    }
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImages([...images, ...files]);
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (images.length === 0) {
        alert("Please upload at least one image.");
        setLoading(false);
        return;
    }

    try {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("subtitle", formData.subtitle);
        data.append("date", formData.date);
        data.append("description", formData.description);
        images.forEach((img) => data.append("images", img));

        const res = await fetch("/api/events/create", {
            method: "POST",
            body: data,
        });

        if (res.ok) {
            router.push("/dashboard/general_secretary/events");
            router.refresh();
        } else {
            alert("Failed to create event");
        }
    } catch (error) {
        console.error(error);
        alert("Error creating event");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 pb-20">
        
      {/* Header */}
      <div className="mb-6">
        <Link href="/dashboard/general_secretary/events" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
            <FaArrowLeft /> Back
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">New Public Event</h1>
        <p className="text-gray-400 text-sm mt-1">This will be visible on the main website.</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-8 shadow-xl space-y-6">
        
        {/* Title & Subtitle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Event Title</label>
                <input 
                    type="text" 
                    name="title" 
                    required 
                    placeholder="e.g. Gymkhana Sports"
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
                    onChange={handleChange}
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Subtitle / Tagline</label>
                <input 
                    type="text" 
                    name="subtitle" 
                    placeholder="e.g. Inter-Hostel Tournament"
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors"
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
                    required
                    className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors appearance-none"
                    onChange={handleChange}
                />
            </div>
        </div>

        {/* Description */}
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</label>
            <textarea 
                name="description" 
                rows="4" 
                required
                placeholder="Details about the event..."
                className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors resize-none"
                onChange={handleChange}
            />
        </div>

        {/* Image Upload (Max 3) */}
        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">
                Event Images <span className="text-gray-600 normal-case ml-1">(Max 3)</span>
            </label>
            
            <div className="grid grid-cols-3 gap-4">
                {previews.map((src, idx) => (
                    <div key={idx} className="relative aspect-video rounded-xl overflow-hidden border border-gray-700 group">
                        <img src={src} alt="preview" className="w-full h-full object-cover" />
                        <button 
                            type="button"
                            onClick={() => removeImage(idx)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110 transition-transform"
                        >
                            <FaTimes size={10} />
                        </button>
                    </div>
                ))}

                {images.length < 3 && (
                    <label className="aspect-video border-2 border-dashed border-gray-700 bg-gray-950/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 hover:text-yellow-500 text-gray-500 transition-all">
                        <FaCloudUploadAlt size={24} className="mb-1" />
                        <span className="text-xs font-bold">Add Image</span>
                        <input 
                            type="file" 
                            accept="image/*" 
                            multiple={true} 
                            className="hidden" 
                            onChange={handleImageChange} 
                        />
                    </label>
                )}
            </div>
        </div>

        {/* Submit Button (Yellow Theme) */}
        <button
            type="submit"
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl shadow-lg shadow-yellow-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed mt-4 flex items-center justify-center gap-2"
        >
            {loading ? (
                <>Processing...</>
            ) : (
                <>
                    <FaPaperPlane /> Publish Event
                </>
            )}
        </button>

      </form>
    </div>
  );
}