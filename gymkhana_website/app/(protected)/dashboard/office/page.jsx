import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { FaClock, FaExclamationCircle, FaCheckCircle, FaArrowRight, FaFileAlt, FaLayerGroup } from "react-icons/fa";

// 1. Fetch Stats & Pending Files (Smart Sorted)
async function getStats() {
  const statsQuery = `
    SELECT
      COUNT(*) FILTER (WHERE current_stage = 'OFFICE_REVIEW') as pending_count,
      COUNT(*) FILTER (WHERE current_stage = 'OFFICE_REVIEW' AND priority = 'URGENT') as urgent_count,
      COUNT(*) FILTER (WHERE current_stage != 'OFFICE_REVIEW') as processed_count
    FROM proposals;
  `;
  
  // 👇 UPDATED QUERY: Fetch ALL pending, but sort Urgent to top
  const pendingFilesQuery = `
    SELECT 
        proposals.id, 
        proposals.title, 
        users.name as creator_name, 
        proposals.created_at,
        proposals.priority
    FROM proposals 
    LEFT JOIN users ON proposals.created_by = users.id
    WHERE current_stage = 'OFFICE_REVIEW' 
    ORDER BY 
      -- 1. Priority Sort: Urgent (1) -> High (2) -> Medium (3) -> Low (4)
      CASE 
        WHEN priority = 'URGENT' THEN 1 
        WHEN priority = 'HIGH' THEN 2 
        WHEN priority = 'MEDIUM' THEN 3 
        ELSE 4 
      END ASC,
      -- 2. Then sort by oldest created (First In, First Out)
      proposals.created_at ASC 
    LIMIT 5;
  `;

  const [statsRes, filesRes] = await Promise.all([query(statsQuery), query(pendingFilesQuery)]);
  return { stats: statsRes.rows[0], pendingFiles: filesRes.rows };
}

export default async function OfficeOverview() {
   const { stats, pendingFiles } = await getStats();

  return (
    <div className="p-4 md:p-8 max-w-7xl mx-auto space-y-6 md:space-y-8 pb-20">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">Office Dashboard</h1>
        <p className="text-sm md:text-base text-gray-400 mt-1">Overview of incoming gymkhana files.</p>
      </div>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6">
        <StatsCard 
            icon={<FaClock />} 
            color="text-yellow-500" 
            title="Total Pending" 
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
        {/* We pass 'pendingFiles' instead of 'urgentFiles' */}
        <PendingList files={pendingFiles} role="office" />
        <QuickGuide />
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

const StatsCard = ({ icon, color, title, value, label, isUrgent }) => (
  <div className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-2xl relative overflow-hidden group hover:border-gray-700 transition-all h-full">
    <div className={`absolute top-0 right-0 p-3 md:p-4 opacity-10 group-hover:opacity-20 transition-opacity text-5xl md:text-8xl ${color}`}>{icon}</div>
    <h3 className="text-gray-400 font-medium text-[10px] md:text-sm uppercase tracking-wider">{title}</h3>
    <div className="mt-2 md:mt-4 flex items-baseline gap-1.5 md:gap-2">
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

// Renamed from UrgentList to PendingList
const PendingList = ({ files, role }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 md:p-6">
    <div className="flex justify-between items-center mb-4 md:mb-6">
      <h3 className="text-lg font-bold text-white flex items-center gap-2">
        <FaLayerGroup className="text-blue-500" /> Pending Reviews
      </h3>
      <Link href={`/dashboard/${role}/files`} className="text-xs text-gray-400 hover:text-white flex items-center gap-1">
          View All <FaArrowRight />
      </Link>
    </div>
    
    <div className="space-y-3">
      {files.length === 0 ? (
          <div className="text-center py-10 bg-gray-950/30 rounded-xl border border-dashed border-gray-800">
              <FaCheckCircle className="mx-auto text-gray-700 text-2xl mb-2" />
              <p className="text-gray-500 text-sm">Inbox is empty. Great job!</p>
          </div>
      ) : (
        files.map(file => {
          // Dynamic Styling based on Priority
          const isUrgent = file.priority === 'URGENT' || file.priority === 'HIGH';
          const badgeColor = isUrgent ? 'bg-red-500' : 'bg-blue-500';
          const borderColor = isUrgent ? 'hover:border-red-500/30' : 'hover:border-blue-500/30';

          return (
            <div 
              key={file.id} 
              className={`group flex items-center justify-between p-3 md:p-4 bg-gray-950/50 rounded-xl border border-gray-800 ${borderColor} transition-all`}
            >
              <div className="min-w-0 flex-1 pr-3"> 
                <div className="flex items-center gap-2 mb-0.5">
                    {/* Priority Dot */}
                    <span className={`w-1.5 h-1.5 rounded-full ${badgeColor} ${isUrgent ? 'animate-pulse' : ''} shrink-0`}></span>
                    <h4 className="text-white font-medium text-sm truncate">
                        {file.title}
                    </h4>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{file.creator_name?.split(' ')[0]}</span>
                    <span>•</span>
                    {/* Badge for Priority */}
                    <span className={isUrgent ? "text-red-400 font-bold" : "text-gray-500"}>
                        {file.priority}
                    </span>
                </div>
              </div>

              <Link 
                 href={`/dashboard/${role}/files/${file.id}`}
                 className="shrink-0 px-3 py-1.5 bg-gray-800 text-gray-300 text-xs font-bold rounded-lg border border-gray-700 hover:bg-white hover:text-black hover:border-white active:scale-95 transition-all"
              >
                 Review
              </Link>
            </div>
          );
        })
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
            <span className="text-xs leading-relaxed">Review incoming proposals daily. Urgent items appear at the top.</span>
        </div>
      </li>
      <li className="flex gap-3">
        <div className="bg-gray-800 p-2 rounded text-blue-500 shrink-0 h-fit"><FaCheckCircle /></div>
        <div>
            <strong className="text-gray-200 block mb-0.5">Verify & Forward</strong>
            <span className="text-xs leading-relaxed">Ensure budget availability and proper formatting before forwarding to ADOSA.</span>
        </div>
      </li>
    </ul>
  </div>
);