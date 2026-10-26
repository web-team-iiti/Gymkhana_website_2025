"use client";

import { useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
  useTransform,
} from "motion/react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TypeWriter from "../animations/TypeWriter";

// 🧩 Mock Data
const mockClubs = [
  // ==========================
  // 1. TECHNICAL CLUBS
  // ==========================
  {
    id: 1,
    name: "Aeromodelling Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Design, build, and fly! We deal with UAVs, drones, and miniaturized aircrafts, participating in technical fests across the country.",
    imageUrl: "/aeroclub.jpg",
  },
  {
    id: 2,
    name: "Astronomy Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "A hub for cosmic exploration. We organize stargazing sessions, telescope workshops, and discuss the mysteries of the universe.",
    imageUrl: "/astronomyclub.jpg",
  },
  {
    id: 3,
    name: "CAE Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Computer-Aided Engineering Club. We solve engineering problems using simulation software like ANSYS and Abaqus.",
    imageUrl: "/cae.png",
  },
  {
    id: 4,
    name: "CFA Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "The Finance and Analytics Club. We prepare students for corporate finance, algorithmic trading, and data analysis roles.",
    imageUrl: "/CFA.jpg",
  },
  {
    id: 5,
    name: "Concrete Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Exploring civil engineering and sustainable construction. We conduct workshops on structural design and concrete technology.",
    imageUrl: "/concreate.jpg",
  },
  {
    id: 6,
    name: "Electronics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "For the hardware fanatics. We explore IoT, embedded systems, and circuit design through hands-on workshops and hackathons.",
    imageUrl: "/electronics.png",
  },
  {
    id: 7,
    name: "Cynaptics",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "The AI & ML Club. We work on neural networks, deep learning projects, and compete in Kaggle competitions.",
    imageUrl: "/cynaptics.jpg",
  },
  {
    id: 8,
    name: "GDSC",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Google Developer Student Club. We focus on Web Dev, App Dev, and Cloud Computing, empowering students with Google technologies.",
    imageUrl: "/gdsc.png",
  },
  {
    id: 9,
    name: "Gymkhana Web Team",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "The tech backbone of the institute. We develop and maintain the official websites, portals, and apps for the Gymkhana.",
    imageUrl: "/Web_Team_Logo.aeedf74e.png",
  },
  {
    id: 10,
    name: "IVDC",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Intelligent Vehicle Design Club. We design autonomous and electric concept vehicles for competitions like Formula Student.",
    imageUrl: "/ivdc.jpg",
  },
  {
    id: 11,
    name: "Metacryst",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Materials Science Club. We explore crystallography, metallurgy, and smart materials through research and experiments.",
    imageUrl: "/MetaCryst Logo1.a914f007.png",
  },
  {
    id: 12,
    name: "Programming Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "The coding hub. We focus on Competitive Programming (CP), DSA, Cybersecurity, and open-source development.",
    imageUrl: "/pclub.png",
  },
  {
    id: 13,
    name: "Quantum Computing",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "Exploring the future of computing. We study quantum algorithms, cryptography, and Qiskit implementations.",
    imageUrl: "/quantum computing.abcb2b09.jpg",
  },
  {
    id: 14,
    name: "Robotics Club",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "We build machines that move. From line followers and micromouse to humanoids and industrial arms.",
    imageUrl: "/robotics.jpg",
  },
  {
    id: 15,
    name: "Biocrats",
    category: "Technical",
    tag: "TECHNICAL",
    description:
      "The Biotech Club. We explore bioinformatics, genetic engineering, and synthetic biology through seminars and projects.",
    imageUrl: "/Biocrats.jpg",
  },

  // ==========================
  // 2. SPORTS CLUBS
  // ==========================
  {
    id: 16,
    name: "Athletics Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Run, Jump, Throw. We focus on track and field events, endurance training, and physical conditioning.",
    imageUrl: "/athletics.png",
  },
  {
    id: 17,
    name: "Aquatics Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Dive in! We conduct swimming training, water polo matches, and promote aquatic fitness.",
    imageUrl: "/aquatics.jpg",
  },
  {
    id: 18,
    name: "Badminton Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Smash it! A community for badminton lovers offering coaching, practice courts, and tournaments.",
    imageUrl: "/Badminton_club.png",
  },
  {
    id: 19,
    name: "Basketball Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Dribble and Shoot. We focus on team strategy, drills, and high-intensity inter-college matches.",
    imageUrl: "/basketball.png",
  },
  {
    id: 20,
    name: "Chess Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Checkmate. A club for strategic minds to practice tactics, openings, and compete in rapid/blitz tournaments.",
    imageUrl: "/chess.jpg",
  },
  {
    id: 21,
    name: "Cricket Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "The gentlemen's game. We host net practice, inter-batch leagues, and represent the institute in tournaments.",
    imageUrl: "/cricket.jpg",
  },
  {
    id: 22,
    name: "Football Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "The beautiful game. We focus on stamina, tactical discipline, and teamwork on the field.",
    imageUrl: "/football.jpg",
  },
  {
    id: 23,
    name: "Squash Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "High-intensity court action. We offer training for agility, reflex improvement, and friendly matches.",
    imageUrl: "/squash.png",
  },
  {
    id: 24,
    name: "Tennis Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Ace your game. Lawn tennis coaching and matches for beginners and advanced players alike.",
    imageUrl: "/tennis.jpg",
  },
  {
    id: 25,
    name: "Table Tennis Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Spin and Smash. Fast-paced ping pong action with regular practice sessions and competitions.",
    imageUrl: "/tabletennis.png",
  },
  {
    id: 26,
    name: "Volleyball Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Bump, Set, Spike. We foster teamwork and agility through regular volleyball training.",
    imageUrl: "/vollyball.png",
  },
  {
    id: 27,
    name: "Yoga Club",
    category: "Sports",
    tag: "SPORTS",
    description:
      "Mind and Body. We promote wellness through asanas, meditation, and flexibility workshops.",
    imageUrl: "/gym.jpg",
  },

  // ==========================
  // 3. CULTURAL CLUBS
  // ==========================
  {
    id: 28,
    name: "Aaina (Dramatics)",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "The Dramatics Society. We perform street plays (Nukkad), stage plays, and mimes to showcase emotions and social causes.",
    imageUrl: "/aaina_logo.png",
  },
  {
    id: 29,
    name: "Cinephiles",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "The Movie Club. A haven for cinema lovers. We organize screenings, filmmaking workshops, and movie discussions.",
    imageUrl: "/cinephiles.jpg",
  },
  {
    id: 30,
    name: "Kaizen Dance Crew",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "The official dance club. We express ourselves through Hip-hop, Contemporary, Bollywood, and Classical dance forms.",
    imageUrl: "/alphad.jpg",
  },
  {
    id: 31,
    name: "Music Club",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "For the melody makers. We are a group of vocalists and instrumentalists who jam, perform, and live for music.",
    imageUrl: "/Music.jpg",
  },
  {
    id: 32,
    name: "Kalakriti (Fine Arts)",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "The Fine Arts Club. From sketching and painting to digital art and crafting, we color the campus with creativity.",
    imageUrl: "/kalakriti.png",
  },
  {
    id: 33,
    name: "Literary Club",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "For the wordsmiths. We organize poetry slams, creative writing workshops, debates, and open mic nights.",
    imageUrl: "/literary.jpg",
  },
  {
    id: 34,
    name: "Debating Society",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "The voice of reason. We hone public speaking and argumentation skills through parliamentary debates and MUNs.",
    imageUrl: "/Debsoc.jpg",
  },
  {
    id: 35,
    name: "Mystic Hues",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "The Photography & Design Club. We capture moments through lenses and create visual stories through graphic design.",
    imageUrl: "/Mystichues.png",
  },
  {
    id: 36,
    name: "Quiz Club",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "For the trivia buffs. We conduct quizzes on general knowledge, pop culture, sports, technology, and more.",
    imageUrl: "/quiz.jpg",
  },
  {
    id: 37,
    name: "EBSB Club",
    category: "Cultural",
    tag: "CULTURAL",
    description:
      "Ek Bharat Shreshtha Bharat. We celebrate the cultural diversity of India through exchange programs and ethnic events.",
    imageUrl: "/ebsb.png",
  },
  {
    id: 38,
    name: "Gaming Club",
    category: "Cultural",
    tag: "CULTURAL", // Often considered Cultural/Recreational
    description:
      "The Esports hub. We organize competitive gaming tournaments for PC and mobile games like Valorant, CS:GO, and BGMI.",
    imageUrl: "/gaming.png",
  },
];
// ------------------------------------------------------
// Config
// ------------------------------------------------------
const CATS = {
  TECHNICAL: {
    label: "Technical",
    accent: "#93c5fd",
    textAccent: "#1d4ed8",
    bg: "#eff6ff",
  },
  SPORTS: {
    label: "Sports",
    accent: "#6ee7b7",
    textAccent: "#15803d",
    bg: "#f0fdf4",
  },
  CULTURAL: {
    label: "Cultural",
    accent: "#f0abfc",
    textAccent: "#a21caf",
    bg: "#fdf4ff",
  },
};
const ORDER = ["TECHNICAL", "SPORTS", "CULTURAL"];

const PER_CAT = 5; // clubs per category in the cover-flow
const FLOW = ORDER.flatMap((tag) =>
  mockClubs.filter((c) => c.tag === tag).slice(0, PER_CAT),
);
const FLOW_STEP = 68; // % of card width between neighbouring cards
const BENTO_INITIAL = 16; // cards shown before "Show all"

// ------------------------------------------------------
// Shared: blurred backdrop + crisp image (works for logos and photos)
// ------------------------------------------------------
const ClubArt = ({ src, alt, className = "", pad = "p-3" }) => (
  <div className={`relative overflow-hidden ${className}`}>
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className="absolute inset-0 h-full w-full scale-125 object-cover opacity-60 blur-xl"
    />
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={`relative h-full w-full object-contain ${pad}`}
    />
  </div>
);

// ------------------------------------------------------
// PART 1: Scroll-driven cover-flow
// ------------------------------------------------------
const CoverCard = ({ club, index, pos }) => {
  const accent = CATS[club.tag]?.accent ?? "#93c5fd";

  const d = useTransform(pos, (v) => index - v);
  const x = useTransform(d, (v) => `${v * FLOW_STEP}%`);
  const scale = useTransform(d, (v) => Math.max(1 - Math.abs(v) * 0.16, 0.55));
  const opacity = useTransform(d, (v) => Math.max(1 - Math.abs(v) * 0.3, 0));
  const rotateY = useTransform(d, (v) => Math.max(Math.min(v * -28, 50), -50));
  const filter = useTransform(
    d,
    (v) => `blur(${Math.min(Math.abs(v), 2.5) * 2.5}px)`,
  );
  const zIndex = useTransform(d, (v) => 100 - Math.round(Math.abs(v) * 10));

  return (
    <motion.div
      style={{
        x,
        scale,
        opacity,
        rotateY,
        filter,
        zIndex,
        transformPerspective: 1100,
      }}
      data-cover-card
      className="absolute left-1/2 top-1/2 -ml-[7.5rem] -mt-[12rem] h-[24rem] w-60 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-gray-800 to-gray-950 text-white shadow-2xl backdrop-blur-sm sm:-ml-[9rem] sm:-mt-[14rem] sm:h-[28rem] sm:w-72"
    >
      <ClubArt src={club.imageUrl} alt={club.name} className="h-[52%]" />
      <div className="p-5">
        <span
          className="rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-widest"
          style={{ backgroundColor: `${accent}26`, color: accent }}
        >
          {club.tag}
        </span>
        <h3 className="mt-3 text-xl font-semibold leading-tight sm:text-2xl">
          {club.name}
        </h3>
        <p className="mt-2 line-clamp-3 text-xs leading-5 text-gray-300 sm:text-sm">
          {club.description}
        </p>
      </div>
    </motion.div>
  );
};

const CoverFlow = () => {
  const n = FLOW.length;

  const position = useMotionValue(0);
  const pos = useSpring(position, { stiffness: 180, damping: 30, mass: 0.4 });
  const progress = useTransform(pos, [0, n - 1], [0, 1]);

  const stops = ORDER.map(
    (_, k) => (k * PER_CAT + (PER_CAT - 1) / 2) / (n - 1),
  );
  const backgroundColor = useTransform(
    progress,
    stops,
    ORDER.map((t) => CATS[t].bg),
  );

  const [current, setCurrent] = useState(0);
  useMotionValueEvent(pos, "change", (v) => setCurrent(Math.round(v)));

  const goTo = (index) => {
    position.set(Math.min(Math.max(index, 0), n - 1));
  };

  const onWheel = (event) => {
    const delta =
      Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;
    const deltaScale =
      event.deltaMode === 1
        ? 16
        : event.deltaMode === 2
          ? window.innerHeight
          : 1;
    const nextPosition = position.get() + (delta * deltaScale) / 220;

    if (
      (delta > 0 && position.get() < n - 1) ||
      (delta < 0 && position.get() > 0)
    ) {
      event.preventDefault();
      position.set(Math.min(Math.max(nextPosition, 0), n - 1));
    }
  };

  const active = FLOW[current] ?? FLOW[0];
  const cat = CATS[active.tag];

  return (
    <section className="relative h-screen">
      <motion.div
        style={{ backgroundColor }}
        onWheel={onWheel}
        className="sticky top-0 h-screen overflow-hidden text-gray-900"
      >
        {/* accent glow behind the centred card */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-25 blur-3xl transition-colors duration-700"
          style={{ backgroundColor: cat.accent }}
        />

        {/* header */}
        <div className="outfit-font absolute left-6 top-10 z-[200] sm:left-12">
          <p className="text-xs font-bold uppercase tracking-widest text-gray-600">
            Our clubs
          </p>
          <h2 className="mt-2 text-3xl font-light leading-tight sm:text-5xl">
            Explore the diverse
            <br />
            clubs of IIT Indore
          </h2>
          <AnimatePresence mode="wait">
            <motion.p
              key={active.tag}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="mt-4 text-sm font-semibold uppercase tracking-widest"
              style={{ color: cat.textAccent }}
            >
              {cat.label}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* stage */}
        <div className="absolute inset-0 select-none">
          {FLOW.map((club, i) => (
            <CoverCard key={club.id} club={club} index={i} pos={pos} />
          ))}
        </div>

        <div className="absolute inset-x-0 bottom-8 z-[200] flex flex-col items-center gap-3">
          <p className="font-mono text-xs text-gray-600">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(n).padStart(2, "0")}
            <span className="ml-3 uppercase tracking-widest">
              Scroll to explore
            </span>
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => goTo(current - 1)}
              disabled={current === 0}
              aria-label="Previous club"
              className="rounded-full p-2 text-gray-600 transition-colors hover:text-gray-950 disabled:opacity-30"
            >
              <FaArrowLeft aria-hidden="true" size={14} />
            </button>
            <div className="h-[2px] w-40 overflow-hidden rounded-full bg-gray-900/15">
              <motion.div
                style={{ scaleX: progress, backgroundColor: cat.textAccent }}
                className="h-full origin-left"
              />
            </div>
            <button
              type="button"
              onClick={() => goTo(current + 1)}
              disabled={current === n - 1}
              aria-label="Next club"
              className="rounded-full p-2 text-gray-600 transition-colors hover:text-gray-950 disabled:opacity-30"
            >
              <FaArrowRight aria-hidden="true" size={14} />
            </button>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

// ------------------------------------------------------
// PART 2: Bento grid with 3D tilt cards
// ------------------------------------------------------
const TILT_SPRING = { stiffness: 200, damping: 20, mass: 0.4 };

const TiltCard = ({ club }) => {
  const accent = CATS[club.tag]?.accent ?? "#93c5fd";

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, TILT_SPRING);
  const sy = useSpring(my, TILT_SPRING);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-9, 9]);

  const onMove = (e) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <div
      className="group h-full [perspective:900px]"
      onPointerMove={onMove}
      onPointerLeave={reset}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="relative h-full"
      >
        {/* background layer (overflow-hidden lives here so 3D isn't flattened) */}
        <div
          style={{ "--glow": accent }}
          className="absolute inset-0 overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-b from-gray-800 to-gray-950 transition-shadow duration-500 group-hover:shadow-[0_25px_70px_-20px_var(--glow)]"
        >
          <img
            src={club.imageUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="absolute inset-0 h-full w-full scale-125 object-cover opacity-30 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(160deg, ${accent}40, transparent 55%)`,
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/95 via-gray-900/40 to-transparent" />
        </div>

        <div className="absolute left-4 top-4 h-14 w-14 overflow-hidden rounded-2xl bg-gray-100 shadow-xl transition-transform duration-300 [transform:translateZ(35px)] group-hover:[transform:translateZ(85px)]">
          <img
            src={club.imageUrl}
            alt={club.name}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        </div>

        <span
          className="absolute right-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold tracking-widest [transform:translateZ(20px)]"
          style={{ backgroundColor: `${accent}26`, color: accent }}
        >
          {club.tag}
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 text-white [transform:translateZ(30px)] sm:p-5">
          <h3 className="font-semibold leading-tight text-base sm:text-xl">
            {club.name}
          </h3>
          <div className="grid grid-rows-[0fr] opacity-0 transition-[grid-template-rows,opacity] duration-500 group-hover:grid-rows-[1fr] group-hover:opacity-100 [@media(hover:none)]:grid-rows-[1fr] [@media(hover:none)]:opacity-100">
            <div className="min-h-0 overflow-hidden">
              <p className="mt-2 line-clamp-2 text-xs leading-5 text-gray-300 sm:text-sm">
                {club.description}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const ClubBento = () => {
  const [filter, setFilter] = useState("ALL");
  const [expanded, setExpanded] = useState(false);

  const list =
    filter === "ALL" ? mockClubs : mockClubs.filter((c) => c.tag === filter);
  const shown = expanded ? list : list.slice(0, BENTO_INITIAL);

  return (
    <motion.section
      initial={false}
      animate={{
        backgroundColor: filter === "ALL" ? "#f8fafc" : CATS[filter].bg,
      }}
      transition={{ duration: 0.8 }}
      className="px-4 py-20 text-gray-900 sm:px-6"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 outfit-font flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <TypeWriter
              as="p"
              text="Browse everything"
              speed={30}
              className="text-xs font-bold uppercase tracking-widest text-gray-600"
            />
            <TypeWriter
              as="h2"
              text="Find your club"
              speed={55}
              delay={400}
              cursorClassName="bg-gray-900"
              className="mt-2 text-3xl font-semibold sm:text-5xl"
            />
            <TypeWriter
              as="p"
              text={`${list.length} clubs. Pick a category and the grid reshuffles around it.`}
              speed={15}
              delay={900}
              className="mt-2 max-w-md text-sm text-gray-600 sm:text-base"
            />
          </div>
        </div>

      {/* 🟢 Filter Buttons - Mobile Optimized (flex-wrap) */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8 px-4">
        {["ALL", "TECHNICAL", "SPORTS", "CULTURAL"].map((cat) => (
          <motion.button
            key={cat}
            type="button"
            aria-pressed={filter === cat}
            whileHover={{ scale: 1.05, y: -5 }}
            whileTap={{ scale: 0.9, y: 5 }}
            transition={{ type: "spring", stiffness: 600, damping: 20 }}
            onClick={() => {
              setFilter(cat);
              setExpanded(false);
            }}
            className={`cursor-pointer rounded-full border px-2 py-1 text-xs font-semibold shadow-sm transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75c4e] sm:px-4 md:px-5 md:py-2 md:text-sm
              ${
                filter === cat
                  ? "border-[#b96f65] bg-[#b96f65] text-white"
                  : "border-[#d9ccc3] bg-[#fffefd] text-[#263f4b] hover:border-[#b96f65] hover:bg-[#fff3e8]"
              }`}
          >
            {cat}
          </motion.button>
        ))}
      </div>

        {/* bento grid */}
        <motion.div
          layout
          className="grid auto-rows-[12rem] grid-cols-2 gap-3 md:auto-rows-[14rem] md:grid-cols-4 md:gap-4"
        >
          <AnimatePresence mode="popLayout">
            {shown.map((club, i) => {
              return (
                <motion.div
                  key={club.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    layout: { type: "spring", stiffness: 260, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className={
                    i % 2 === 0
                      ? "translate-y-2 md:translate-y-4"
                      : "-translate-y-2 md:-translate-y-4"
                  }
                >
                  <TiltCard club={club} />
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {list.length > BENTO_INITIAL && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              className="rounded-full border border-[#b96f65] bg-white px-6 py-2 font-semibold text-[#263f4b] transition-colors hover:bg-[#fff3e8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a75c4e]"
            >
              {expanded ? "Show less" : "Show all clubs"}
            </button>
          </div>
        )}
      </div>
    </motion.section>
  );
};

// ------------------------------------------------------
// Page
// ------------------------------------------------------
const DiscoverClubsPage = () => (
  <>
    <CoverFlow />
    <ClubBento />
  </>
);

export default DiscoverClubsPage;
