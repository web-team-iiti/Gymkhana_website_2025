import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { query } from "@/config/db";
import { FaClock, FaCheckCircle, FaTimesCircle, FaArrowRight, FaFileAlt, FaUserGraduate } from "react-icons/fa";

async function getStats() {
  const session = await auth();
  const userId = session.user.id;

  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE created_by = $1 AND current_stage NOT IN ('APPROVED', 'REJECTED')) as pending_count,
      COUNT(*) FILTER (WHERE created_by = $1 AND current_stage = 'APPROVED') as approved_count,
      COUNT(*) FILTER (WHERE created_by = $1 AND current_stage = 'REJECTED') as rejected_count
    FROM proposals;
  `;

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

  return { stats: statsRes.rows[0], recentFiles: filesRes.rows };
}

export default async function ClubHeadOverview() {
  const { stats, recentFiles } = await getStats();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-20">

      {/* Header - Blue Theme */}
      <div className="flex items-center gap-3 md:gap-4">
        <div className="p-2.5 md:p-3 bg-blue-500/10 rounded-xl border border-blue-500/50 text-blue-400 shrink-0">
          <FaUserGraduate className="text-xl md:text-3xl" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white">Club Head</h1>
          <p className="text-sm md:text-base text-gray-400 mt-0.5">Manage your club events.</p>
        </div>
      </div>

      {/* --- STATS CARDS (Grid Layout - Matches DOSA) --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        {/* Active - Primary Blue */}
        <StatsCard
          icon={<FaClock />}
          color="text-blue-400"
          bg="bg-blue-500/10"
          border="border-blue-500"
          title="In Progress"
          value={stats.pending_count}
          label="active proposals"
          shadow="shadow-[0_0_15px_rgba(59,130,246,0.3)]"
        />
        <StatsCard
          icon={<FaCheckCircle />}
          color="text-green-500"
          border="border-gray-800"
          title="Approved"
          value={stats.approved_count}
          label="completed"
        />
        {/* On mobile, make the 3rd card span full width */}
        <div className="col-span-2 md:col-span-1">
          <StatsCard
            icon={<FaTimesCircle />}
            color="text-red-500"
            border="border-gray-800"
            title="Rejected"
            value={stats.rejected_count}
            label="archived"
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <RecentList files={recentFiles} role="club_head" theme="blue" />
        <QuickGuide theme="blue" />
      </div>
    </div>
  );
}

// --- Components with Dynamic Theme Props ---
const StatsCard = ({ icon, color, bg, border, title, value, label, shadow }) => (
  <div className={`bg-gray-900 border ${border || 'border-gray-800'} p-4 md:p-6 rounded-2xl relative overflow-hidden group hover:border-gray-600 transition-all ${shadow || ''} h-full`}>
    {/* Icon: Smaller on mobile */}
    <div className={`absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity text-5xl md:text-8xl ${color}`}>{icon}</div>

    <h3 className="text-gray-400 font-medium text-[10px] md:text-sm uppercase tracking-wider">{title}</h3>

    <div className="mt-2 md:mt-4 flex items-baseline gap-1.5 md:gap-2">
      <span className="text-2xl md:text-4xl font-bold text-white">{value}</span>
      <span className={`text-[10px] md:text-sm ${color}`}>{label}</span>
    </div>
  </div>
);

const RecentList = ({ files, role, theme }) => (
  <div className={`bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6`}>
    <div className="flex justify-between items-center mb-4 md:mb-6">
      <h3 className="text-lg font-bold text-white">Recent Activity</h3>
      <Link href={`/dashboard/${role}/my-proposals`} className={`text-xs text-${theme}-400 hover:text-white flex items-center gap-1`}>
        View All <FaArrowRight />
      </Link>
    </div>

    <div className="space-y-3">
      {files.length === 0 ? (
        <div className="text-center py-10 bg-gray-950/30 rounded-xl border border-dashed border-gray-800">
          <FaClock className="mx-auto text-gray-700 text-2xl mb-2" />
          <p className="text-gray-500 text-sm">No active proposals.</p>
        </div>
      ) : (
        files.map(file => (
          <div
            key={file.id}
            className="group flex items-center justify-between p-3 md:p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
          >
            {/* Left Content (Truncating for mobile) */}
            <div className="min-w-0 flex-1 pr-3">
              <h4 className="text-white font-medium text-sm truncate mb-1">
                {file.title}
              </h4>
              <p className={`text-[10px] md:text-xs text-${theme}-400 bg-${theme}-500/10 px-2 py-0.5 rounded w-fit uppercase font-bold tracking-wide`}>
                {file.status.replace('_', ' ')}
              </p>
            </div>

            {/* Right Action Button */}
            <Link
              href={`/dashboard/${role}/my-proposals`}
              className="text-gray-500 hover:text-white p-2"
            >
              <FaArrowRight />
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
);

const QuickGuide = ({ theme }) => (
  <div className={`bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-5 md:p-6 flex flex-col justify-center`}>
    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
    <ul className="space-y-4 text-sm text-gray-400">
      <li className="flex gap-3">
        <div className={`bg-gray-800 p-2 rounded text-${theme}-400 shrink-0 h-fit`}><FaFileAlt /></div>
        <div>
          <strong className="text-gray-200 block mb-0.5">Create Proposal</strong>
          <span className="text-xs leading-relaxed">Submit new events or budget requests.</span>
        </div>
      </li>
      <li className="flex gap-3">
        <div className={`bg-gray-800 p-2 rounded text-${theme}-400 shrink-0 h-fit`}><FaCheckCircle /></div>
        <div>
          <strong className="text-gray-200 block mb-0.5">Check Status</strong>
          <span className="text-xs leading-relaxed">See where your file is stuck in the pipeline.</span>
        </div>
      </li>
    </ul>
  </div>
);