import { query } from "@/config/db";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import ScheduleClient from "./ScheduleClient";

export const revalidate = 60;

export default async function SchedulePage() {
  const eventsRes = await query("SELECT id, name, start_time, end_time, venue FROM ibcc_events ORDER BY start_time ASC");
  
  // Convert timestamps to string/number for passing to client component
  const events = eventsRes.rows.map(e => ({
    ...e,
    start_time: new Date(e.start_time).toISOString(),
    end_time: new Date(e.end_time).toISOString(),
  }));

  return (
    <>
      {/* Back Button for Desktop: Pinned to top-left of the screen */}
      <div className="hidden md:block absolute top-28 left-8 z-40">
        <Link href="/" className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg transition-colors shadow-md border border-gray-700 hover:border-gray-500">
          <FaArrowLeft size={14} /> Back to Home
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-8 pt-4 md:pt-8 md:mt-24 mt-8">
        
        {/* Back Button for Mobile: Centered above title */}
        <div className="flex md:hidden justify-center mb-6">
          <Link href="/" className="inline-flex items-center justify-center gap-2 text-gray-400 hover:text-white bg-gray-800 hover:bg-gray-700 px-4 py-2.5 rounded-lg transition-colors shadow-md border border-gray-700 hover:border-gray-500">
            <FaArrowLeft size={14} /> Back to Home
          </Link>
        </div>

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white">IBCC Event Schedule</h1>
        </div>

        <ScheduleClient events={events} />
      </div>
    </>
  );
}
