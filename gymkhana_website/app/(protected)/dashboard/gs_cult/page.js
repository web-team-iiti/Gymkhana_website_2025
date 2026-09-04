import React from "react";
import Link from "next/link";
import { auth } from "@/auth"; // Secure Session access
import { query } from "@/config/db";
import { FaTrophy, FaCalendarAlt, FaExclamationCircle, FaArrowRight, FaUsers, FaChartBar } from "react-icons/fa";

async function getStats() {
  const session = await auth();

  const statsQuery = `
    SELECT
      (SELECT COUNT(*) FROM clubs WHERE category = 'Cultural Clubs') as clubs_count,
      (SELECT COUNT(*) FROM ibcc_contentions WHERE status = 'pending') as contentions_count,
      (SELECT COUNT(*) FROM ibcc_events WHERE end_time > NOW()) as upcoming_events_count
  `;
  
  // Fetch recent pending contentions for action
  const recentContentionsQuery = `
    SELECT 
      c.id, 
      e.name as event_name, 
      ct.name as contingent_name,
      c.status,
      c.created_at
    FROM ibcc_contentions c
    JOIN ibcc_scores s ON c.score_id = s.id
    JOIN ibcc_events e ON s.event_id = e.id
    JOIN ibcc_contingents ct ON c.contingent_id = ct.id
    WHERE c.status = 'pending'
    ORDER BY c.created_at DESC LIMIT 3;
  `;

  const [statsRes, filesRes] = await Promise.all([
    query(statsQuery), 
    query(recentContentionsQuery)
  ]);

  return { 
    stats: statsRes.rows[0],
    recentFiles: filesRes.rows 
  };
}

export default async function GSCultDashboard() {
  const { stats, recentFiles } = await getStats();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">General Secretary (Culturals)</h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">Manage Cultural clubs, IBCC operations, and resolve disputes.</p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <StatsCard 
            icon={<FaUsers />} 
            color="text-blue-500" 
            title="Cultural Clubs" 
            value={stats.clubs_count} 
            label="managed" 
        />
        <StatsCard 
            icon={<FaCalendarAlt />} 
            color="text-green-500" 
            title="Active Events" 
            value={stats.upcoming_events_count} 
            label="scheduled" 
        />
        <div className="col-span-2 md:col-span-1">
            <StatsCard 
                icon={<FaExclamationCircle />} 
                color="text-red-500" 
                title="Pending Contentions" 
                value={stats.contentions_count} 
                label="require action" 
            />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <RecentList files={recentFiles} role="gs_cult" />
        <QuickGuide />
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

const StatsCard = ({ icon, color, title, value, label }) => (
  <div className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-all h-full">
    <div className={`absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity text-5xl md:text-8xl ${color}`}>{icon}</div>
    <h3 className="text-gray-400 font-medium text-[10px] md:text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-2 md:mt-4 flex items-baseline gap-1.5 md:gap-2">
      <span className="text-2xl md:text-4xl font-bold text-white">{value}</span>
      <span className={`text-[10px] md:text-sm ${color}`}>{label}</span>
    </div>
  </div>
);

const RecentList = ({ files, role }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6">
    <div className="flex justify-between items-center mb-4 md:mb-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <FaExclamationCircle className="text-red-500" /> Action Required
      </h3>
      <Link href={`/dashboard/${role}/ibcc`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
          Resolve All <FaArrowRight />
      </Link>
    </div>
    
    <div className="space-y-3">
      {files.length === 0 ? (
          <div className="text-center py-10 bg-gray-950/30 rounded-xl border border-dashed border-gray-800">
             <FaTrophy className="mx-auto text-gray-700 text-2xl mb-2" />
             <p className="text-gray-500 text-sm">No pending contentions. All clear!</p>
          </div>
      ) : (
        files.map(file => (
          <div 
            key={file.id} 
            className="group flex items-center justify-between p-3 md:p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all"
          >
            <div className="min-w-0 flex-1 pr-3"> 
              <h4 className="text-white font-medium text-sm truncate mb-1">
                  {file.contingent_name}
              </h4>
              <p className="text-[10px] md:text-xs text-gray-400 bg-gray-800 px-2 py-0.5 rounded w-fit uppercase font-bold tracking-wide">
                  {file.event_name}
              </p>
            </div>
            <Link 
               href={`/dashboard/${role}/ibcc`} 
               className="text-red-400 hover:text-white p-2 bg-red-500/10 rounded-lg transition-colors"
            >
               Resolve
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
);

const QuickGuide = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-5 md:p-6 flex flex-col justify-center">
    <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
    <ul className="space-y-4 text-sm text-gray-400">
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-red-500 shrink-0 h-fit"><FaExclamationCircle /></div>
        <div>
            <Link href="/dashboard/gs_cult/ibcc" className="hover:text-white">
              <strong className="text-gray-200 block mb-0.5">IBCC Contentions</strong>
            </Link>
            <span className="text-xs leading-relaxed">Resolve discrepancy contentions raised by leaders.</span>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-green-500 shrink-0 h-fit"><FaCalendarAlt /></div>
        <div>
            <Link href="/dashboard/gs_cult/ibcc-events" className="hover:text-white">
              <strong className="text-gray-200 block mb-0.5">IBCC Events</strong>
            </Link>
            <span className="text-xs leading-relaxed">Create, update, and schedule new IBCC events.</span>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-blue-500 shrink-0 h-fit"><FaChartBar /></div>
        <div>
            <Link href="/ibcc/leaderboard" className="hover:text-white">
              <strong className="text-gray-200 block mb-0.5">Live Leaderboard</strong>
            </Link>
            <span className="text-xs leading-relaxed">View the overall contingent standings and scores.</span>
        </div>
      </li>
    </ul>
  </div>
);
