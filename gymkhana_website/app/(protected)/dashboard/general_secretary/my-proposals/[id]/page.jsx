import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { 
  FaUser, 
  FaCalendarAlt, 
  FaHistory, 
  FaFilePdf, 
  FaArrowLeft, 
  FaExternalLinkAlt,
  FaExclamationCircle, // Added
  FaEdit               // Added
} from "react-icons/fa";

// 1. Fetch Proposal Details
async function getProposalDetails(id) {
  const sql = `
    SELECT p.*, u.name as creator_name
    FROM proposals p
    LEFT JOIN users u ON p.created_by = u.id
    WHERE p.id = $1
  `;
  const res = await query(sql, [id]);
  return res.rows[0];
}

// 2. Fetch History Logs (The Remarks)
async function getProposalLogs(id) {
  const sql = `
    SELECT l.*, u.name as actor_name, u.role as actor_role
    FROM proposal_logs l
    LEFT JOIN users u ON l.action_by = u.id
    WHERE l.proposal_id = $1
    ORDER BY l.timestamp DESC
  `;
  const res = await query(sql, [id]);
  return res.rows;
}

export default async function GSTrackingPage({ params }) {
  const { id } = await params;
  const proposal = await getProposalDetails(id);
  const logs = await getProposalLogs(id);

  if (!proposal) return <div>Not Found</div>;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8">
      
      {/* Back Button */}
      <Link href="/dashboard/general_secretary/my-proposals" className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
        <FaArrowLeft /> Back to List
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- 1. ACTION REQUIRED BANNER (Only if Needs Correction) --- */}
        {proposal.current_stage === 'NEEDS_CORRECTION' && (
            <div className="lg:col-span-3 bg-orange-500/10 border border-orange-500/30 p-4 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="bg-orange-500 p-3 rounded-full text-white animate-pulse">
                        <FaExclamationCircle size={20} />
                    </div>
                    <div>
                        <h3 className="text-orange-400 font-bold text-lg">Action Required</h3>
                        <p className="text-orange-300/70 text-sm">
                            This proposal was reverted by the office. Please check the remarks below and submit a correction.
                        </p>
                    </div>
                </div>
                <Link 
                    href={`/dashboard/general_secretary/edit/${proposal.id}`}
                    className="bg-orange-500 hover:bg-orange-400 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg shadow-orange-500/20 whitespace-nowrap"
                >
                    <FaEdit /> Correct & Resubmit
                </Link>
            </div>
        )}
        
        {/* --- 2. LEFT: Proposal Details --- */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-8 rounded-2xl shadow-xl">
             <h1 className="text-3xl font-bold text-white mb-4">{proposal.title}</h1>
             <p className="text-gray-300 leading-relaxed border-l-4 border-yellow-500 pl-4 mb-6">
                {proposal.description}
             </p>
             
             {/* Metadata */}
             <div className="flex gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2"><FaUser /> {proposal.creator_name}</div>
                <div className="flex items-center gap-2"><FaCalendarAlt /> {new Date(proposal.created_at).toLocaleDateString()}</div>
             </div>
          </div>

          {/* PDF Link */}
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="bg-red-500/10 p-3 rounded-lg"><FaFilePdf className="text-red-500 text-xl" /></div>
                <div>
                    <h3 className="text-white font-bold text-sm">Attached Document</h3>
                    <p className="text-gray-500 text-xs">PDF Format</p>
                </div>
             </div>
             <a href={proposal.pdf_url} target="_blank" className="text-yellow-500 hover:text-white flex items-center gap-2 text-sm font-bold border border-yellow-500/30 px-4 py-2 rounded-lg transition-all">
                View File <FaExternalLinkAlt />
             </a>
          </div>
        </div>

        {/* --- 3. RIGHT: The Remarks Timeline --- */}
        <div className="lg:col-span-1">
          <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl shadow-xl h-full">
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                <FaHistory className="text-yellow-500" /> Approval Workflow
            </h3>

            <div className="relative border-l-2 border-gray-800 ml-3 space-y-8">
                {logs.length === 0 && <p className="text-gray-500 text-sm ml-6">No activity yet.</p>}
                
                {logs.map((log) => (
                    <div key={log.id} className="relative ml-6">
                        {/* Dot */}
                        <div className={`absolute -left-[31px] top-0 w-4 h-4 rounded-full border-2 border-gray-900 ${
                            log.action === 'APPROVED' ? 'bg-green-500' : 
                            log.action === 'REJECTED' ? 'bg-red-500' : 
                            log.action === 'REVERT' ? 'bg-orange-500' : 'bg-blue-500'
                        }`}></div>

                        {/* Content */}
                        <p className="text-xs text-gray-500 mb-1">{new Date(log.timestamp).toLocaleString()}</p>
                        <h4 className="text-white font-bold text-sm">
                            {log.action} by <span className="text-yellow-500">{log.actor_role?.replace('_', ' ')}</span>
                        </h4>
                        
                        {/* THE REMARK */}
                        {log.remark && (
                            <div className="mt-2 bg-gray-800/50 p-3 rounded-lg border border-gray-700 text-gray-300 text-xs italic">
                                "{log.remark}"
                            </div>
                        )}
                    </div>
                ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}