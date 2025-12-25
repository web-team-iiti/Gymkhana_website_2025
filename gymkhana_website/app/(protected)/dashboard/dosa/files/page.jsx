import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { 
  FaFilePdf, 
  FaClock, 
  FaExclamationCircle, 
  FaArrowRight, 
  FaUser 
} from "react-icons/fa";

async function getDosaFiles() {
  // Fetch files waiting for DOSA Approval
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
    <div className="p-6 md:p-8 max-w-7xl mx-auto">
      
      {/* Page Header */}
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white">Final Approvals</h1>
          <p className="text-gray-400 mt-1">Review and sign off on Gymkhana proposals.</p>
        </div>
        <span className="bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 px-3 py-1 rounded-full text-sm font-bold font-mono">
          {files.length} Waiting
        </span>
      </div>

      {/* Files List */}
      <div className="grid grid-cols-1 gap-4">
        {files.length === 0 ? (
          <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
            <p className="text-gray-500">You are all caught up. No pending approvals.</p>
          </div>
        ) : (
          files.map((file) => (
            <Link 
              key={file.id} 
              href={`/dashboard/dosa/files/${file.id}`}
              className="group bg-gray-900 border border-gray-800 p-5 rounded-xl flex flex-col md:flex-row items-center justify-between hover:border-green-500/50 transition-all shadow-lg hover:shadow-green-500/10"
            >
              {/* Left: File Info */}
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${file.priority === 'URGENT' ? 'bg-red-500/10 text-red-500' : 'bg-gray-800 text-gray-400'}`}>
                  {file.priority === 'URGENT' ? <FaExclamationCircle size={20} /> : <FaFilePdf size={20} />}
                </div>
                <div>
                  <h3 className="text-white font-bold group-hover:text-green-500 transition-colors text-lg">
                    {file.title}
                  </h3>
                  <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1 bg-gray-950 px-2 py-1 rounded border border-gray-800">
                        <FaUser size={10} /> {file.creator_name || 'Unknown User'}
                    </span>
                    <span className="flex items-center gap-1 bg-gray-950 px-2 py-1 rounded border border-gray-800">
                        <FaClock size={10} /> {new Date(file.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: Status & Action */}
              <div className="flex items-center gap-4 mt-4 md:mt-0">
                {file.priority === 'URGENT' && (
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 text-[10px] font-bold uppercase rounded border border-red-500/30 animate-pulse">
                        Urgent
                    </span>
                )}
                <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center text-gray-500 group-hover:bg-green-600 group-hover:text-white transition-all">
                  <FaArrowRight size={14} />
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}