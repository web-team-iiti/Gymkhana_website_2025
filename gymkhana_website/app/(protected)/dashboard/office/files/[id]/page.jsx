import React from "react";
import Link from "next/link"; // Added Link
import { query } from "@/config/db";
import { 
    FaUser, FaClock, FaCalendarAlt, FaHistory, FaFileAlt, 
    FaFilePdf, FaExternalLinkAlt, FaArrowLeft // Added FaArrowLeft
} from "react-icons/fa";
import ActionButtons from "./ActionButton";

// 1. Fetch Proposal Details
async function getProposalDetails(id) {
    const sql = `
    SELECT p.*, u.name as creator_name, u.email as creator_email
    FROM proposals p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.id = $1
  `;
    const res = await query(sql, [id]);
    return res.rows[0];
}

// 2. Fetch History Logs
async function getProposalLogs(id) {
    const sql = `
    SELECT l.*, u.name as actor_name 
    FROM proposal_logs l
    LEFT JOIN users u ON l.action_by = u.id
    WHERE l.proposal_id = $1
    ORDER BY l.timestamp DESC
  `;
    const res = await query(sql, [id]);
    return res.rows;
}

export default async function ReviewPage({ params }) {
    const { id } = await params;
    const proposal = await getProposalDetails(id);
    const logs = await getProposalLogs(id);

    if (!proposal) return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-gray-400 p-6 text-center">
            <FaFileAlt className="text-5xl md:text-6xl mb-4 opacity-20" />
            <h2 className="text-xl font-bold">Proposal Not Found</h2>
            <p className="text-sm">The document you are looking for does not exist.</p>
            {/* Back button for empty state too */}
            <Link href="/dashboard/office/files" className="mt-6 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700">
                Go Back
            </Link>
        </div>
    );

    const getPriorityColor = (p) => {
        if (p === 'URGENT') return 'bg-red-500 text-white shadow-red-500/50';
        if (p === 'HIGH') return 'bg-orange-500 text-white shadow-orange-500/50';
        return 'bg-blue-500 text-white shadow-blue-500/50';
    };

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 pb-20"> {/* Added pb-20 for scrolling space */}

            {/* --- 🔙 BACK BUTTON --- */}
            <div className="mb-6">
                <Link 
                    href="/dashboard/office/files" 
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors group text-sm font-medium"
                >
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center group-hover:bg-gray-700 transition-all">
                        <FaArrowLeft className="group-hover:-translate-x-0.5 transition-transform" size={12} />
                    </div>
                    <span>Back to Pending Files</span>
                </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

                {/* LEFT COLUMN: Details & PDF */}
                <div className="lg:col-span-8 space-y-6">

                    {/* Header Card */}
                    <div className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                        <div className="relative z-10">
                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                                <h1 className="text-2xl md:text-4xl font-extrabold text-white tracking-tight leading-snug">
                                    {proposal.title}
                                </h1>
                                <div className="self-start md:self-auto">
                                    <span className={`px-3 md:px-4 py-1.5 rounded-full text-[10px] md:text-xs font-bold shadow-lg tracking-wider ${getPriorityColor(proposal.priority)}`}>
                                        {proposal.priority}
                                    </span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-base md:text-lg leading-relaxed border-l-4 border-yellow-500/50 pl-4 mb-6 md:mb-8">
                                {proposal.description}
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-800/50">
                                <div className="flex items-center gap-3 bg-gray-950/30 p-3 rounded-xl border border-gray-800/50">
                                    <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                                        <FaUser />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Submitted By</p>
                                        <p className="text-sm font-semibold text-white truncate">{proposal.creator_name || "Unknown"}</p>
                                        <p className="text-xs text-gray-500 truncate">{proposal.creator_email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 bg-gray-950/30 p-3 rounded-xl border border-gray-800/50">
                                    <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0">
                                        <FaCalendarAlt />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">Submission Date</p>
                                        <p className="text-sm font-semibold text-white">{new Date(proposal.created_at).toLocaleDateString()}</p>
                                        <p className="text-xs text-gray-500">{new Date(proposal.created_at).toLocaleTimeString()}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PDF Viewer */}
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group transition-all duration-300 hover:shadow-yellow-500/10 hover:border-gray-700">
                        <div className="flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
                            <div className="flex items-center gap-3">
                                <div className="bg-red-500/10 p-1.5 rounded-md border border-red-500/20">
                                    <FaFilePdf className="text-red-500 text-sm" />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-gray-300 uppercase tracking-widest">Document</span>
                                    <span className="text-[10px] text-gray-600 font-mono">
                                        <span className="md:hidden">External Viewer</span>
                                        <span className="hidden md:inline">Preview Mode</span>
                                    </span>
                                </div>
                            </div>
                            <a href={proposal.pdf_url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-gray-900 border border-gray-800 text-gray-400 text-xs font-medium hover:text-white hover:border-gray-600 transition-all">
                                <span>Open</span>
                                <FaExternalLinkAlt className="text-[10px]" />
                            </a>
                        </div>

                        {/* Mobile Placeholder */}
                        <div className="md:hidden h-[300px] flex flex-col items-center justify-center bg-gray-900 p-6 text-center">
                            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 shadow-inner border border-gray-700">
                                <FaFilePdf className="text-3xl text-gray-500" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">PDF Preview Unavailable</h3>
                            <p className="text-gray-500 text-xs mb-6 max-w-[250px] leading-relaxed">
                                Mobile browsers cannot verify secure documents inside this window.
                            </p>
                            <a href={proposal.pdf_url} target="_blank" className="bg-yellow-500 text-gray-900 px-6 py-3 rounded-xl font-bold text-sm shadow-lg flex items-center gap-2">
                                <span>View Full Document</span>
                                <FaExternalLinkAlt />
                            </a>
                        </div>

                        {/* Desktop Iframe */}
                        <div className="hidden md:flex relative h-[800px] bg-gray-800 w-full overflow-hidden flex-col">
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-600 z-0">
                                <FaFilePdf className="text-4xl mb-3 opacity-20 animate-pulse" />
                                <p className="text-xs font-mono opacity-50">Loading Secure Document...</p>
                            </div>
                            <iframe
                                src={`${proposal.pdf_url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                className="relative z-10 w-full h-full [&::-webkit-scrollbar]:hidden"
                                title="Proposal PDF"
                                loading="lazy"
                            />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Actions & Timeline */}
                <div className="lg:col-span-4 space-y-6">
                    <ActionButtons proposalId={proposal.id} />

                    <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
                        <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                            <FaHistory className="text-gray-400" />
                            <h3 className="text-white font-bold text-lg">Tracking History</h3>
                        </div>

                        <div className="space-y-0 relative pl-2">
                            {logs.length > 0 && (
                                <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-gray-800 z-0"></div>
                            )}

                            {logs.length === 0 ? (
                                <div className="text-center py-8 text-gray-500 italic">No activity yet.</div>
                            ) : (
                                logs.map((log, index) => (
                                    <div key={log.id} className="relative z-10 flex gap-4 mb-8 last:mb-0 group">
                                        <div className={`w-14 h-14 rounded-full border-4 border-gray-900 flex items-center justify-center shrink-0 shadow-lg ${index === 0 ? 'bg-yellow-500 text-black scale-110' : 'bg-gray-800 text-gray-400'}`}>
                                            <span className="text-xs font-bold">{new Date(log.timestamp).getDate()}</span>
                                        </div>
                                        <div className="pt-1 w-full min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-1 sm:gap-0">
                                                <p className={`font-bold text-sm ${index === 0 ? 'text-white' : 'text-gray-400'}`}>
                                                    {log.action}
                                                </p>
                                                <span className="text-[10px] bg-gray-800 px-2 py-0.5 rounded text-gray-400 font-mono w-fit">
                                                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </span>
                                            </div>
                                            {log.new_stage && (
                                                <div className="text-[10px] text-blue-400 font-mono mt-1 mb-1 bg-blue-500/10 inline-block px-1.5 rounded border border-blue-500/20">
                                                    {log.new_stage}
                                                </div>
                                            )}
                                            <p className="text-gray-600 text-xs mb-2">by {log.actor_name || "System"}</p>
                                            {log.remark && (
                                                <div className="bg-gray-950 p-3 rounded-lg border border-gray-800 text-gray-300 text-xs italic relative mt-2 break-words">
                                                    <div className="absolute -top-2 left-4 w-3 h-3 bg-gray-950 border-t border-l border-gray-800 rotate-45"></div>
                                                    "{log.remark}"
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}