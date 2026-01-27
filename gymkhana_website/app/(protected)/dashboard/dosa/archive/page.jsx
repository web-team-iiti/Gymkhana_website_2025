import React from "react";
import { query } from "@/config/db";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ArchiveTable from "./ArchiveTable"; // Ensure path is correct

// 👇 Updated function to accept statusFilter
async function getArchivedFiles(searchQuery, statusFilter) {
  let sql = `
    SELECT p.*, u.name as creator_name
    FROM proposals p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.current_stage IN ('APPROVED', 'REJECTED')
  `;
  
  const params = [];
  let paramIndex = 1;

  // 1. Search Logic
  if (searchQuery) {
    sql += ` AND (p.title ILIKE $${paramIndex} OR u.name ILIKE $${paramIndex})`;
    params.push(`%${searchQuery}%`);
    paramIndex++;
  }

  // 2. 👇 Status Filter Logic (The Critical Fix)
  if (statusFilter && statusFilter !== "ALL") {
    sql += ` AND p.current_stage = $${paramIndex}`;
    params.push(statusFilter);
    paramIndex++;
  }

  sql += ` ORDER BY p.created_at DESC LIMIT 100`;

  const res = await query(sql, params);
  return res.rows;
}

export default async function DosaArchivePage({ searchParams }) {
  // Await params (Next.js 15 requirement)
  const resolvedParams = await searchParams;
  const q = resolvedParams?.query || "";
  const status = resolvedParams?.status || "ALL"; // 👈 Read status from URL

  // Pass both q and status to the database function
  const files = await getArchivedFiles(q, status);

  // ⚠️ Note: These counts will now reflect the filtered view.
  // If you filter by 'Approved', the Rejected count will naturally be 0.
  const approved = files.filter(f => f.current_stage === 'APPROVED').length;
  const rejected = files.filter(f => f.current_stage === 'REJECTED').length;

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-20">
      
      {/* --- Responsive Header & Stats --- */}
      <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Decision Archive</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">
            {q ? `Search results for "${q}"` : "History of all finalized proposals."}
          </p>
        </div>
        
        {/* Mobile-Friendly Grid for Stats */}
        <div className="grid grid-cols-2 gap-3 w-full lg:w-auto">
            <div className={`bg-green-500/10 border border-green-500/20 px-4 py-3 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 ${status === 'REJECTED' ? 'opacity-50' : ''}`}>
                <FaCheckCircle className="text-green-500 text-lg" />
                <div>
                    <p className="text-[10px] text-green-400 font-bold uppercase tracking-wider">Approved</p>
                    <p className="text-xl md:text-2xl font-bold text-white leading-none">{approved}</p>
                </div>
            </div>
            <div className={`bg-red-500/10 border border-red-500/20 px-4 py-3 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-3 ${status === 'APPROVED' ? 'opacity-50' : ''}`}>
                <FaTimesCircle className="text-red-500 text-lg" />
                <div>
                    <p className="text-[10px] text-red-400 font-bold uppercase tracking-wider">Rejected</p>
                    <p className="text-xl md:text-2xl font-bold text-white leading-none">{rejected}</p>
                </div>
            </div>
        </div>
      </div>

      {/* --- Interactive List --- */}
      <ArchiveTable files={files} initialSearch={q} />

    </div>
  );
}