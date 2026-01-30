import React from "react";
import { query } from "@/config/db";
import PublicEventDetails from "@/components/PublicEventDetails";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
 
async function getEvent(id) {
  try { 
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) return null;

    const sql = `SELECT * FROM events WHERE id = $1`;
    const res = await query(sql, [id]);
    return res.rows[0];
  } catch (error) {
    console.error("Error fetching event:", error);
    return null;
  }
}

export default async function EventPage({ params }) {
  const { eventId } = await params;
  const event = await getEvent(eventId);

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white gap-4">
        <h1 className="text-3xl font-bold text-red-500">Event Not Found</h1>
        <p className="text-gray-400">The event you are looking for does not exist or has been removed.</p>
        <Link
          href="/events"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-full font-bold transition-all"
        >
          <FaArrowLeft /> Back to Events
        </Link>
      </div>
    );
  }

  return <PublicEventDetails event={event} />;
}