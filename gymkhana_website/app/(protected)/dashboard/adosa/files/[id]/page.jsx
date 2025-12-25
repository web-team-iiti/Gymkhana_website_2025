import React from "react";
import { query } from "@/config/db";
import { FaUser, FaCalendarAlt, FaHistory, FaFileAlt, FaExternalLinkAlt, FaFilePdf } from "react-icons/fa";
import ActionButtons from "./ActionButtons"; // Local Action Component

// Fetch Proposal Details
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

// Fetch History Logs
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

export default async function AdosaReviewPage({ params }) {
    const { id } = await params;

    const proposal = await getProposalDetails(id);
    const logs = await getProposalLogs(id);

    if (!proposal) return <div className="p-8 text-center text-gray-500">Proposal Not Found</div>;

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">

            {/* LEFT COLUMN: Details & PDF */}
            <div className="lg:col-span-8 space-y-6">

                {/* Header Card */}
                <div className="bg-gray-900 border border-gray-800 p-6 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-40 md:w-64 h-40 md:h-64 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

                    <div className="relative z-10">
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-2">{proposal.title}</h1>
                        <p className="text-gray-300 leading-relaxed border-l-4 border-purple-500/50 pl-4 mb-6">
                            {proposal.description}
                        </p>

                        {/* Metadata */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-gray-800/50">
                            <div className="flex items-center gap-3 bg-gray-950/30 p-3 rounded-xl border border-gray-800/50">
                                <div className="w-10 h-10 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0"><FaUser /></div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Submitted By</p>
                                    <p className="text-sm font-semibold text-white truncate">{proposal.creator_name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 bg-gray-950/30 p-3 rounded-xl border border-gray-800/50">
                                <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 shrink-0"><FaCalendarAlt /></div>
                                <div>
                                    <p className="text-[10px] text-gray-500 uppercase font-bold">Date</p>
                                    <p className="text-sm font-semibold text-white">{new Date(proposal.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Responsive PDF Viewer (Your New Code) */}
                <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
                        <div className="flex items-center gap-3">
                            <FaFilePdf className="text-red-500" />
                            <span className="text-xs font-bold text-gray-300 uppercase">Document Preview</span>
                        </div>
                        <a href={proposal.pdf_url} target="_blank" className="text-xs text-gray-400 hover:text-white flex items-center gap-2 border border-gray-700 px-3 py-1 rounded">
                            Open <FaExternalLinkAlt size={10} />
                        </a>
                    </div>

                    {/* Mobile View */}
                    <div className="md:hidden h-[300px] flex flex-col items-center justify-center p-6 text-center">
                        <p className="text-gray-500 text-xs mb-4">Mobile preview unavailable.</p>
                        <a href={proposal.pdf_url} target="_blank" className="bg-purple-600 text-white px-6 py-2 rounded-lg font-bold text-sm">View Document</a>
                    </div>

                    {/* Desktop View */} 
                    <div className="hidden md:block relative h-[700px] bg-gray-800 w-full overflow-hidden">
                        <iframe
                            // removed the width calculation hack
                            src={`${proposal.pdf_url}#toolbar=0&navpanes=0&view=FitH`}
                            className="w-full h-full border-none"
                            title="Proposal PDF"
                        />
                    </div>
                </div>
            </div>

            {/* RIGHT COLUMN: Actions & History */}
            <div className="lg:col-span-4 space-y-6">
                {/* The Action Buttons (Approve/Reject) */}
                <ActionButtons proposalId={proposal.id} />

                {/* Timeline */}
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl">
                    <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
                        <FaHistory className="text-gray-400" />
                        <h3 className="text-white font-bold text-lg">Tracking History</h3>
                    </div>
                    <div className="space-y-6 relative pl-2">
                        <div className="absolute left-[29px] top-4 bottom-4 w-[2px] bg-gray-800 z-0"></div>
                        {logs.map((log, index) => (
                            <div key={log.id} className="relative z-10 flex gap-4">
                                <div className={`w-14 h-14 rounded-full border-4 border-gray-900 flex items-center justify-center shrink-0 shadow-lg ${index === 0 ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                    <span className="text-xs font-bold">{new Date(log.timestamp).getDate()}</span>
                                </div>
                                <div>
                                    <p className="font-bold text-sm text-gray-300">{log.action}</p>
                                    <p className="text-xs text-gray-500">{log.actor_name}</p>
                                    {log.remark && <p className="text-xs text-gray-400 italic mt-1">"{log.remark}"</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}