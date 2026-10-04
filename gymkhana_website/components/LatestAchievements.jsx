import * as motion from "motion/react-client";
import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import ExploreMore from "./ExploreMoreButton";
import Achievement from "./Achievement";

const LatestAchievements = ({ achievements = [] }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };
  const href = "councils";
  const Text = "Explore Councils";

  return (
    <section className="w-full outfit-font bg-[#fff8ed] px-4 py-14 text-[#192b35] sm:px-6 md:py-20">
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
          <ExploreMore href={href} text={Text} />
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
