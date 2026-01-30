import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { 
  FaUser, FaCalendarAlt, FaHistory, FaFilePdf, 
  FaArrowLeft, FaExternalLinkAlt, FaExclamationCircle, 
  FaEdit, FaCheckCircle, FaTimesCircle, FaDownload 
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

// 2. Fetch History Logs
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

  if (!proposal) return <div className="p-8 text-white">Not Found</div>;

  const isApproved = proposal.current_stage === 'APPROVED';
  const isRejected = proposal.current_stage === 'REJECTED';
  const needsCorrection = proposal.current_stage === 'NEEDS_CORRECTION';
  const isFinalized = isApproved || isRejected;

  // Reusable Status Card Component
  const StatusCard = ({ className }) => (
    <div className={`p-6 rounded-2xl border flex flex-col items-center text-center shadow-xl ${
        isApproved ? 'bg-green-500/10 border-green-500/30' : 'bg-red-500/10 border-red-500/30'
    } ${className}`}>
        <div className={`w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center text-2xl md:text-3xl mb-3 md:mb-4 ${
             isApproved ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
        }`}>
            {isApproved ? <FaCheckCircle /> : <FaTimesCircle />}
        </div>
        <h3 className={`text-lg md:text-xl font-bold mb-1 ${isApproved ? 'text-green-400' : 'text-red-400'}`}>
            {isApproved ? 'Approved' : 'Rejected'}
        </h3>
        <p className="text-xs md:text-sm text-gray-400">
            Finalized on {new Date(proposal.updated_at).toLocaleDateString()}
        </p>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-20">
      
      {/* Back Button */}
      <Link href="/dashboard/general_secretary/my-proposals" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors text-sm">
        <FaArrowLeft /> Back to List
      </Link>

      {/* --- MOBILE: STATUS ON TOP --- */}
      {isFinalized && (
        <div className="md:hidden mb-6">
            <StatusCard />
        </div>
      )}

      {/* --- ACTION REQUIRED BANNER (Full Width) --- */}
      {needsCorrection && (
        <div className="mb-8 bg-orange-500/10 border border-orange-500/30 p-4 md:p-5 rounded-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start gap-3">
                <div className="bg-orange-500 p-2 md:p-3 rounded-full text-white animate-pulse shrink-0 mt-1 md:mt-0">
                    <FaExclamationCircle size={18} />
                </div>
                <div>
                    <h3 className="text-orange-400 font-bold text-base md:text-lg">Action Required</h3>
                    <p className="text-orange-200/70 text-xs md:text-sm mt-1">
                        Reverted by office. Check remarks and correct.
                    </p>
                </div>
            </div>
            <Link 
                href={`/dashboard/general_secretary/edit/${proposal.id}`}
                className="w-full md:w-auto bg-orange-500 hover:bg-orange-400 text-white px-5 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-orange-500/20 text-sm md:text-base"
            >
                <FaEdit /> Correct & Resubmit
            </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
        
        {/* --- LEFT COLUMN: DETAILS & PDF (lg:col-span-8) --- */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-gray-900 border border-gray-800 p-5 md:p-8 rounded-2xl shadow-xl">
             <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3">{proposal.title}</h1>
             <div className="text-gray-300 text-sm md:text-base leading-relaxed border-l-4 border-yellow-500 pl-4 mb-6 break-words whitespace-pre-wrap">
                {proposal.description}
             </div>
             
             {/* Metadata */}
             <div className="flex flex-col md:flex-row gap-3 md:gap-6 text-xs md:text-sm text-gray-500 pt-4 border-t border-gray-800/50">
                <div className="flex items-center gap-2"><FaUser className="text-gray-600"/> {proposal.creator_name}</div>
                <div className="flex items-center gap-2"><FaCalendarAlt className="text-gray-600"/> {new Date(proposal.created_at).toLocaleDateString()}</div>
             </div>
          </div>

          {/* PDF Viewer */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
                <div className="flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
                    <div className="flex items-center gap-3">
                        <FaFilePdf className="text-red-500" />
                        <span className="text-xs font-bold text-gray-300 uppercase">Document Preview</span>
                    </div>
                    <a href={proposal.pdf_url} target="_blank" className="text-xs text-gray-400 hover:text-white flex items-center gap-2 border border-gray-700 px-3 py-1 rounded">
                        Open <FaExternalLinkAlt size={10}/>
                    </a>
                </div>

                {/* Desktop: Iframe */}
                <div className="hidden md:block relative h-[800px] bg-gray-800 w-full overflow-hidden">
                    <iframe 
                        src={`${proposal.pdf_url}#toolbar=0&navpanes=0&view=FitH`}
                        className="w-full h-full border-none"
                        title="Proposal PDF"
                    />
                </div>

                {/* Mobile: Big Button */}
                <div className="md:hidden p-8 flex flex-col items-center justify-center bg-gray-800/50 text-center">
                    <FaFilePdf size={48} className="text-gray-700 mb-4" />
                    <h3 className="text-white font-bold mb-2">Attached Proposal PDF</h3>
                    <p className="text-xs text-gray-400 mb-6 max-w-xs">Tap below to view the full document on your device.</p>
                    <a 
                       href={proposal.pdf_url} 
                       target="_blank"
                       className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-xl font-bold active:scale-95 transition-transform"
                    >
                       <FaDownload /> Download / View
                    </a>
                </div>
            </div>
        </div>

        {/* --- RIGHT COLUMN: STATUS & TIMELINE (lg:col-span-4) --- */}
        <div className="lg:col-span-4 space-y-6">

            {/* DESKTOP: STATUS ON SIDEBAR (Hidden on Mobile) */}
            {isFinalized && (
                <div className="hidden md:block">
                    <StatusCard />
                </div>
            )}

            {/* TIMELINE (Natural height: h-fit) */}
            <div className="bg-gray-900 border border-gray-800 p-5 md:p-6 rounded-2xl shadow-xl h-fit">
                <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
                    <FaHistory className="text-yellow-500" /> Approval Workflow
                </h3>

                <div className="relative border-l-2 border-gray-800 ml-3 space-y-8 pb-4">
                    {logs.length === 0 && <p className="text-gray-500 text-sm ml-6">No activity yet.</p>}
                    
                    {logs.map((log) => (
                        <div key={log.id} className="relative ml-6">
                            {/* Dot */}
                            <div className={`absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full border-2 border-gray-900 shadow ${
                                log.action === 'APPROVED' ? 'bg-green-500 shadow-green-500/50' : 
                                log.action === 'REJECTED' ? 'bg-red-500 shadow-red-500/50' : 
                                log.action === 'REVERT' ? 'bg-orange-500 shadow-orange-500/50' : 'bg-blue-500 shadow-blue-500/50'
                            }`}></div>

                            {/* Content */}
                            <div className="flex flex-col">
                                <span className="text-[10px] text-gray-500 font-mono mb-0.5">{new Date(log.timestamp).toLocaleDateString()}</span>
                                <h4 className="text-white font-bold text-sm">
                                    {log.action} <span className="font-normal text-gray-400 text-xs">by</span> <span className="text-yellow-500 text-xs uppercase">{log.actor_role?.replace('_', ' ')}</span>
                                </h4>
                            </div>
                            
                            {/* THE REMARK */}
                            {log.remark && (
                                <div className="mt-2 bg-gray-950 p-3 rounded-lg border border-gray-800 text-gray-400 text-xs italic break-words">
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