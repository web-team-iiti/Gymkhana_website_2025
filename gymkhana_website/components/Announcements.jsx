"use client";

import { useState } from "react";
import { motion } from "motion/react";
import ExploreMore from "./ExploreMoreButton";
import TypeWriter from "../animations/TypeWriter";

// Announcement table need to be created in the database - For now dummy announcements are here
// Schema must match the below dummy
// Dummy data
const ann = [
  {
    title: "Campus events",
    description: "Explore upcoming activities.",
    href: "events",
  },
  {
    title: "IBCC schedule",
    description:
      "See the schedule and key dates for the Inter-Branch Cultural Clash.",
    href: "ibcc/schedule",
  },
  {
    title: "Student councils",
    description:
      "Meet the councils shaping campus life and discover their initiatives.",
    href: "councils",
  },
];
// Note: swap `ann` for `announcements` once the DB query and row names are final.

// Trapezoid: wide at the top, slanting inward toward the bottom
const TRAPEZOID = "polygon(0 0, 100% 0, 97% 100%, 3% 100%)";

const CARD_H = 288; // full height of one card
const STRIP = 152; // how much of each card is visible at rest
const LIFT = 12; // how far the hovered card
const REVEAL = 120; // how far the cards BELOW slide down to uncover the hovered card's body

const Announcements = ({ announcements = [] }) => {
  const [active, setActive] = useState(null);
  const last = ann.length - 1;

  const activate = (i) => setActive(i);
  const deactivate = (i) => setActive((prev) => (prev === i ? null : prev));

  return (
    <section className="w-full outfit-font bg-white px-4 py-14 text-black sm:px-6 md:py-20">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 sm:mb-14">
          <TypeWriter
            as="p"
            text="From across the campus"
            speed={30}
            className="mb-2 text-xs font-bold uppercase tracking-widest text-blue-600"
          />
          <TypeWriter
            as="h2"
            text="Announcements"
            speed={60}
            delay={500}
            cursorClassName="bg-black"
            className="text-3xl font-semibold leading-tight text-black sm:text-5xl"
          />
          <TypeWriter
            as="p"
            text="Updates and useful links from the Gymkhana community."
            speed={15}
            delay={1400}
            className="mt-2 max-w-xl text-sm leading-6 text-neutral-500 sm:text-base"
          />
        </div>

        <div className="flex flex-col pb-12">
          {ann.map(({ title, description, href }, index) => {
            const isActive = active === index;
            // cards after the active one slide down to uncover it
            const pushedDown = active !== null && index > active;

            return (
              // Outer: entrance animation + layout (overlap) + stacking order
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.15,
                  ease: "easeOut",
                }}
                style={{
                  zIndex: index + 1,
                  height: CARD_H,
                  marginBottom: index < last ? -(CARD_H - STRIP) : 0,
                }}
                className="relative"
              >
                {/* Inner: the hover lift / slide-down animation */}
                <motion.article
                  tabIndex={0}
                  data-active={isActive}
                  animate={{
                    y: isActive ? -LIFT : pushedDown ? REVEAL : 0,
                  }}
                  transition={{ type: "spring", stiffness: 260, damping: 28 }}
                  onPointerEnter={(e) =>
                    e.pointerType === "mouse" && activate(index)
                  }
                  onPointerLeave={(e) =>
                    e.pointerType === "mouse" && deactivate(index)
                  }
                  // tap to toggle on touch screens
                  onPointerDown={(e) => {
                    if (e.pointerType === "touch")
                      setActive((prev) => (prev === index ? null : index));
                  }}
                  onFocus={() => activate(index)}
                  onBlur={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget))
                      deactivate(index);
                  }}
                  className="group relative h-full cursor-pointer outline-none [filter:drop-shadow(0_-6px_10px_rgba(0,0,0,0.25))]"
                >
                  <div
                    style={{ clipPath: TRAPEZOID }}
                    className="h-full w-full bg-gradient-to-b from-gray-500 to-gray-300 px-[8%] pt-5 transition-colors duration-300 group-data-[active=true]:from-gray-800 group-data-[active=true]:to-gray-950"
                  >
                    <span className="absolute right-[6%] top-4 font-mono text-sm italic text-blue-900 transition-colors duration-300 group-data-[active=true]:text-blue-300 sm:text-base">
                      {String(index + 1).padStart(2, "0")}/
                    </span>

                    {/* Heading - always visible */}
                    <h3 className="text-2xl font-bold leading-tight text-blue-900 transition-colors duration-300 group-data-[active=true]:text-white sm:text-4xl">
                      {title}
                    </h3>

                    {/* Details (revealed when active) */}
                    <div className="pointer-events-none mt-4 translate-y-2 opacity-0 transition-all duration-300 group-data-[active=true]:pointer-events-auto group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                      <p className="max-w-md text-sm leading-6 text-neutral-200 sm:text-base">
                        {description}
                      </p>
                      <div className="mt-4">
                        <ExploreMore href={href} text="Know More" />
                      </div>
                    </div>
                  </div>
                </motion.article>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
