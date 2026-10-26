"use client";
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

import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import {
  FaArrowRight,
  FaCalendarAlt,
  FaRegCalendarTimes,
} from "react-icons/fa";
import TypeWriter from "@/animations/TypeWriter";
import ExploreMore from "./ExploreMoreButton";

/* In order to see an event we need an upcoming event since the query rejects the rows with timestamp less than current */

// ------------------------------------------------------
// Animation config
// ------------------------------------------------------
const CLOSED = "inset(50% 50% 50% 50% round 1.5rem)"; // a point at the card's centre
const OPEN = "inset(0% 0% 0% 0% round 1.5rem)"; // full card (1.5rem = rounded-3xl)
const EASE = [0.65, 0, 0.35, 1];
const TIMES = [0, 0.42, 1]; // 0-42% = grow, 42-100% = split apart

// Desktop: both cards of a row start stacked at the row's centre, grow from a
// point, then slide out to their own columns.
// Mobile (1 column): there's nothing to split, so the card just grows in place.
const buildVariants = ({ side, desktop, reduce }) => {
  if (reduce) return { cell: {}, media: {}, text: {} };

  const startX = side === 0 ? "50%" : "-50%";

  if (!desktop) {
    return {
      cell: {},
      media: {
        hidden: { clipPath: CLOSED },
        visible: {
          clipPath: OPEN,
          transition: { duration: 0.9, ease: EASE },
        },
      },
      text: {
        hidden: { opacity: 0, y: 16 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { delay: 0.5, duration: 0.6 },
        },
      },
    };
  }

  return {
    cell: {
      hidden: { x: "0%" },
      visible: {
        x: [startX, startX, "0%"],
        transition: { duration: 1.6, times: TIMES, ease: EASE },
      },
    },
    media: {
      hidden: { clipPath: CLOSED },
      visible: {
        clipPath: [CLOSED, OPEN, OPEN],
        transition: { duration: 1.6, times: TIMES, ease: EASE },
      },
    },
    text: {
      hidden: { opacity: 0, y: 16 },
      visible: {
        opacity: 1,
        y: 0,
        transition: { delay: 1.1, duration: 0.6 },
      },
    },
  };
};

// Defaults to false so server and first client render match (mobile-safe)
const useIsDesktop = () => {
  const [desktop, setDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return desktop;
};

const formatDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Kolkata", // same output on server and client
  });
};

// ------------------------------------------------------
// Heading: words slide up out of a mask
// ------------------------------------------------------
const RevealWords = ({ text, className = "" }) => (
  <h2 className={className}>
    <span className="sr-only">{text}</span>
    <span aria-hidden="true">
      {text.split(" ").map((word, i) => (
        <Fragment key={i}>
          <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ y: "110%" }}
              whileInView={{ y: "0%" }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{
                duration: 0.8,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
          </span>{" "}
        </Fragment>
      ))}
    </span>
  </h2>
);

const ArrowCircle = ({ className = "" }) => (
  <span
    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${className}`}
  >
    <FaArrowRight
      aria-hidden="true"
      size={14}
      className="-rotate-45 transition-transform duration-300 group-hover:rotate-0"
    />
  </span>
);

// ------------------------------------------------------
// Cards
// ------------------------------------------------------
const EventCard = ({ event, variants }) => {
  const image = event.image_urls?.[0];
  const date = formatDate(event.event_date);

  return (
    <Link
      href={`/events/${event.id}`}
      className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
    >
      <motion.div
        variants={variants.media}
        className="relative aspect-[3/2] overflow-hidden rounded-3xl bg-neutral-200"
      >
        {image ? (
          <img
            src={image}
            alt={event.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            className="flex h-full items-center justify-center text-blue-600"
            aria-hidden="true"
          >
            <FaCalendarAlt size={40} />
          </div>
        )}
      </motion.div>

      <motion.div
        variants={variants.text}
        className="mt-4 flex items-start justify-between gap-4"
      >
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-neutral-600 sm:text-sm">
            {[date, event.subtitle || "Gymkhana event"]
              .filter(Boolean)
              .join(" • ")}
          </p>
          <h3 className="mt-2 text-2xl font-medium leading-tight sm:text-3xl">
            {event.title}
          </h3>
          <p className="mt-2 line-clamp-2 max-w-md text-sm leading-6 text-neutral-500">
            {event.description ||
              "Join the campus community for this upcoming event."}
          </p>
        </div>
        <ArrowCircle className="border-black/20 group-hover:border-blue-600 group-hover:bg-blue-600 group-hover:text-white" />
      </motion.div>
    </Link>
  );
};

// Fills the empty slot when the number of events is odd
const CtaTile = ({ variants }) => (
  <Link
    href="/events"
    className="group block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
  >
    <motion.div
      variants={variants.media}
      className="relative flex aspect-[3/2] flex-col justify-between overflow-hidden rounded-3xl bg-neutral-950 p-6 text-white transition-colors duration-500 group-hover:bg-blue-600 sm:p-8"
    >
      <p className="text-xs font-medium uppercase tracking-widest text-blue-400 transition-colors duration-500 group-hover:text-white">
        Don&apos;t miss out
      </p>
      <div className="flex items-end justify-between gap-4">
        <span className="text-4xl font-medium leading-none sm:text-6xl">
          All
          <br />
          events
        </span>
        <ArrowCircle className="border-white/30 group-hover:border-white group-hover:bg-white group-hover:text-blue-600" />
      </div>
    </motion.div>
  </Link>
);

const EventCell = ({ item, side, desktop, reduce }) => {
  const variants = buildVariants({ side, desktop, reduce });

  return (
    <motion.div
      variants={variants.cell}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.25 }}
      // left card sits on top while the pair is stacked in the middle
      className={`md:px-3 ${side === 0 ? "relative z-10" : ""}`}
    >
      {item.cta ? (
        <CtaTile variants={variants} />
      ) : (
        <EventCard event={item} variants={variants} />
      )}
    </motion.div>
  );
};

// Main
const UpcomingEvents = ({ events = [] }) => {
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();

  const list = Array.isArray(events) ? events : [];
  // const list = dummyEvents; // uncomment to preview without the DB

  // odd count: add a CTA tile so the last row is never half empty
  const items =
    list.length % 2 === 1 ? [...list, { id: "cta", cta: true }] : list;

  return (
    <section className="outfit-font w-full overflow-hidden bg-[#f0f0fa] px-4 py-16 text-black sm:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 flex flex-col gap-8 md:mb-16 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-2 w-2 rounded-full bg-blue-600"
                aria-hidden="true"
              />
              <TypeWriter
                as="p"
                text="On the Calendar"
                speed={30}
                className="text-xs font-bold uppercase tracking-widest text-blue-700"
              />
            </div>
            <div className="flex gap-180">
              <h2 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
                <TypeWriter
                  text="Upcoming"
                  speed={60}
                  delay={500}
                  className="block"
                />
                <TypeWriter
                  text="Events"
                  speed={60}
                  delay={900}
                  className="block italic text-blue-700"
                />
                <TypeWriter
                  as="p"
                  text="All new events across the campus."
                  speed={20}
                  delay={1600}
                  className="mt-5  text-sm font-medium leading-6 text-slate-600 sm:text-base"
                />
              </h2>

              <ExploreMore href={"/events"} text={"All Events"} />
            </div>
          </div>
        </div>

        {/* n x 2 grid */}
        {items.length > 0 ? (
          <div className="grid grid-cols-1 gap-y-10 md:-mx-3 md:grid-cols-2 md:gap-y-14">
            {items.map((item, i) => (
              <EventCell
                key={item.id}
                item={item}
                side={i % 2}
                desktop={desktop}
                reduce={reduce}
              />
            ))}
          </div>
        ) : (
          <div className="flex bg-white flex-col items-center rounded-3xl border border-dashed border-black/20 px-6 py-16 text-center">
            <FaRegCalendarTimes
              className="mb-4 text-3xl text-blue-600"
              aria-hidden="true"
            />
            <h3 className="text-xl font-medium">No upcoming events</h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-neutral-600">
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
