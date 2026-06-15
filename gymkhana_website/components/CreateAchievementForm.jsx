"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaCloudUploadAlt, FaCalendarAlt, FaArrowLeft, FaTimes, FaPaperPlane } from "react-icons/fa";

export default function CreateAchievementForm({ councils }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    council_id: councils.length > 0 ? councils[0].id : "",
    date: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        const data = new FormData();
        data.append("title", formData.title);
        data.append("council_id", formData.council_id);
        data.append("date", formData.date);
        data.append("description", formData.description);
        if (image) data.append("image", image);

        const res = await fetch("/api/achievements/create", { method: "POST", body: data });
        if (res.ok) {
            router.push("/dashboard/general_secretary/achievements");
            router.refresh();
        } else {
            alert("Failed to create achievement");
        }
    } catch (error) {
        console.error(error);
        alert("Error creating achievement");
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 pb-20">
      <div className="mb-6">
        <Link href="/dashboard/general_secretary/achievements" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-4 text-sm transition-colors">
            <FaArrowLeft /> Back
        </Link>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Add New Achievement</h1>
      </div>

      <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-8 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Achievement Title</label>
                <input type="text" name="title" required className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500" onChange={handleChange} />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Select Council</label>
                <select name="council_id" required className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none" onChange={handleChange} value={formData.council_id}>
                    {councils.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Achievement Date</label>
            <div className="relative">
                <FaCalendarAlt className="absolute left-4 top-3.5 text-gray-500" />
                <input type="date" name="date" required className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 appearance-none" onChange={handleChange} />
            </div>
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Description</label>
            <textarea name="description" rows="4" required className="w-full bg-gray-950 border border-gray-800 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-yellow-500 resize-none" onChange={handleChange} />
        </div>

        <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wide mb-2">Image</label>
            <div className="grid grid-cols-2 gap-4 max-w-sm">
                {preview ? (
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-700 group">
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        <button type="button" onClick={removeImage} className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 shadow-md hover:scale-110">
                            <FaTimes size={10} />
                        </button>
                    </div>
                ) : (
                    <label className="aspect-video border-2 border-dashed border-gray-700 bg-gray-950/50 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500 hover:text-yellow-500 text-gray-500">
                        <FaCloudUploadAlt size={24} className="mb-1" />
                        <span className="text-xs font-bold">Add Image</span>
                        <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                    </label>
                )}
            </div>
        </div>

        <button type="submit" disabled={loading} className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-4 rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50 mt-4 flex items-center justify-center gap-2">
            {loading ? "Processing..." : <><FaPaperPlane /> Add Achievement</>}
        </button>
      </form>
    </div>
  );
}
