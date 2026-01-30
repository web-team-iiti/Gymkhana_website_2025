import React from "react";
import { query } from "@/config/db";
import { 
  FaUser, FaCalendarAlt, FaHistory, FaFilePdf, 
  FaExternalLinkAlt, FaCheckCircle, FaTimesCircle, FaDownload 
} from "react-icons/fa";
import ActionButtons from "./ActionButtons"; 

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

export default async function DosaFilePage({ params }) {
  const { id } = await params;
  const proposal = await getProposalDetails(id);
  const logs = await getProposalLogs(id);

  if (!proposal) return <div className="p-8 text-white">Proposal Not Found</div>;

  const isFinalized = ['APPROVED', 'REJECTED'].includes(proposal.current_stage);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 pb-20">
      
      {/* LEFT COLUMN: Details & PDF */}
      <div className="lg:col-span-8 space-y-6">
        
        {/* 1. Main Info Card */}
        <div className="bg-gray-900 border border-gray-800 p-5 md:p-8 rounded-2xl shadow-2xl relative overflow-hidden">
          {/* Background decoration */}
          <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none ${isFinalized ? 'bg-gray-500/10' : 'bg-green-500/10'}`}></div>
          
          <div className="relative z-10">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">{proposal.title}</h1>
            
            {/* --- FIX: Text Overflow Handling --- */}
            <div className="text-gray-300 leading-relaxed border-l-4 border-gray-700 pl-4 mb-6 text-sm md:text-base break-words whitespace-pre-wrap">
                {proposal.description}
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-6 border-t border-gray-800/50">
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

        {/* 2. PDF Viewer (Smart Responsive) */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden shadow-2xl relative group">
            <div className="flex items-center justify-between px-4 py-3 bg-gray-950 border-b border-gray-800">
                <div className="flex items-center gap-3">
                    <FaFilePdf className="text-red-500" />
                    <span className="text-xs font-bold text-gray-300 uppercase">Document</span>
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

            {/* Mobile: Big Button (Better UX than tiny iframe) */}
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

      {/* RIGHT COLUMN: Actions & History */}
      <div className="lg:col-span-4 space-y-6">
        
        {/* Action / Status Card */}
        {isFinalized ? (
            <div className={`p-6 rounded-2xl border flex flex-col items-center text-center ${
                proposal.current_stage === 'APPROVED' 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 ${
                     proposal.current_stage === 'APPROVED' ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                }`}>
                    {proposal.current_stage === 'APPROVED' ? <FaCheckCircle /> : <FaTimesCircle />}
                </div>
                <h3 className={`text-xl font-bold mb-1 ${proposal.current_stage === 'APPROVED' ? 'text-green-400' : 'text-red-400'}`}>
                    {proposal.current_stage}
                </h3>
                <p className="text-sm text-gray-400">
                    Finalized on {new Date(proposal.updated_at).toLocaleDateString()}.
                </p>
            </div>
        ) : (
            <ActionButtons proposalId={proposal.id} />
        )}

        {/* Timeline (Mobile optimized) */}
        <div className="bg-gray-900 border border-gray-800 p-5 rounded-2xl shadow-xl">
          <div className="flex items-center gap-2 mb-6 border-b border-gray-800 pb-4">
             <FaHistory className="text-gray-400" />
             <h3 className="text-white font-bold text-lg">History</h3>
          </div>
          <div className="space-y-6 relative pl-1">
            <div className="absolute left-[24px] top-4 bottom-4 w-[2px] bg-gray-800 z-0"></div>
            {logs.map((log, index) => (
                <div key={log.id} className="relative z-10 flex gap-3 md:gap-4">
                    {/* Date Bubble */}
                    <div className={`w-12 h-12 rounded-full border-4 border-gray-900 flex items-center justify-center shrink-0 shadow-lg z-10 ${
                        log.action === 'APPROVED' ? 'bg-green-600 text-white' :
                        log.action === 'REJECTED' ? 'bg-red-600 text-white' :
                        index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-500'
                    }`}>
                        <span className="text-[10px] md:text-xs font-bold">{new Date(log.timestamp).getDate()}</span>
                    </div>
                    
                    {/* Log Details */}
                    <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-300">{log.action}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                           <p className="text-xs text-gray-500 truncate">{log.actor_name}</p>
                           <span className="w-1 h-1 rounded-full bg-gray-700"></span>
                           <p className="text-[9px] text-yellow-600 uppercase font-bold tracking-wide truncate max-w-[80px] md:max-w-none">
                              {log.actor_role?.replace('_', ' ')}
                           </p>
                        </div>
                        {log.remark && (
                           <div className="mt-2 text-xs text-gray-400 italic bg-gray-950 p-2 rounded border border-gray-800 break-words">
                              "{log.remark}"
                           </div>
                        )}
                    </div>
                </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}