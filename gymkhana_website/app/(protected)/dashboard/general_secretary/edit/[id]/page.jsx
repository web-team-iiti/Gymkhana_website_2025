"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaCloudUploadAlt, FaSave, FaArrowLeft } from "react-icons/fa";

export default function EditProposalPage({ params }) {
  const { id } = React.use(params); // Next.js 15 params unwrapping
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    pdfUrl: "", // Stores the Cloud URL
  });

  // Fetch existing data
  useEffect(() => {
    async function fetchProposal() {
      // You can use your existing GET API or a server action here. 
      // For simplicity, assuming a dedicated API or reusing the tracking API logic
      // Here we simulate fetching the specific proposal details to pre-fill
      const res = await fetch(`/api/proposals/get-details?id=${id}`); // You might need to create this simple getter or use server props
      const data = await res.json();
      
      if (data) {
        setFormData({
            title: data.title,
            description: data.description,
            pdfUrl: data.pdf_url
        });
      }
      setLoading(false);
    }
    fetchProposal();
  }, [id]);

  // Handle File Upload (Client Side to your Cloud Provider)
  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // ... Insert your PDF Upload Logic Here (Supabase/S3/UploadThing) ...
    // For now, I will assume you get a URL back:
    const uploadedUrl = "https://your-cloud-storage.com/new-file.pdf"; // Replace with actual upload logic
    
    setFormData({ ...formData, pdfUrl: uploadedUrl });
    alert("New file selected. (Mock upload logic)");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch("/api/proposals/edit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          proposalId: id,
          title: formData.title,
          description: formData.description,
          pdfUrl: formData.pdfUrl,
        }),
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

  if (loading) return <div className="p-10 text-white">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-400 mb-6 hover:text-white">
        <FaArrowLeft /> Cancel
      </button>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Correct & Resubmit Proposal</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-2">Description / Summary</label>
            <textarea
              rows="4"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-950 border border-gray-700 rounded-lg p-3 text-white focus:border-yellow-500 outline-none"
              required
            ></textarea>
          </div>

          {/* File Upload */}
          <div className="p-4 border border-dashed border-gray-700 rounded-xl bg-gray-950/50">
             <p className="text-sm text-gray-400 mb-2">Current File:</p>
             <a href={formData.pdfUrl} target="_blank" className="text-yellow-500 text-sm hover:underline block mb-4 truncate">
                {formData.pdfUrl}
             </a>

             <label className="cursor-pointer inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
                <FaCloudUploadAlt />
                <span>Upload New Version (Optional)</span>
                <input type="file" accept="application/pdf" className="hidden" onChange={handleFileChange} />
             </label>
             <p className="text-xs text-gray-500 mt-2">Uploading a new file will replace the previous one.</p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-yellow-500 hover:bg-yellow-400 text-gray-900 font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {submitting ? "Updating..." : (
                <>
                    <FaSave /> Save Corrections & Resubmit
                </>
            )}
          </button>

        </form>
      </div>
    </div>
  );
}