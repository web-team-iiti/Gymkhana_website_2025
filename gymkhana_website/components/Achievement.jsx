import Link from "next/link";
import * as motion from "motion/react-client";
import { FaTrophy } from "react-icons/fa";
import DetailsArrow from "./DetailsArrow";

const Achievement = ({ achievement }) => {
  const date = achievement.achievement_date
    ? new Date(achievement.achievement_date)
    : null;
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null;

  const cardVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  return (
    <Link
      href={`/councils/${achievement.council_id}`}
      className="block w-[86%] min-w-[275px] max-w-[360px] shrink-0 snap-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a75c4e] sm:w-auto sm:min-w-0 sm:max-w-none sm:shrink"
    >
      <motion.div
        variants={cardVariants}
        whileHover={{
          y: -10,
          scale: 1.03,
          transition: { type: "spring", stiffness: 320, damping: 22 },
        }}
        className="group flex h-full min-h-[25rem] flex-col overflow-hidden rounded-lg border border-[#e7d4c8] bg-[#fffefd] shadow-[0_5px_14px_rgba(74,48,31,0.13)] transition-[border-color,box-shadow] duration-300 hover:border-[#d9aaa0] hover:shadow-[0_16px_32px_rgba(74,48,31,0.2)]"
      >
        <div className="relative aspect-[16/9] overflow-hidden bg-[#f3e4da]">
          {achievement.image_url ? (
            <img
              src={achievement.image_url}
              alt={achievement.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
            />
          ) : (
            <div
              className="flex h-full items-center justify-center text-[#b96f65]"
              aria-hidden="true"
            >
              <FaTrophy size={30} />
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
            <span
              className="text-xs font-bold uppercase"
              style={{ color: achievement.council_color || "#b96f65" }}
            >
              {achievement.council_name?.replace(" Council", "") || "Gymkhana"}
            </span>
            {validDate && (
              <time
                className="text-xs text-[#6b7073]"
                dateTime={validDate.toISOString()}
              >
                {validDate.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                  timeZone: "UTC",
                })}
              </time>
            )}
          </div>
          <h3 className="text-lg font-semibold leading-snug text-[#192b35] line-clamp-2">
            {achievement.title}
          </h3>
          <p className="mt-3 flex-1 text-sm leading-6 text-[#59646b] line-clamp-3">
            {achievement.description}
          </p>
          <DetailsArrow Text={"More from this Council"} />
        </div>
      </motion.div>
    </Link>
  );
};

export default Achievement;
