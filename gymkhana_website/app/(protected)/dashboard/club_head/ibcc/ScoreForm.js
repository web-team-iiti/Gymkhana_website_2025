"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { submitScore } from "./actions";
import { FaCloudUploadAlt, FaFilePdf, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

export default function ScoreForm({ events, contingents }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [fileName, setFileName] = useState("");
  
  // Track form fields to disable submit button
  const [formDataState, setFormDataState] = useState({
    event_id: "",
    contingent_id: "",
    score: ""
  });

  const isFormValid = formDataState.event_id && formDataState.contingent_id && formDataState.score && fileName;

  const handleInputChange = (e) => {
    setFormDataState({
      ...formDataState,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    const formData = new FormData(e.target);
    const file = formData.get("judging_sheet");

    if (file && file.size > 1024 * 1024) {
      setMessage({ type: "error", text: "File size exceeds the 1MB limit. Please compress your PDF or image." });
      setLoading(false);
      return;
    }
    
    try {
      const result = await submitScore(formData);
      
      if (result.error) {
        setMessage({ type: "error", text: result.error });
      } else {
        setMessage({ type: "success", text: "Score submitted successfully!" });
        // Clear all inputs
        e.target.reset();
        setFileName("");
        setFormDataState({ event_id: "", contingent_id: "", score: "" });
        // Redirect to Manage Scores page
        router.push("/dashboard/club_head/ibcc/manage");
      }
    } catch (err) {
      setMessage({ type: "error", text: "Server error: File might be too large or network failed." });
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1024 * 1024) {
        setMessage({ type: "error", text: `File "${file.name}" is larger than 1MB.` });
        setFileName("");
        e.target.value = null; // Clear the invalid file
      } else {
        setFileName(file.name);
        setMessage({ type: "", text: "" });
      }
    } else {
      setFileName("");
    }
  };

  const inputClasses = "w-full px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-950 border border-gray-800 text-white placeholder-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all appearance-none";
  const labelClasses = "block text-xs sm:text-sm font-semibold text-gray-400 mb-2";

  return (
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      {message.text && (
        <div className={`p-4 rounded-xl font-medium text-sm flex items-center gap-3 ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
          {message.type === 'error' ? <FaExclamationCircle size={18} /> : <FaCheckCircle size={18} />}
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div>
          <label htmlFor="event_id" className={labelClasses}>Select Event</label>
          <div className="relative">
            <select name="event_id" id="event_id" value={formDataState.event_id} onChange={handleInputChange} required className={`${inputClasses} pr-10`}>
              <option value="" className="text-gray-500">-- Select Event --</option>
              {events.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="contingent_id" className={labelClasses}>Select Contingent</label>
          <div className="relative">
            <select name="contingent_id" id="contingent_id" value={formDataState.contingent_id} onChange={handleInputChange} required className={`${inputClasses} pr-10`}>
              <option value="" className="text-gray-500">-- Select Contingent --</option>
              {contingents.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="score" className={labelClasses}>Assign Score</label>
        <input type="number" step="0.1" name="score" id="score" value={formDataState.score} onChange={handleInputChange} required className={inputClasses} placeholder="e.g. 100" />
      </div>

      <div>
        <label htmlFor="judging_sheet" className={labelClasses}>Signed Judging Sheet (PDF/Image)</label>
        <div className="mt-2 flex items-center justify-center w-full">
            <label className={`flex flex-col items-center justify-center w-full h-32 sm:h-40 border-2 border-dashed rounded-xl cursor-pointer transition-all ${fileName ? 'border-green-500/50 bg-green-500/5 hover:bg-green-500/10' : 'border-gray-700 bg-gray-950/50 hover:bg-gray-800/50 hover:border-gray-500'}`}>
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center px-4">
                    {fileName ? (
                      <>
                        <FaFilePdf className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-green-500" />
                        <p className="mb-1 text-xs sm:text-sm font-semibold text-green-400 truncate max-w-[200px] sm:max-w-[250px]">{fileName}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500">Click to change file</p>
                      </>
                    ) : (
                      <>
                        <FaCloudUploadAlt className="w-8 h-8 sm:w-10 sm:h-10 mb-2 sm:mb-3 text-gray-500" />
                        <p className="mb-1 sm:mb-2 text-xs sm:text-sm text-gray-400"><span className="font-semibold text-blue-400">Click to upload</span> or drag and drop</p>
                        <p className="text-[10px] sm:text-xs text-gray-600">PDF, PNG, JPG (Max. 1MB)</p>
                      </>
                    )}
                </div>
                <input id="judging_sheet" type="file" name="judging_sheet" accept=".pdf,image/*" onChange={handleFileChange} required className="hidden" />
            </label>
        </div>
      </div>

      <div className="pt-2">
        <button type="submit" disabled={loading || !isFormValid} className="w-full flex justify-center py-3.5 sm:py-4 px-4 rounded-xl font-bold text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:ring-offset-gray-900 shadow-[0_0_20px_rgba(37,99,235,0.2)] hover:shadow-[0_0_30px_rgba(59,130,246,0.4)] transition-all disabled:opacity-50 disabled:cursor-not-allowed text-base sm:text-lg tracking-wide">
          {loading ? "Submitting securely..." : "Submit Verified Score"}
        </button>
      </div>
    </form>
  );
}
