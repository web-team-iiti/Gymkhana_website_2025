import { auth } from "@/auth";
import { query } from "@/config/db";
import ScoreForm from "./ScoreForm";

export default async function GSCultIBCCScoresPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_cult") {
    return <div className="text-red-400 p-8">Access Denied. Only GS Cultural can access this page.</div>;
  }

  // Fetch all IBCC events
  const eventsRes = await query("SELECT id, name FROM ibcc_events ORDER BY name ASC");
  const events = eventsRes.rows;

  // Fetch all contingents
  const contingentsRes = await query("SELECT id, name FROM ibcc_contingents");
  const contingents = contingentsRes.rows;

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 sm:space-y-8 pb-24">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">IBCC Score Submission</h1>
        <p className="text-gray-400">Upload signed judging sheets and assign points to contingents.</p>
      </div>
      
      {events.length === 0 ? (
        <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded">
          <p className="text-yellow-400">No IBCC events found.</p>
        </div>
      ) : (
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg">
          <ScoreForm events={events} contingents={contingents} />
        </div>
      )}
    </div>
  );
}
