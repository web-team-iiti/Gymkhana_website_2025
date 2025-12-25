import React from "react";
import Link from "next/link";
import { query } from "@/config/db"; 
import { FaFilePdf, FaClock, FaExclamationCircle, FaArrowRight, FaUser } from "react-icons/fa";

// 1. Fetch Only ADOSA_REVIEW items
async function getAdosaFiles() {
  const sql = `
    SELECT p.*, u.name as creator_name 
    FROM proposals p
    LEFT JOIN users u ON p.created_by = u.id 
    WHERE p.current_stage = 'ADOSA_REVIEW' -- <--- The Key Difference
    ORDER BY p.created_at ASC; -- Oldest first (FIFO)
  `;
  const result = await query(sql);
  return result.rows;
}

export default async function AdosaInbox() {
  const proposals = await getAdosaFiles();

  return (
    <div className="p-4 md:p-6 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-4 mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Associate Dean Approval</h1>
          <p className="text-gray-400 mt-1">Files forwarded by Gymkhana Office.</p>
        </div>
        <div className="bg-purple-900/30 px-4 py-2 rounded-lg border border-purple-500/30 text-purple-300 font-bold">
          {proposals.length} Waiting
        </div>
      </div>

      {/* The List (Reusing your polished UI) */}
      <div className="grid gap-4">
        {proposals.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800 text-gray-500">
            All clear! No files pending.
          </div>
        ) : (
          proposals.map((item) => (
            <div key={item.id} className="bg-gray-900 border border-gray-800 p-5 rounded-2xl flex flex-col md:flex-row gap-5">
              
              <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1">{item.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{item.description}</p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1"><FaUser/> {item.creator_name}</span>
                    <span className="flex items-center gap-1"><FaClock/> {new Date(item.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                 <Link 
                  href={`/dashboard/adosa/files/${item.id}`}
                  className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all flex items-center gap-2"
                >
                  <span>Review</span>
                  <FaArrowRight />
                </Link>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}