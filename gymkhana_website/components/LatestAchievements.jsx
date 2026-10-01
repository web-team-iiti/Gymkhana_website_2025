import * as motion from "motion/react-client";
import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import Achievement from "./Achievement";

const LatestAchievements = ({ achievements = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  return (
    <section className="w-full outfit-font bg-[#fff9f6] px-4 py-14 text-[#192b35] sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-xs font-bold uppercase text-[#b96f65]">
              A moment worth celebrating
            </p>
            <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
              Latest achievements
            </h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-[#657078] sm:text-base">
              The people and councils making an impact across the campus.
            </p>
          </div>
          <motion.div
            initial="rest"
            whileHover="hover"
            whileTap={{ scale: 0.97 }}
            variants={{ rest: { y: 0 }, hover: { y: -2 } }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="w-fit"
          >
            <Link
              href="/councils"
              className="group inline-flex items-center gap-2 rounded-full border border-[#c8bcb4] bg-[#fffefd] px-5 py-2.5 text-sm font-semibold text-[#263f4b] shadow-[0_3px_8px_rgba(74,48,31,0.1)] transition-colors hover:border-[#b96f65] hover:text-[#a4574e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a75c4e]"
            >
              Explore councils
              <motion.span
                variants={{ rest: { x: 0 }, hover: { x: 4 } }}
                className="inline-flex"
              >
                <FaArrowRight aria-hidden="true" />
              </motion.span>
            </Link>
          </motion.div>
        </div>

        {achievements.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="-mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto overscroll-x-contain px-4 pb-4 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-6 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3"
          >
            {achievements.map((achievement) => (
              <Achievement key={achievement.id} achievement={achievement} />
            ))}
          </motion.div>
        ) : (
          <div className="flex flex-col items-center rounded-lg border border-dashed border-[#d9ccc3] bg-[#fffdfb] px-6 py-12 text-center">
            <FaTrophy
              className="mb-4 text-3xl text-[#b96f65]"
              aria-hidden="true"
            />
            <h3 className="text-lg font-semibold text-[#263f4b]">
              New achievements are on the way
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-[#657078]">
              Council highlights will appear here as they are shared.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LatestAchievements;
