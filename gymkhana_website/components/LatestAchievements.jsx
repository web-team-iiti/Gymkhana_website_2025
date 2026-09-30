import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";
import Achievement from "./Achievement";

const LatestAchievements = ({ achievements = [] }) => {
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
              <Achievement key={achievement.id} achievement={achievement} />
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
