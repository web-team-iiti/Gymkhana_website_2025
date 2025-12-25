import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { FaClock, FaExclamationCircle, FaCheckCircle, FaArrowRight, FaFileSignature, FaTimesCircle } from "react-icons/fa";

// 1. Fetch Stats & Pending Files
async function getStats() {
  // DOSA Security: Only fetch 'DOSA_REVIEW' or 'APPROVED'
  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE current_stage = 'DOSA_REVIEW') as pending_count,
      COUNT(*) FILTER (WHERE current_stage = 'DOSA_REVIEW' AND priority = 'URGENT') as urgent_count,
      COUNT(*) FILTER (WHERE current_stage = 'APPROVED') as approved_total
    FROM proposals;
  `;
  
  // FIX: Added 'proposals.' prefix to avoid ambiguous column reference
  const pendingFilesQuery = `
    SELECT 
        proposals.id, 
        proposals.title, 
        users.name as creator_name, 
        proposals.created_at 
    FROM proposals 
    LEFT JOIN users ON proposals.created_by = users.id
    WHERE current_stage = 'DOSA_REVIEW'
    ORDER BY priority = 'URGENT' DESC, proposals.created_at ASC LIMIT 3;
  `;

  const [statsRes, filesRes] = await Promise.all([query(statsQuery), query(pendingFilesQuery)]);
  return { stats: statsRes.rows[0], pendingFiles: filesRes.rows };
}

export default async function DosaOverview() {
  const { stats, pendingFiles } = await getStats();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Dean's Dashboard</h1>
        <p className="text-gray-400 mt-1">Final approval required for the following files.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard 
            icon={<FaExclamationCircle />} 
            color="text-yellow-500" 
            title="Pending My Action" 
            value={stats.pending_count} 
            label="files waiting" 
        />
        <StatsCard 
            icon={<FaClock />} 
            color="text-red-500" 
            title="Urgent Priority" 
            value={stats.urgent_count} 
            label="high priority" 
            isUrgent 
        />
        <StatsCard 
            icon={<FaCheckCircle />} 
            color="text-green-500" 
            title="Total Approved" 
            value={stats.approved_total} 
            label="this semester" 
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <PendingList files={pendingFiles} role="dosa" />
        <QuickGuide />
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

const StatsCard = ({ icon, color, title, value, label, isUrgent }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-8xl ${color}`}>{icon}</div>
    <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-4 flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">{value}</span>
      <span className={`text-sm ${color}`}>{label}</span>
    </div>
    {isUrgent && value > 0 && <p className="text-xs text-red-400 mt-4 animate-pulse">Action required</p>}
  </div>
);

const PendingList = ({ files, role }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
         Approval Queue
      </h3>
      <Link href={`/dashboard/${role}/files`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">View All <FaArrowRight /></Link>
    </div>
    <div className="space-y-4">
      {files.length === 0 ? <div className="text-center text-gray-500 py-8 text-sm">You are all caught up!</div> : 
        files.map(file => (
          <div key={file.id} className="flex items-center justify-between p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div>
              <h4 className="text-white font-medium text-sm truncate w-48">{file.title}</h4>
              <p className="text-xs text-gray-500 mt-1">From: {file.creator_name}</p>
            </div>
            <Link 
                href={`/dashboard/${role}/files/${file.id}`} 
                className="px-3 py-1.5 bg-yellow-500 text-gray-900 text-xs font-bold rounded-lg hover:bg-yellow-400 transition-all"
            >
                Decide
            </Link>
          </div>
        ))
      }
    </div>
  </div>
);

const QuickGuide = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-6 flex flex-col justify-center">
    <h3 className="text-lg font-bold text-white mb-4">Authority Guide</h3>
    <ul className="space-y-4 text-sm text-gray-400">
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-green-500"><FaFileSignature /></div>
        <span><strong className="text-gray-200 block">Approve</strong>Finalizes the document and notifies the student immediately.</span>
      </li>
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-red-500"><FaTimesCircle /></div>
        <span><strong className="text-gray-200 block">Reject</strong>Stops the proposal permanently. You must provide a reason.</span>
      </li>
    </ul>
  </div>
);