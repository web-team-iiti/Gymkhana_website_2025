import { auth } from "@/auth";
import { query } from "@/config/db";
import ClubHeadEventsClient from "./ClubHeadEventsClient";

export default async function ClubHeadEventsPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "club_head") {
    return <div className="text-red-400 p-8">Access Denied. Only Club Heads can access this page.</div>;
  }

  const clubId = session.user.club_id;

  // Fetch IBCC events assigned to this club
  const eventsRes = await query(`
    SELECT id, name, start_time, end_time, venue, club_id
    FROM ibcc_events 
    WHERE club_id = $1 
    ORDER BY start_time DESC
  `, [clubId]);

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 sm:space-y-8 pb-24">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">IBCC Events</h1>
        <p className="text-sm sm:text-base text-gray-400">View and edit events assigned to your club.</p>
      </div>
      
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-4 sm:p-6 shadow-lg">
        <ClubHeadEventsClient events={eventsRes.rows} />
      </div>
    </div>
  );
}
