import React from "react";
import Link from "next/link";
import { query } from "@/config/db"; 
import { FaFilePdf, FaClock, FaExclamationCircle, FaArrowRight, FaUser } from "react-icons/fa";

// 1. Fetch Data directly on the server
async function getPendingProposals() {
  const sql = `
    SELECT p.*, u.name as creator_name 
    FROM proposals p
    LEFT JOIN users u ON p.created_by = u.id 
    WHERE p.current_stage = 'OFFICE_REVIEW'
    ORDER BY 
      CASE WHEN p.priority = 'URGENT' THEN 1 
           WHEN p.priority = 'HIGH' THEN 2 
           ELSE 3 END,
      p.created_at DESC;
  `;
  const result = await query(sql);
  return result.rows;
}

export default async function OfficeFilesPage() {
  const proposals = await getPendingProposals();

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      
      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Incoming Files</h1>
          <p className="text-gray-400 mt-1 md:mt-2 text-sm md:text-base">
            Proposals waiting for administrative verification.
          </p>
        </div>
        
        {/* Counter Badge */}
        <div className="bg-gray-800 px-4 py-2 rounded-lg border border-gray-700 self-start md:self-auto flex items-center gap-2">
          <span className="text-yellow-500 font-bold text-xl">{proposals.length}</span>
          <span className="text-gray-400 text-sm font-medium">Pending Files</span>
        </div>
      </div>

      {/* --- THE LIST --- */}
      <div className="grid gap-4">
        {proposals.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800 text-gray-500 flex flex-col items-center">
            <p className="text-lg">No pending files.</p>
            <p className="text-sm">Good job! 🎉</p>
          </div>
        ) : (
          proposals.map((item) => (
            <div 
              key={item.id} 
              className="bg-gray-900 border border-gray-800 p-5 rounded-2xl hover:border-yellow-500/50 transition-all group flex flex-col md:flex-row gap-5"
            >
              
              {/* --- MAIN CONTENT (Left) --- */}
              <div className="flex-1">
                
                {/* Top Row: Priority & ID */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    {item.priority === 'URGENT' && (
                      <span className="bg-red-500/20 text-red-400 text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-red-500/50 flex items-center gap-1 animate-pulse">
                        <FaExclamationCircle /> URGENT
                      </span>
                    )}
                    {item.priority === 'HIGH' && (
                      <span className="bg-orange-500/20 text-orange-400 text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-orange-500/50">
                        HIGH
                      </span>
                    )}
                    {item.priority === 'NORMAL' && (
                       <span className="bg-blue-500/10 text-blue-400 text-[10px] md:text-xs font-bold px-2 py-1 rounded border border-blue-500/30">
                        NORMAL
                      </span>
                    )}
                  </div>
                  
                  <span className="text-gray-600 text-[10px] md:text-xs font-mono">
                    #{item.id.slice(0, 8)}
                  </span>
                </div>

                {/* Title & Desc */}
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-500 transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-400 text-sm line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Metadata Row */}
                <div className="flex flex-wrap items-center gap-4 mt-4 pt-4 border-t border-gray-800/50 text-sm text-gray-500">
                  <span className="flex items-center gap-2 bg-gray-950 px-2 py-1 rounded-md">
                    <FaUser className="text-xs text-gray-600" />
                    <span className="text-xs md:text-sm truncate max-w-[120px]">{item.creator_name || "Unknown"}</span>
                  </span>
                  <span className="flex items-center gap-2 bg-gray-950 px-2 py-1 rounded-md">
                    <FaClock className="text-xs text-gray-600" />
                    <span className="text-xs md:text-sm">{new Date(item.created_at).toLocaleDateString()}</span>
                  </span>
                </div>
              </div>

              {/* --- ACTION BUTTONS (Right on Desktop, Bottom on Mobile) --- */}
              <div className="flex items-stretch md:items-center gap-3 mt-2 md:mt-0 pt-2 md:pt-0 md:border-0 md:w-auto w-full">
                
                {/* View PDF Button */}
                <a 
                  href={item.pdf_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-3 bg-gray-800 text-gray-400 rounded-xl hover:bg-gray-700 hover:text-white transition-colors flex items-center justify-center border border-gray-700"
                  title="View PDF"
                >
                  <FaFilePdf size={18} />
                </a>

                {/* Review Button (Full width on mobile) */}
                <Link 
                  href={`/dashboard/office/files/${item.id}`}
                  className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-yellow-500 text-gray-900 font-bold rounded-xl hover:bg-yellow-400 transition-transform active:scale-95 shadow-lg shadow-yellow-500/10"
                >
                  <span>Review</span>
                  <FaArrowRight size={14} />
                </Link>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}