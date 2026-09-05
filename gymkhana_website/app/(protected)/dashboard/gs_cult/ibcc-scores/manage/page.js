import { auth } from "@/auth";
import { query } from "@/config/db";
import ManageScoresClient from "./ManageScoresClient";

export default async function ManageScoresPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_cult") {
    return <div className="text-red-400 p-8">Access Denied. Only GS Cultural can access this page.</div>;
  }

  // Fetch all previously submitted scores
  const scoresRes = await query(`
    SELECT s.event_id, s.contingent_id, s.score, s.judging_sheet_url, e.name as event_name, c.name as contingent_name
    FROM ibcc_scores s
    JOIN ibcc_events e ON s.event_id = e.id
    JOIN ibcc_contingents c ON s.contingent_id = c.id
    ORDER BY e.name, s.score DESC
  `);
  
  const submittedScores = scoresRes.rows;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 sm:space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Manage Submitted Scores</h1>
        <p className="text-gray-400">Review, edit, or delete scores that have been submitted.</p>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <ManageScoresClient initialScores={submittedScores} />
      </div>
    </div>
  );
}
