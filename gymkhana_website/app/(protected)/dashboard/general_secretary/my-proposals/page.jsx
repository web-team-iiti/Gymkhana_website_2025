import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { query } from "@/config/db";
import { 
  FaFilePdf, FaEye, FaClock, FaCheckCircle, FaTimesCircle, 
  FaSpinner, FaUndo, FaPlus, FaFileAlt 
} from "react-icons/fa";
import SearchInput from "./SearchInput";

// 1. Fetch Proposals (With Search Support)
async function getMyProposals(userId, searchTerm) {
  let sql = `
    SELECT * FROM proposals 
    WHERE created_by = $1
  `;
  const params = [userId];

  if (searchTerm) {
    sql += ` AND title ILIKE $2`; 
    params.push(`%${searchTerm}%`);
  }

  sql += ` ORDER BY created_at DESC`;

  const result = await query(sql, params);
  return result.rows;
}

// 2. Fetch Global Stats
async function getGlobalStats(userId) {
    const sql = `
        SELECT
            COUNT(*) as total,
            COUNT(*) FILTER (WHERE current_stage = 'APPROVED') as approved,
            COUNT(*) FILTER (WHERE current_stage = 'REJECTED') as rejected
        FROM proposals WHERE created_by = $1
    `;
    const res = await query(sql, [userId]);
    return res.rows[0];
}

const getStatusBadge = (stage) => {
    switch (stage) {
        case 'OFFICE_REVIEW': return { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: <FaClock />, label: 'Office Review' };
        case 'ADOSA_REVIEW': return { color: 'bg-purple-500/20 text-purple-400 border-purple-500/50', icon: <FaSpinner className="animate-spin" />, label: 'ADOSA Review' };
        case 'DOSA_REVIEW': return { color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', icon: <FaSpinner className="animate-spin" />, label: 'Dean Review' };
        case 'APPROVED': return { color: 'bg-green-500/20 text-green-400 border-green-500/50', icon: <FaCheckCircle />, label: 'Approved' };
        case 'REJECTED': return { color: 'bg-red-500/20 text-red-400 border-red-500/50', icon: <FaTimesCircle />, label: 'Rejected' };
        case 'NEEDS_CORRECTION': return { color: 'bg-orange-500/20 text-orange-400 border-orange-500/50', icon: <FaUndo />, label: 'Needs Correction' };
        default: return { color: 'bg-gray-700 text-gray-400 border-gray-600', icon: <FaClock />, label: stage };
    }
};

export default async function MyProposalsPage({ searchParams }) {
    const session = await auth();
    const resolvedParams = await searchParams;
    const q = resolvedParams?.query || "";

    const [proposals, stats] = await Promise.all([
        getMyProposals(session.user.id, q),
        getGlobalStats(session.user.id)
    ]);

    const pending = parseInt(stats.total) - parseInt(stats.approved) - parseInt(stats.rejected);

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto pb-20">

            {/* --- COMPACT HEADER ROW --- */}
            <div className="flex flex-row items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-white">My Proposals</h1>
                    <p className="text-xs md:text-base text-gray-400 mt-0.5">Track your submitted files.</p>
                </div>
                
                {/* Responsive Button: Icon only on Mobile, Full text on Desktop */}
                <Link
                    href="/dashboard/general_secretary/create"
                    className="flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 p-2.5 md:px-5 md:py-2.5 rounded-xl font-bold hover:bg-yellow-400 active:scale-95 transition-all shadow-lg shadow-yellow-500/10"
                    title="Create New Proposal"
                >
                    <FaPlus className="text-lg md:text-base" /> 
                    <span className="hidden md:inline">New Proposal</span>
                </Link>
            </div>

            {/* --- MINI STATS OVERVIEW --- */}
            <div className="grid grid-cols-4 gap-2 md:gap-4 mb-6 md:mb-8">
                <StatBox label="Total" value={stats.total} icon={<FaFileAlt />} color="text-blue-400" bg="bg-blue-500/10" border="border-blue-500/20" />
                <StatBox label="Pending" value={pending} icon={<FaClock />} color="text-yellow-400" bg="bg-yellow-500/10" border="border-yellow-500/20" />
                <StatBox label="Approved" value={stats.approved} icon={<FaCheckCircle />} color="text-green-400" bg="bg-green-500/10" border="border-green-500/20" />
                <StatBox label="Rejected" value={stats.rejected} icon={<FaTimesCircle />} color="text-red-400" bg="bg-red-500/10" border="border-red-500/20" />
            </div>

            {/* --- SEARCH BAR --- */}
            <div className="mb-4 md:mb-6">
                <SearchInput />
            </div>

            {/* --- THE LIST --- */}
            <div className="space-y-3 md:space-y-4">
                {proposals.length === 0 ? (
                    <div className="text-center py-12 md:py-16 bg-gray-900 rounded-2xl border border-gray-800">
                        <div className="bg-gray-800 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 text-gray-600">
                            <FaFileAlt size={20} className="md:hidden" />
                            <FaFileAlt size={24} className="hidden md:block" />
                        </div>
                        <h3 className="text-white font-bold text-base md:text-lg">
                            {q ? `No results for "${q}"` : "No proposals yet"}
                        </h3>
                        {!q && (
                            <Link href="/dashboard/general_secretary/create" className="text-yellow-500 hover:text-white underline text-xs md:text-sm mt-2 inline-block">
                                Create one now
                            </Link>
                        )}
                    </div>
                ) : (
                    proposals.map((item) => {
                        const status = getStatusBadge(item.current_stage);

                        return (
                            <div key={item.id} className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-xl hover:border-gray-700 transition-all group">
                                <div className="flex flex-col md:flex-row gap-4">

                                    {/* Left: Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 md:gap-3 mb-1.5 md:mb-2">
                                            <span className={`flex items-center gap-1 px-2 py-0.5 md:px-2.5 md:py-1 rounded-full text-[10px] md:text-xs font-bold border ${status.color}`}>
                                                {status.icon}
                                                {status.label}
                                            </span>
                                            <span className="text-gray-600 text-[10px] md:text-xs font-mono">#{item.id.slice(0, 8)}</span>
                                        </div>

                                        <h3 className="text-base md:text-xl font-bold text-white group-hover:text-yellow-500 transition-colors truncate">
                                            {item.title}
                                        </h3>
                                        
                                        <p className="text-gray-400 text-xs md:text-sm mt-0.5 md:mt-1 line-clamp-1">
                                            {item.description}
                                        </p>
                                        
                                        <p className="text-gray-600 text-[10px] md:text-xs mt-2 md:mt-3 flex items-center gap-1">
                                            <FaClock className="text-gray-700" /> {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="flex items-center gap-2 mt-2 md:mt-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-800">
                                        <a
                                            href={item.pdf_url}
                                            target="_blank"
                                            className="flex-1 md:flex-none flex items-center justify-center p-2.5 md:p-3 bg-gray-800 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition-colors"
                                        >
                                            <FaFilePdf size={16} />
                                            <span className="md:hidden ml-2 text-xs font-bold">PDF</span>
                                        </a>
                                        
                                        <Link
                                            href={`/dashboard/general_secretary/my-proposals/${item.id}`}
                                            className="flex-[3] md:flex-none px-4 py-2.5 md:px-5 md:py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-xs md:text-sm font-bold hover:bg-gray-700 flex items-center justify-center gap-2 transition-all active:scale-95"
                                        >
                                            <FaEye /> Track
                                        </Link>
                                    </div>

                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
}

// Compact Stat Component (Optimized for Mobile)
const StatBox = ({ label, value, icon, color, bg, border }) => (
    <div className={`p-2 md:p-4 rounded-xl border ${border} ${bg} flex flex-col items-center justify-center text-center`}>
        {/* Tiny Icon on Mobile */}
        <div className={`text-base md:text-2xl mb-0.5 md:mb-1 ${color}`}>{icon}</div>
        {/* Compact Number */}
        <div className="text-lg md:text-3xl font-bold text-white leading-tight">{value}</div>
        {/* Small Label */}
        <div className={`text-[8px] md:text-xs uppercase font-bold tracking-wider ${color}`}>{label}</div>
    </div>
);