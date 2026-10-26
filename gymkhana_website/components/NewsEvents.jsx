import * as motion from "motion/react-client";
import Link from "next/link";
import ExploreMore from "./ExploreMoreButton";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaRegCalendarTimes,
} from "react-icons/fa";
import DetailsArrow from "./DetailsArrow";

const dummyEvents = [
  {
    id: "sample-cultural-night",
    title: "Cultural Night",
    subtitle: "Arts and culture",
    description:
      "An evening of music, dance, and performances celebrating cultures from across campus.",
    event_date: "2026-10-17T18:00:00",
    image_urls: [
      "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "sample-campus-run",
    title: "Campus Fun Run",
    subtitle: "Sports and wellness",
    description:
      "Join students and staff for a relaxed morning run, with routes for every pace.",
    event_date: "2026-10-24T07:00:00",
    image_urls: [
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?auto=format&fit=crop&w=1200&q=80",
    ],
  },
  {
    id: "sample-project-expo",
    title: "Student Project Expo",
    subtitle: "Innovation and technology",
    description:
      "Explore student-built projects, meet the teams, and see ideas brought to life.",
    event_date: "2026-11-06T16:00:00",
    image_urls: [
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    ],
  },
];

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
      whileHover={{
        y: -6,
        transition: {
          type: "spring",
          damping: 22,
          stiffness: 320,
        },
      }}
      className="group flex h-full min-h-[25rem] w-[86%] min-w-[275px] max-w-[360px] shrink-0 snap-start flex-col overflow-hidden rounded-2xl border border-slate-200 bg-slate-50/80 shadow-sm transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-xl sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
    >
      <Link
        href={`/events/${event.id}`}
        className="flex h-full flex-col focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-slate-100">
          {displayImage ? (
            <img
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              src={displayImage}
              alt={event.title}
              loading="lazy"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center text-blue-600"
              aria-hidden="true"
            >
              <FaCalendarAlt size={30} />
            </div>
          )}
          <span className="absolute bottom-3 left-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold text-blue-700 shadow-sm border border-slate-200">
            {formattedDate}
          </span>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            {event.subtitle || "Gymkhana event"}
          </p>
          <h3 className="text-lg font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 line-clamp-2">
            {event.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-slate-600 line-clamp-3">
            {event.description ||
              "Join the campus community for this upcoming event."}
          </p>
          <DetailsArrow Text={"Event Details"} />
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
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="w-full outfit-font bg-white px-4 py-14 text-slate-900 sm:px-6 md:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              On the calendar
            </p>
            <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
              Upcoming events
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
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
          <div className="flex flex-col items-center rounded-2xl border border-dashed border-slate-300 bg-slate-50/60 px-6 py-12 text-center shadow-sm">
            <FaRegCalendarTimes
              className="mb-4 text-3xl text-blue-600"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold text-slate-900">
              No upcoming events
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              There are no scheduled events at the moment. Browse the events
              page to see what has happened on campus.
            </p>
            <Link
              href="/events"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
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
