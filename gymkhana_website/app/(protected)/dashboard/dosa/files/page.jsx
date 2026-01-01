import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import {
  FaFilePdf,
  FaClock,
  FaExclamationCircle,
  FaArrowRight,
  FaUser,
  FaChevronRight,
  FaCheckCircle
} from "react-icons/fa";

async function getDosaFiles() {
  const sql = `
    SELECT p.*, u.name as creator_name 
    FROM proposals p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.current_stage = 'DOSA_REVIEW'
    ORDER BY 
      CASE WHEN p.priority = 'URGENT' THEN 1 WHEN p.priority = 'HIGH' THEN 2 ELSE 3 END,
      p.created_at ASC
  `;
  const res = await query(sql);
  return res.rows;
}

export default async function DosaFilesPage() {
  const files = await getDosaFiles();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto pb-20 md:pb-8">

      {/* --- Page Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 md:mb-8">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Final Approvals</h1>
          <p className="text-sm md:text-base text-gray-400 mt-1">Review and sign off on proposals.</p>
        </div>
        
        {/* Waiting Count Badge */}
        <div className="self-start md:self-auto bg-yellow-500/10 border border-yellow-500/30 px-4 py-1.5 rounded-full flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></span>
            <span className="text-yellow-500 text-xs md:text-sm font-bold font-mono">
                {files.length} Waiting
            </span>
        </div>
      </div>

      {/* --- Files List --- */}
      <div className="space-y-3 md:space-y-4">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 bg-gray-900 rounded-2xl border border-gray-800 text-center">
             <div className="bg-gray-800 p-4 rounded-full mb-4 text-gray-600">
                <FaCheckCircle size={32} />
             </div>
             <h3 className="text-white font-bold text-lg">All Caught Up!</h3>
             <p className="text-gray-500 text-sm mt-1 max-w-xs">There are no pending proposals waiting for your approval right now.</p>
          </div>
        ) : (
          files.map((file) => (
            <Link
              key={file.id}
              href={`/dashboard/dosa/files/${file.id}`}
              className="group relative bg-gray-900 border border-gray-800 rounded-xl p-4 transition-all active:scale-[0.98] hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10"
            >
              {/* Layout: Grid for [Icon] [Content] [Arrow] */}
              <div className="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
                
                {/* 1. LEFT ICON BOX */}
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${
                    file.priority === 'URGENT' 
                    ? 'bg-red-500/10 text-red-500 border border-red-500/20' 
                    : 'bg-gray-800 text-gray-400 border border-gray-700/50'
                }`}>
                  {file.priority === 'URGENT' ? <FaExclamationCircle /> : <FaFilePdf />}
                </div>

                {/* 2. MIDDLE CONTENT */}
                <div className="min-w-0"> {/* min-w-0 forces truncation to work */}
                   <div className="flex items-center gap-2 mb-1">
                       {file.priority === 'URGENT' && (
                           <span className="shrink-0 px-1.5 py-0.5 bg-red-500 text-white text-[10px] font-bold uppercase rounded tracking-wider">
                               Urgent
                           </span>
                       )}
                       <h3 className="text-white font-bold text-base truncate group-hover:text-green-400 transition-colors">
                           {file.title}
                       </h3>
                   </div>
                   
                   {/* Metadata Row */}
                   <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                         <FaUser size={10} className="text-gray-600" /> 
                         <span className="truncate max-w-[100px]">{file.creator_name?.split(' ')[0]}</span>
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                      <span className="flex items-center gap-1">
                         <FaClock size={10} className="text-gray-600" /> 
                         {new Date(file.created_at).toLocaleDateString()}
                      </span>
                   </div>
                </div>

                {/* 3. RIGHT ARROW */}
                <div className="text-gray-600 group-hover:text-green-500 group-hover:translate-x-1 transition-all">
                    <FaChevronRight size={16} />
                </div>

              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}