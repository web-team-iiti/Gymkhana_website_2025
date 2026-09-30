import Link from "next/link";
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
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#eadfd6] bg-[#fffdfb] shadow-[0_2px_8px_rgba(60,39,27,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(60,39,27,0.12)]">
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
  return (
    <section className="w-full outfit-font bg-[#ffcfbc] px-4 py-14 text-[#192b35] sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-[#b96f65]">
              On the calendar
            </p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Upcoming events
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#657078] sm:text-base">
              Find your next opportunity to learn, compete, and connect.
            </p>
          </div>
          <Link
            href="/events"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c8bcb4] px-5 py-2.5 text-sm font-semibold text-[#263f4b] transition-colors hover:border-[#b96f65] hover:text-[#a4574e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b96f65]"
          >
            All events <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        {events.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border border-dashed border-[#d9ccc3] bg-[#fffdfb] px-6 py-12 text-center">
            <FaRegCalendarTimes
              className="mb-4 text-3xl text-[#b96f65]"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold text-[#263f4b]">
              No upcoming events
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#657078]">
              There are no scheduled events at the moment. Browse the events
              page to see what has happened on campus.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#a4574e] hover:text-[#783e38]"
            >
              Browse events <FaArrowRight aria-hidden="true" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default UpcomingEvents;
