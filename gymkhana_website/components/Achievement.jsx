import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

const Achievement = ({ achievement }) => {
  const date = achievement.achievement_date
    ? new Date(achievement.achievement_date)
    : null;
  const validDate = date && !Number.isNaN(date.getTime()) ? date : null;

  return (
    <Link
      href={`/councils/${achievement.council_id}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-[#eadfd6] bg-[#fffdfb] shadow-[0_2px_8px_rgba(60,39,27,0.05)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(60,39,27,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#b96f65]"
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-[#eee4dc]">
        {achievement.image_url ? (
          <img
            src={achievement.image_url}
            alt={achievement.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
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
              className="text-xs text-[#7b8184]"
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
        <p className="mt-3 flex-1 text-sm leading-6 text-[#657078] line-clamp-3">
          {achievement.description}
        </p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#263f4b]">
          More from this council
          <FaArrowRight
            className="transition-transform group-hover:translate-x-1"
            aria-hidden="true"
          />
        </span>
      </div>
    </Link>
  );
};

export default Achievement;
