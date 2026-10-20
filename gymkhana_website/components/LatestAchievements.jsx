"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import {
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaTrophy,
} from "react-icons/fa";
import ExploreMore from "./ExploreMoreButton";
import TypeWriter from "../animations/TypeWriter";

const dummyAchievements = [
  {
    id: 1,
    council_id: 1,
    council_name: "Technical Council",
    council_color: "#1d4ed8",
    title: "Team wins national robotics championship",
    description:
      "The robotics club took first place among 120 teams, beating the defending champions in the final round with a fully autonomous run.",
    image_url: "https://picsum.photos/seed/robotics/1200/800",
    achievement_date: "2026-09-14T00:00:00.000Z",
  },
  {
    id: 2,
    council_id: 2,
    council_name: "Cultural Council",
    council_color: "#7c3aed",
    title: "Dance troupe takes gold at inter-IIT cultural meet",
    description:
      "A 24-member troupe won gold in group choreography, with a performance blending classical and contemporary styles.",
    image_url: "https://picsum.photos/seed/dance/1200/800",
    achievement_date: "2026-08-30T00:00:00.000Z",
  },
  {
    id: 3,
    council_id: 3,
    council_name: "Sports Council",
    council_color: "#0f766e",
    title: "Basketball team clinches inter-college title",
    description:
      "After an unbeaten season, the men's basketball team won the finals 78-64 and secured the trophy for the second year running.",
    image_url: "https://picsum.photos/seed/basketball/1200/800",
    achievement_date: "2026-08-12T00:00:00.000Z",
  },
  {
    id: 4,
    council_id: 4,
    council_name: "Academic Council",
    council_color: "#0284c7",
    title: "Students publish research at an international conference",
    description:
      "Three second-year students presented their paper on low-power edge inference, accepted out of more than 900 submissions.",
    image_url: "https://picsum.photos/seed/research/1200/800",
    achievement_date: "2026-07-22T00:00:00.000Z",
  },
  {
    id: 5,
    council_id: 5,
    council_name: "Entrepreneurship Council",
    council_color: "#be123c",
    title: "Campus startup raises its first seed funding",
    description:
      "A student-founded startup building affordable water sensors closed a seed round and onboarded its first ten pilot customers.",
    image_url: null,
    achievement_date: "2026-07-05T00:00:00.000Z",
  },
  {
    id: 6,
    council_id: 6,
    council_name: "Media Council",
    council_color: "#4f46e5",
    title: "Short film selected for national student film festival",
    description:
      "A ten-minute short shot entirely on campus was chosen among the top 15 films nationwide and will be screened at the festival.",
    image_url: "https://picsum.photos/seed/film/1200/800",
    achievement_date: "2026-06-18T00:00:00.000Z",
  },
];

// --- Tuning (offsets are fractions of ONE card's width) ---
const LEFT_STEP = 0.045; // how much each card in the left stack peeks out
const RIGHT_STEP = 0.07; // how much each card in the right stack peeks out
const HOVER_NUDGE = 0.035; // extra slide-out when hovering a peeking card
const MAX_CARDS = 8; // more than this makes the cards too narrow

const CARD_COLORS = [
  "#1e3a8a",
  "#111827",
  "#374151",
  "#1f2937",
  "#172554",
  "#334155",
];

const pct = (v) => `${(v * 100).toFixed(2)}%`;

const toDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
};

const LatestAchievements = ({ achievements = [] }) => {
  const source =
  Array.isArray(achievements) && achievements.length > 0
  ? achievements
  : dummyAchievements;

  const items = source.slice(0, MAX_CARDS);
  const n = items.length;

  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(null);

  const go = (i) => setActive(Math.min(Math.max(i, 0), n - 1));

  const cardWidth = 100 / (1 + (n - 1) * RIGHT_STEP + HOVER_NUDGE);
  const getX = (i) => {
    let x =
      i <= active
        ? i * LEFT_STEP
        : active * LEFT_STEP + (i - active) * RIGHT_STEP;
    if (hovered === i && i !== active) {
      x += i < active ? -HOVER_NUDGE : HOVER_NUDGE;
    }
    return pct(x);
  };

  return (
    <section className="outfit-font w-full bg-white px-4 py-16 font-bold text-slate-950 sm:px-6 md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[2fr_3fr] lg:gap-8">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-2 w-2 rounded-full bg-blue-600"
              aria-hidden="true"
            />
            <TypeWriter
              as="p"
              text="A moment worth celebrating"
              speed={30}
              className="text-xs font-bold uppercase tracking-widest text-blue-700"
            />
          </div>
          <h2 className="text-5xl font-bold leading-[1.02] tracking-tight sm:text-6xl">
            <TypeWriter
              text="Latest"
              speed={60}
              delay={500}
              className="block"
            />
            <TypeWriter
              text="achievements"
              speed={60}
              delay={900}
              className="block italic text-blue-700"
            />
          </h2>
          <TypeWriter
            as="p"
            text="The people and councils making an impact across the campus."
            speed={20}
            delay={1600}
            className="mt-5 max-w-xs text-sm font-semibold leading-6 text-slate-600 sm:text-base"
          />
          <ExploreMore href={"/councils"} text={"Explore Councils"} />
        </div>

        {n > 0 ? (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="relative h-[24rem] sm:h-[28rem] lg:h-[30rem]">
              {items.map((a, i) => {
                const isActive = i === active;
                const dist = Math.abs(i - active);
                const color = CARD_COLORS[i % CARD_COLORS.length];
                const date = toDate(a.achievement_date);

                return (
                  <motion.div
                    key={a.id ?? i}
                    role={isActive ? undefined : "button"}
                    tabIndex={isActive ? -1 : 0}
                    aria-label={isActive ? undefined : `Show ${a.title}`}
                    initial={false}
                    animate={{
                      x: getX(i),
                      scaleY: Math.max(1 - dist * 0.06, 0.7),
                    }}
                    transition={{ type: "spring", stiffness: 220, damping: 30 }}
                    onClick={() => !isActive && go(i)}
                    onKeyDown={(e) => {
                      if (!isActive && (e.key === "Enter" || e.key === " ")) {
                        e.preventDefault();
                        go(i);
                      }
                    }}
                    onPointerEnter={(e) =>
                      e.pointerType === "mouse" && setHovered(i)
                    }
                    onPointerLeave={(e) =>
                      e.pointerType === "mouse" &&
                      setHovered((h) => (h === i ? null : h))
                    }
                    style={{
                      zIndex: n - dist,
                      width: `${cardWidth}%`,
                      backgroundColor: color,
                    }}
                    className={`absolute left-0 top-0 h-full overflow-hidden rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.25)] outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      isActive ? "cursor-default" : "cursor-pointer"
                    }`}
                  >
                    {/* Card content: only visible on the front card */}
                    <div
                      aria-hidden={!isActive}
                      className={`absolute inset-0 transition-opacity duration-300 ${
                        isActive
                          ? "opacity-100 delay-200"
                          : "pointer-events-none opacity-0"
                      }`}
                    >
                      {a.image_url ? (
                        <img
                          src={a.image_url}
                          alt={a.title}
                          loading="lazy"
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      ) : (
                        <div
                          className="absolute inset-0 flex items-center justify-center pb-24 text-white/30"
                          aria-hidden="true"
                        >
                          <FaTrophy size={56} />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7">
                        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs">
                          <span className="font-bold uppercase tracking-wide text-white">
                            {a.council_name?.replace(" Council", "") ||
                              "Gymkhana"}
                          </span>
                          {date && (
                            <time
                              className="font-semibold text-white/80"
                              dateTime={date.toISOString()}
                            >
                              {date.toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                timeZone: "UTC",
                              })}
                            </time>
                          )}
                        </div>
                        <h3 className="line-clamp-2 text-xl text-white font-extrabold leading-snug sm:text-3xl">
                          {a.title}
                        </h3>
                        <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-white/85">
                          {a.description}
                        </p>
                        <Link
                          href={`/councils/${a.council_id}`}
                          tabIndex={isActive ? 0 : -1}
                          className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-white underline-offset-4 hover:underline"
                        >
                          More from this council
                          <FaArrowRight aria-hidden="true" size={12} />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Controls */}
            <div className="mt-6 flex items-center gap-3">
              <button
                type="button"
                onClick={() => go(active - 1)}
                disabled={active === 0}
                aria-label="Previous achievement"
                className="flex h-7 w-9 items-center justify-center rounded-full border border-slate-400 text-xs text-slate-700 transition-opacity hover:border-slate-900 disabled:opacity-30"
              >
                <FaChevronLeft size={10} />
              </button>
              <div className="flex items-center gap-2">
                {items.map((a, i) => (
                  <button
                    key={a.id ?? i}
                    type="button"
                    onClick={() => go(i)}
                    aria-label={`Go to achievement ${i + 1}`}
                    aria-current={i === active}
                    className={`flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-colors ${
                      i === active
                        ? "border-blue-700 bg-blue-700 text-white"
                        : "border-slate-400 text-slate-600 hover:border-blue-700 hover:text-blue-700"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => go(active + 1)}
                disabled={active === n - 1}
                aria-label="Next achievement"
                className="flex h-7 w-9 items-center justify-center rounded-full border border-slate-400 text-xs text-slate-700 transition-opacity hover:border-slate-900 disabled:opacity-30"
              >
                <FaChevronRight size={10} />
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-slate-300 px-6 py-16 text-center">
            <FaTrophy
              className="mb-4 text-3xl text-blue-700"
              aria-hidden="true"
            />
            <h3 className="text-lg font-bold">
              New achievements are on the way
            </h3>
            <p className="mt-2 max-w-md text-sm font-semibold leading-6 text-slate-600">
              Council highlights will appear here as they are shared.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestAchievements;
