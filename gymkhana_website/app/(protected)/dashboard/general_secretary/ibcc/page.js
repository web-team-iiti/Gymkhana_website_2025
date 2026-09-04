import { auth } from "@/auth";
import { query } from "@/config/db";
import AdminIBCCPanel from "@/components/ibcc/AdminIBCCPanel";

export default async function GSSntIBCCPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_snt") {
    return <div>Access Denied.</div>;
  }

  // Fetch events
  const eventsRes = await query("SELECT * FROM ibcc_events ORDER BY start_time DESC");
  
  // Fetch pending contentions
  const contentionsRes = await query(`
    SELECT c.*, s.score, e.name as event_name, ct.name as contingent_name
    FROM ibcc_contentions c
    JOIN ibcc_scores s ON c.score_id = s.id
    JOIN ibcc_events e ON s.event_id = e.id
    JOIN ibcc_contingents ct ON c.contingent_id = ct.id
    WHERE c.status = 'pending'
  `);

  // Fetch clubs to assign events (Tech Clubs only)
  const clubsRes = await query("SELECT club_id as id, club_name as name FROM clubs WHERE category IN ('Technical Clubs', 'Technical Teams')");

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">IBCC Super Admin (S&T)</h1>
        <p className="text-gray-400">Manage events and resolve contentions for IBCC.</p>
      </div>
      <AdminIBCCPanel 
        events={eventsRes.rows} 
        contentions={contentionsRes.rows} 
        clubs={clubsRes.rows} 
      />
    </div>
  );
}
