import React from "react";
import Link from "next/link";
import { auth } from "@/auth"; // Secure Session access
import { query } from "@/config/db";
import { FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight, FaFileAlt } from "react-icons/fa";

async function getStats() {
  const session = await auth();
  const userId = session.user.id; // Security: Only fetch GS's own data

  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE created_by = $1 AND current_stage NOT IN ('APPROVED', 'REJECTED')) as pending_count,
      COUNT(*) FILTER (WHERE created_by = $1 AND current_stage = 'APPROVED') as approved_count,
      COUNT(*) FILTER (WHERE created_by = $1 AND current_stage = 'REJECTED') as rejected_count
    FROM proposals;
  `;
  
  // Fetch recent active proposals
  const recentFilesQuery = `
    SELECT id, title, current_stage as status, created_at 
    FROM proposals 
    WHERE created_by = $1 AND current_stage NOT IN ('APPROVED', 'REJECTED')
    ORDER BY created_at DESC LIMIT 3;
  `;

  const [statsRes, filesRes] = await Promise.all([
    query(statsQuery, [userId]), 
    query(recentFilesQuery, [userId])
  ]);

  return { 
    stats: statsRes.rows[0],
    recentFiles: filesRes.rows 
  };
}

export default async function GeneralSecretaryOverview() {
  const { stats, recentFiles } = await getStats();

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">General Secretary Dashboard</h1>
        <p className="text-gray-400 mt-1">Track your Gymkhana proposals.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={<FaClock />} color="text-yellow-500" title="Active Proposals" value={stats.pending_count} label="in pipeline" />
        <StatsCard icon={<FaCheckCircle />} color="text-green-500" title="Approved" value={stats.approved_count} label="completed" />
        <StatsCard icon={<FaTimesCircle />} color="text-red-500" title="Rejected" value={stats.rejected_count} label="archived" />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentList files={recentFiles} role="general_secretary" />
        <QuickGuide />
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---
const StatsCard = ({ icon, color, title, value, label }) => (
  <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-all">
    <div className={`absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity text-8xl ${color}`}>{icon}</div>
    <h3 className="text-gray-400 font-medium text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-4 flex items-baseline gap-2">
      <span className="text-4xl font-bold text-white">{value}</span>
      <span className={`text-sm ${color}`}>{label}</span>
    </div>
  </div>
);

const RecentList = ({ files, role }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <div className="flex justify-between items-center mb-6">
      <h3 className="text-lg font-bold text-white">Recent Activity</h3>
      <Link href={`/dashboard/${role}/my-proposals`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">View All <FaArrowRight /></Link>
    </div>
    <div className="space-y-4">
      {files.length === 0 ? <div className="text-center text-gray-500 py-8 text-sm">No active proposals.</div> : 
        files.map(file => (
          <div key={file.id} className="flex items-center justify-between p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors">
            <div>
              <h4 className="text-white font-medium text-sm truncate w-48">{file.title}</h4>
              <p className="text-xs text-blue-400 mt-1 bg-blue-500/10 px-2 py-0.5 rounded w-fit">{file.status.replace('_', ' ')}</p>
            </div>
            <Link href={`/dashboard/${role}/my-proposals`} className="text-gray-500 hover:text-white"><FaArrowRight /></Link>
          </div>
        ))
      }
    </div>
  </div>
);

const QuickGuide = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-6 flex flex-col justify-center">
    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
    <ul className="space-y-4 text-sm text-gray-400">
      <li className="flex gap-3"><div className="bg-gray-800 p-2 rounded text-yellow-500"><FaFileAlt /></div><span><strong className="text-gray-200 block">Create Proposal</strong>Submit new events or budget requests.</span></li>
      <li className="flex gap-3"><div className="bg-gray-800 p-2 rounded text-blue-500"><FaCheckCircle /></div><span><strong className="text-gray-200 block">Check Status</strong>See where your file is stuck in the pipeline.</span></li>
    </ul>
  </div>
);