import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { FaClock, FaExclamationCircle, FaCheckCircle, FaArrowRight, FaFileAlt, FaChevronRight } from "react-icons/fa";

// 1. Fetch Stats & Pending Files
async function getStats() {
  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE current_stage = 'ADOSA_REVIEW') as pending_count,
      COUNT(*) FILTER (WHERE current_stage = 'ADOSA_REVIEW' AND priority = 'URGENT') as urgent_count,
      COUNT(*) FILTER (WHERE current_stage = 'DOSA_REVIEW' OR current_stage = 'APPROVED') as processed_count
    FROM proposals;
  `;
  
  const urgentFilesQuery = `
    SELECT 
        proposals.id, 
        proposals.title, 
        users.name as creator_name, 
        proposals.created_at,
        proposals.priority
    FROM proposals 
    LEFT JOIN users ON proposals.created_by = users.id
    WHERE current_stage = 'ADOSA_REVIEW'
    ORDER BY priority = 'URGENT' DESC, proposals.created_at ASC LIMIT 5;
  `;

  const [statsRes, filesRes] = await Promise.all([query(statsQuery), query(urgentFilesQuery)]);
  return { stats: statsRes.rows[0], urgentFiles: filesRes.rows };
}

export default async function AdosaOverview() {
  const { stats, urgentFiles } = await getStats();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Associate Dean</h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">Review and forward Gymkhana proposals.</p>
      </div>

      {/* --- STATS CARDS (Exact Match to DOSA) --- */}
      {/* Mobile: Grid-cols-2 (Compact) | Desktop: Grid-cols-3 (Normal) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <StatsCard 
            icon={<FaClock />} 
            color="text-yellow-500" 
            title="Pending Review" 
            value={stats.pending_count} 
            label="files waiting" 
        />
        <StatsCard 
            icon={<FaExclamationCircle />} 
            color="text-red-500" 
            title="Urgent" 
            value={stats.urgent_count} 
            label="need attention" 
            isUrgent 
        />
        {/* On mobile, make the 3rd card span full width to look better */}
        <div className="col-span-2 md:col-span-1">
            <StatsCard 
                icon={<FaCheckCircle />} 
                color="text-green-500" 
                title="Processed" 
                value={stats.processed_count} 
                label="forwarded" 
            />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
        <UrgentList files={urgentFiles} role="adosa" />
        <QuickGuide />
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

const StatsCard = ({ icon, color, title, value, label, isUrgent }) => (
  <div className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-all h-full">
    {/* Icon: Smaller on mobile (text-5xl) vs desktop (text-8xl) */}
    <div className={`absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity text-5xl md:text-8xl ${color}`}>{icon}</div>
    
    <h3 className="text-gray-400 font-medium text-[10px] md:text-sm uppercase tracking-wider">{title}</h3>
    
    <div className="mt-2 md:mt-4 flex items-baseline gap-1.5 md:gap-2">
      {/* Value: Smaller on mobile (text-2xl) vs desktop (text-4xl) */}
      <span className="text-2xl md:text-4xl font-bold text-white">{value}</span>
      <span className={`text-[10px] md:text-sm ${color}`}>{label}</span>
    </div>
    
    {isUrgent && value > 0 && (
        <div className="mt-2 md:mt-4 text-[10px] md:text-xs text-red-400 font-bold animate-pulse flex items-center gap-1">
           <FaExclamationCircle /> Action Required
        </div>
    )}
  </div>
);

const UrgentList = ({ files, role }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6">
    <div className="flex justify-between items-center mb-4 md:mb-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span> Priority Queue
      </h3>
      <Link href={`/dashboard/${role}/files`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
          View All <FaArrowRight />
      </Link>
    </div>
    
    <div className="space-y-3">
      {files.length === 0 ? (
          <div className="text-center py-10 bg-gray-950/30 rounded-xl border border-dashed border-gray-800">
              <FaCheckCircle className="mx-auto text-gray-700 text-2xl mb-2" />
              <p className="text-gray-500 text-sm">No urgent files pending.</p>
          </div>
      ) : (
        files.map(file => (
          <div 
            key={file.id} 
            className="group flex items-center justify-between p-3 md:p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-red-500/30 transition-all"
          >
            {/* Left Content (Truncating for mobile) */}
            <div className="min-w-0 flex-1 pr-3"> 
              <div className="flex items-center gap-2 mb-0.5">
                  {file.priority === 'URGENT' && <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0"></span>}
                  <h4 className="text-white font-medium text-sm truncate">
                      {file.title}
                  </h4>
              </div>
              <p className="text-xs text-gray-500 truncate">Creator: {file.creator_name?.split(' ')[0]}</p>
            </div>

            {/* Right Action Button */}
            <Link 
               href={`/dashboard/${role}/files/${file.id}`}
               className="shrink-0 px-3 py-1.5 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg border border-red-500/20 hover:bg-red-500 hover:text-white active:scale-95 transition-all"
            >
               Review
            </Link>
          </div>
        ))
      )}
    </div>
  </div>
);

const QuickGuide = () => (
  <div className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 rounded-2xl p-5 md:p-6 flex flex-col justify-center">
    <h3 className="text-lg font-bold text-white mb-4">Quick Guide</h3>
    <ul className="space-y-4 text-sm text-gray-400">
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-yellow-500 shrink-0 h-fit"><FaFileAlt /></div>
        <div>
            <strong className="text-gray-200 block mb-0.5">Check Inbox</strong>
            <span className="text-xs leading-relaxed">Review incoming proposals daily to prevent bottlenecks.</span>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-blue-500 shrink-0 h-fit"><FaCheckCircle /></div>
        <div>
            <strong className="text-gray-200 block mb-0.5">Verify & Forward</strong>
            <span className="text-xs leading-relaxed">Ensure budget and formatting are correct before sending to the Dean.</span>
        </div>
      </li>
    </ul>
  </div>
);