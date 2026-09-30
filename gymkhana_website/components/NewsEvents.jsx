"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaRegCalendarTimes,
} from "react-icons/fa";

const EventCard = ({ event }) => {
  const displayImage = event.image_urls?.[0];
  const formattedDate = new Date(event.event_date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#eadfd6] bg-white shadow-[0_2px_8px_rgba(60,39,27,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(60,39,27,0.12)]">
      <Link
        href={`/events/${event.id}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b96f65]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#f1e9e2]">
          {displayImage ? (
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              src={displayImage}
              alt={event.title}
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center text-[#b96f65]"
              aria-hidden="true"
            >
              <FaCalendarAlt size={30} />
            </div>
          )}
          <span className="absolute bottom-3 left-3 rounded bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#4a3933] shadow-sm">
            {formattedDate}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="mb-2 text-xs font-bold uppercase text-[#b96f65]">
            {event.subtitle || "Gymkhana event"}
          </p>
          <h3 className="text-lg font-semibold leading-snug text-[#192b35] line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-[#657078] line-clamp-3">
            {event.description ||
              "Join the campus community for this upcoming event."}
          </p>
          <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#263f4b]">
            Event details
            <FaArrowRight
              className="transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </span>
        </div>
      </Link>
    </article>
  );
};

// --- Main Component ---
const UpcomingEvents = ({ events = [] }) => {
  const scrollRef = useRef(null);
  const router = useRouter();
  const [isPaused, setIsPaused] = useState(false);
  const displayEvents =
    events.length < 5
      ? [...events, ...events, ...events, ...events]
      : [...events, ...events];

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer || events.length === 0) return;

    let animationFrameId;
    const scrollSpeed = 0.5;

    const scrollStep = () => {
      if (!isPaused) {
        scrollContainer.scrollLeft += scrollSpeed;
        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth / 2) {
          scrollContainer.scrollLeft = 0;
        }
      }
      animationFrameId = requestAnimationFrame(scrollStep);
    };

    animationFrameId = requestAnimationFrame(scrollStep);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused, events.length, displayEvents.length]);

  // --- EMPTY STATE HANDLING ---
  if (!events || events.length === 0) {
    return (
      <div className="w-full py-16 bg-transparent text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-4xl mb-6 font-bold text-center text-white uppercase tracking-wider drop-shadow-md">
            <span className="text-yellow-500">Upcoming</span> Events
          </h2>

          <div className="flex flex-col items-center justify-center p-8 bg-gray-900/30 border border-gray-800 rounded-2xl max-w-lg mx-auto backdrop-blur-sm">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-500 mb-4">
              <FaRegCalendarTimes size={24} />
            </div>
            <h3 className="text-lg font-bold text-gray-300">
              No Upcoming Events
            </h3>
            <p className="text-gray-500 text-sm mt-2">
              There are no scheduled events at the moment. Check back later!
            </p>
            <button
              onClick={() => router.push("/events")}
              className="mt-6 text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center gap-2 transition-colors"
            >
              View Past Events <FaArrowRight size={12} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // --- CAROUSEL LOGIC (Only runs if we have events) ---
  return (
    <div className="w-full py-8 bg-transparent text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-xl sm:text-2xl md:text-4xl mb-6 font-bold text-center text-white uppercase tracking-wider drop-shadow-md">
          <span className="text-yellow-500">Upcoming</span> Events
        </h2>

        <div
          ref={scrollRef}
          className="flex overflow-x-hidden gap-6 py-4"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {displayEvents.map((event, idx) => (
            <EventCard key={`${event.id}-${idx}`} event={event} />
          ))}
        </div>
      </div>

      <div
        onClick={() => router.push("/events")}
        className="mt-6 flex justify-center cursor-pointer"
      >
        <button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2 backdrop-blur-sm rounded-full py-2.5 px-6 shadow-lg transition-all font-semibold text-sm">
          View All Events
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default UpcomingEvents;
