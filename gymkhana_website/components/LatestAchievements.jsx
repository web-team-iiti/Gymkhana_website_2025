import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

const LatestAchievements = ({ achievements = [] }) => {
  return (
    <section className="w-full outfit-font bg-[#f7f0e9] px-4 py-14 text-[#192b35] sm:px-6 md:py-20">
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
          <Link
            href="/councils"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-[#c8bcb4] px-5 py-2.5 text-sm font-semibold text-[#263f4b] transition-colors hover:border-[#b96f65] hover:text-[#a4574e]"
          >
            Explore councils <FaArrowRight aria-hidden="true" />
          </Link>
        </div>

        {achievements.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {achievements.map((achievement) => (
              <Link
                key={achievement.id}
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
                      {achievement.council_name?.replace(" Council", "") ||
                        "Gymkhana"}
                    </span>
                    <time
                      className="text-xs text-[#7b8184]"
                      dateTime={new Date(
                        achievement.achievement_date,
                      ).toISOString()}
                    >
                      {new Date(
                        achievement.achievement_date,
                      ).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </time>
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
            ))}
          </div>
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
