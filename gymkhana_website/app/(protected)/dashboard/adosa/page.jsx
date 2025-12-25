import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { FaClock, FaExclamationCircle, FaCheckCircle, FaArrowRight, FaFileAlt } from "react-icons/fa";

async function getStats() {
  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE current_stage = 'ADOSA_REVIEW') as pending_count,
      COUNT(*) FILTER (WHERE current_stage = 'ADOSA_REVIEW' AND priority = 'URGENT') as urgent_count,
      COUNT(*) FILTER (WHERE current_stage = 'DOSA_REVIEW' OR current_stage = 'APPROVED') as processed_count
    FROM proposals;
  `;
  
  // FIX: Added 'proposals.' prefix to avoid ambiguity
  const urgentFilesQuery = `
    SELECT 
        proposals.id, 
        proposals.title, 
        users.name as creator_name, 
        proposals.created_at 
    FROM proposals 
    LEFT JOIN users ON proposals.created_by = users.id
    WHERE current_stage = 'ADOSA_REVIEW'
    ORDER BY priority = 'URGENT' DESC, proposals.created_at ASC LIMIT 3;
  `;

  const [statsRes, filesRes] = await Promise.all([query(statsQuery), query(urgentFilesQuery)]);
  return { stats: statsRes.rows[0], urgentFiles: filesRes.rows };
}

export default async function AdosaOverview() {
  const { stats, urgentFiles } = await getStats();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white">Associate Dean Dashboard</h1>
          <p className="text-gray-400 mt-1">Review and forward Gymkhana proposals.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={<FaClock />} color="text-yellow-500" title="Pending Review" value={stats.pending_count} label="files waiting" />
        <StatsCard icon={<FaExclamationCircle />} color="text-red-500" title="Urgent" value={stats.urgent_count} label="need attention" isUrgent />
        <StatsCard icon={<FaCheckCircle />} color="text-green-500" title="Processed" value={stats.processed_count} label="forwarded" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <UrgentList files={urgentFiles} role="adosa" />
        <QuickGuide />
      </div>
    </div>
  );
}

// Reuse the Components (StatsCard, UrgentList, QuickGuide) from the GS/Office files here
// Make sure UrgentList Link href is: `/dashboard/adosa/files/${file.id}`
const StatsCard = ({ icon, color, title, value, label, isUrgent }) => (
  <div className={`bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-all`}>
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-8xl ${color}`}>{icon}</div>
    <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-4 flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">{value}</span>
      <span className={`${color} text-sm`}>{label}</span>
    </div>
    {isUrgent && value > 0 && <p className="text-xs text-red-400 mt-4 animate-pulse">Action required</p>}
  </div>
);

const UrgentList = ({ files, role }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Priority Queue
      </h3>
      <Link href={`/dashboard/${role}/files`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">View All <FaArrowRight /></Link>
    </div>
    <div className="space-y-4">
      {files.length === 0 ? <div className="text-center text-gray-500 py-8 text-sm">No urgent files.</div> : 
        files.map(file => (
          <div key={file.id} className="flex items-center justify-between p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div>
              <h4 className="text-white font-medium text-sm truncate w-48">{file.title}</h4>
              <p className="text-xs text-gray-500 mt-1">{file.creator_name}</p>
            </div>
            <Link href={`/dashboard/${role}/files/${file.id}`} className="px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white transition-all">Review</Link>
          </div>
        ))
      }
    </div>
  </div>
);

const QuickGuide = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-6 flex flex-col justify-center">
    <h3 className="text-lg font-bold text-white mb-4">Quick Guide</h3>
    <ul className="space-y-4 text-sm text-gray-400">
      <li className="flex gap-3"><div className="bg-gray-800 p-2 rounded text-yellow-500"><FaFileAlt /></div><span><strong className="text-gray-200 block">Check Inbox</strong>Review incoming proposals daily.</span></li>
      <li className="flex gap-3"><div className="bg-gray-800 p-2 rounded text-blue-500"><FaCheckCircle /></div><span><strong className="text-gray-200 block">Verify & Forward</strong>Ensure budget and formatting are correct before sending to ADOSA.</span></li>
    </ul>
  </div>
);