import React from "react";
import Link from "next/link";
import { auth } from "@/auth";
import { query } from "@/config/db";
import { FaFilePdf, FaEye, FaClock, FaCheckCircle, FaTimesCircle, FaSpinner, FaUndo } from "react-icons/fa";

// Fetch proposals created by the current user
async function getMyProposals(userId) {
    const sql = `
    SELECT * FROM proposals 
    WHERE created_by = $1 
    ORDER BY created_at DESC
  `;
    const result = await query(sql, [userId]);
    return result.rows;
}

// Helper: Get Badge Color & Label based on stage
const getStatusBadge = (stage) => {
    switch (stage) {
        case 'OFFICE_REVIEW':
            return { color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50', icon: <FaClock />, label: 'Office Review' };
        case 'ADOSA_REVIEW':
            return { color: 'bg-purple-500/20 text-purple-400 border-purple-500/50', icon: <FaSpinner className="animate-spin" />, label: 'ADOSA Review' };
        case 'DOSA_REVIEW':
            return { color: 'bg-blue-500/20 text-blue-400 border-blue-500/50', icon: <FaSpinner className="animate-spin" />, label: 'Dean Review' };
        case 'APPROVED':
            return { color: 'bg-green-500/20 text-green-400 border-green-500/50', icon: <FaCheckCircle />, label: 'Approved' };
        case 'REJECTED':
            return { color: 'bg-red-500/20 text-red-400 border-red-500/50', icon: <FaTimesCircle />, label: 'Rejected' };
        case 'NEEDS_CORRECTION':
            return { color: 'bg-orange-500/20 text-orange-400 border-orange-500/50', icon: <FaUndo />, label: 'Needs Correction' };
        default:
            return { color: 'bg-gray-700 text-gray-400 border-gray-600', icon: <FaClock />, label: stage };
    }
};

export default async function MyProposalsPage() {
    const session = await auth();
    const proposals = await getMyProposals(session.user.id);

    return (
        <div className="p-4 md:p-8 max-w-6xl mx-auto">

            {/* Page Header */}
            <div className="flex items-end justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-white">My Proposals</h1>
                    <p className="text-gray-400 mt-2">Track the status of your submitted files.</p>
                </div>
                <Link
                    href="/dashboard/general_secretary/create"
                    className="hidden md:flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-lg font-bold hover:bg-yellow-400 transition-colors"
                >
                    + New Proposal
                </Link>
            </div>

            {/* The List */}
            <div className="grid gap-4">
                {proposals.length === 0 ? (
                    <div className="text-center py-20 bg-gray-900 rounded-2xl border border-gray-800">
                        <p className="text-gray-500 mb-4">You haven't submitted any proposals yet.</p>
                        <Link href="/dashboard/general_secretary/create" className="text-yellow-500 hover:underline">
                            Create your first proposal
                        </Link>
                    </div>
                ) : (
                    proposals.map((item) => {
                        const status = getStatusBadge(item.current_stage);

                        return (
                            <div key={item.id} className="bg-gray-900 border border-gray-800 p-6 rounded-xl hover:border-gray-700 transition-all group">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                                    {/* Left: Info */}
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            {/* STATUS BADGE */}
                                            <span className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border ${status.color}`}>
                                                {status.icon}
                                                {status.label}
                                            </span>
                                            <span className="text-gray-600 text-xs font-mono">#{item.id.slice(0, 8)}</span>
                                        </div>

                                        <h3 className="text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">
                                            {item.title}
                                        </h3>
                                        <p className="text-gray-400 text-sm mt-1 line-clamp-1">
                                            {item.description}
                                        </p>
                                        <p className="text-gray-600 text-xs mt-3 flex items-center gap-1">
                                            <FaClock /> Submitted on {new Date(item.created_at).toLocaleDateString()}
                                        </p>
                                    </div>

                                    {/* Right: Actions */}
                                    <div className="flex items-center gap-3">
                                        {/* View PDF */}
                                        <a
                                            href={item.pdf_url}
                                            target="_blank"
                                            className="p-3 bg-gray-800 text-gray-400 rounded-lg hover:text-white hover:bg-gray-700 transition-colors"
                                            title="View PDF"
                                        >
                                            <FaFilePdf size={18} />
                                        </a>
                                        <Link
                                            href={`/dashboard/general_secretary/my-proposals/${item.id}`} // <--- ADD LINK
                                            className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg text-sm font-bold hover:bg-gray-700 flex items-center gap-2 transition-all"
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