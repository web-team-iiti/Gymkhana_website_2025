import { auth } from "@/auth";
import { query } from "@/config/db";
import AdminIBCCEvents from "@/components/ibcc/AdminIBCCEvents";

export default async function GSCultIBCCEventsPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_cult") {
    return <div>Access Denied.</div>;
  }

  // Fetch events
  const eventsRes = await query("SELECT * FROM ibcc_events ORDER BY start_time DESC");

  // Fetch clubs to assign events (Cultural Clubs only)
  const clubsRes = await query("SELECT club_id as id, club_name as name FROM clubs WHERE category = 'Cultural Clubs'");

  // Fetch pending contentions
  const contentionsRes = await query(`
    SELECT c.*, s.score, e.name as event_name, ct.name as contingent_name
    FROM ibcc_contentions c
    JOIN ibcc_scores s ON c.score_id = s.id
    JOIN ibcc_events e ON s.event_id = e.id
    JOIN ibcc_contingents ct ON c.contingent_id = ct.id
    WHERE c.status = 'pending'
  `);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6 pb-24">
      {/* Title is moved to AdminIBCCEvents component to share the same flex row as the Add button */}
      <AdminIBCCEvents 
        events={eventsRes.rows} 
        clubs={clubsRes.rows} 
        contentions={contentionsRes.rows}
      />
    </div>
  );
}
