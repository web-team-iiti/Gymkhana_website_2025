import * as motion from "motion/react-client";
import Link from "next/link";
import ExploreMore from "./ExploreMoreButton";
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
  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="group flex h-full min-h-[25rem] w-[86%] min-w-[275px] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-lg border border-[#e7d4c8] bg-[#fffefd] shadow-[0_5px_14px_rgba(74,48,31,0.13)] transition-shadow duration-200 hover:shadow-[0_16px_32px_rgba(74,48,31,0.2)] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
    >
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
    </motion.article>
  );
};

// --- Main Component ---
const UpcomingEvents = ({ events = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  return (
    <section className="w-full outfit-font bg-[#fff9f6] px-4 py-14 text-[#192b35] sm:px-6 md:py-20">
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
          <ExploreMore href="events" text="All events" />
        </div>

        {events.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          >
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </motion.div>
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
