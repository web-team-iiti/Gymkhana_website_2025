import { auth } from "@/auth";
import { query } from "@/config/db";
import ContentionForm from "./ContentionForm";

export default async function ContingentLeaderIBCCPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "contingent_leader") {
    return <div className="text-red-400 p-8">Access Denied. Only Contingent Leaders can access this page.</div>;
  }

  const contingentId = session.user.contingent_id;
  const contingentName = session.user.contingent_name;

  if (!contingentId) {
    return <div className="p-6 text-gray-400">No contingent assigned to your account. Please contact GS.</div>;
  }

  // Fetch scores for this contingent
  const scoresRes = await query(`
    SELECT s.id, s.score, s.judging_sheet_url, e.name as event_name,
           c.status as contention_status, c.resolution_notes
    FROM ibcc_scores s
    JOIN ibcc_events e ON s.event_id = e.id
    LEFT JOIN ibcc_contentions c ON c.score_id = s.id AND c.contingent_id = $1
    WHERE s.contingent_id = $1
    ORDER BY e.start_time DESC
  `, [contingentId]);
  
  const scores = scoresRes.rows;

  // Calculate stats
  const totalScore = scores.reduce((sum, s) => sum + parseFloat(s.score || 0), 0);
  const activeContentions = scores.filter(s => s.contention_status && s.contention_status.toLowerCase() !== 'resolved').length;

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-gradient-to-r from-gray-900 to-gray-950 border border-gray-800 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <svg className="w-48 h-48 text-yellow-500" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"></path></svg>
        </div>
        
        <div className="z-10">
          <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">IBCC Dashboard</h1>
          <p className="text-gray-400 text-lg">Managing: <span className="font-bold text-yellow-500">{contingentName}</span></p>
        </div>

        <div className="flex gap-4 z-10">
          <div className="bg-gray-950/50 backdrop-blur-md border border-gray-800 rounded-2xl p-4 min-w-[120px] text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Total Points</p>
            <p className="text-3xl font-black text-white">{totalScore}</p>
          </div>
          <div className="bg-gray-950/50 backdrop-blur-md border border-gray-800 rounded-2xl p-4 min-w-[120px] text-center">
            <p className="text-sm text-gray-500 font-medium mb-1">Contentions</p>
            <p className="text-3xl font-black text-red-400">{activeContentions}</p>
          </div>
        </div>
      </div>
      
      {/* SCORES LIST */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
            Event Scores
          </h2>
        </div>

        {scores.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 border-dashed p-12 rounded-3xl text-center flex flex-col items-center">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4M12 20V4"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No Scores Yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">Events are still ongoing or the judging sheets haven't been processed by the club heads yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {scores.map(score => (
              <div key={score.id} className="bg-gray-900 border border-gray-800 rounded-2xl p-6 flex flex-col justify-between hover:border-gray-700 hover:shadow-lg transition-all group relative overflow-hidden">
                {/* Visual accent line */}
                <div className="absolute top-0 left-0 w-1 h-full bg-blue-500/20 group-hover:bg-blue-500 transition-colors"></div>
                
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">{score.event_name}</h3>
                    <div className="mt-2 inline-flex items-center gap-2 bg-gray-950 border border-gray-800 px-3 py-1.5 rounded-lg">
                      <span className="text-sm text-gray-400">Awarded Points:</span>
                      <span className="font-bold text-yellow-500 text-lg">{score.score}</span>
                    </div>
                  </div>
                  
                  <a href={score.judging_sheet_url} target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-white bg-blue-500/10 hover:bg-blue-600 px-4 py-2 rounded-xl transition-all shadow-sm">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd"></path></svg>
                    View Sheet
                  </a>
                </div>

                <div className="pt-4 border-t border-gray-800/50 mt-auto">
                  {score.contention_status ? (
                    score.contention_status.toLowerCase() === 'resolved' ? (
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-center gap-2 bg-green-500/10 text-green-500 border border-green-500/20 p-3 rounded-xl text-sm font-bold shadow-inner">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                          Contention Resolved
                        </div>
                        {score.resolution_notes && (
                          <div className="bg-gray-950 border border-gray-800 rounded-lg p-3 mt-1">
                            <span className="text-xs text-gray-500 uppercase font-bold block mb-1">GS Response</span>
                            <p className="text-sm text-gray-300 italic">"{score.resolution_notes}"</p>
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 p-3 rounded-xl text-sm font-bold shadow-inner">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
                        Contention Under Review
                      </div>
                    )
                  ) : (
                    <ContentionForm scoreId={score.id} />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
