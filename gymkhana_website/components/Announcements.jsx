import * as motion from "motion/react-client";
import { FaCalendarAlt, FaTheaterMasks, FaUsers } from "react-icons/fa";
import ExploreMore from "./ExploreMore";

// Dummy data
const ann = [
  {
    title: "Campus events",
    description:
      "Explore upcoming activities, event details, and opportunities to take part.",
    href: "events",
    icon: FaCalendarAlt,
  },
  {
    title: "IBCC schedule",
    description:
      "See the schedule and key dates for the Inter-Branch Cultural Competition.",
    href: "ibcc/schedule",
    icon: FaTheaterMasks,
  },
  {
    title: "Student councils",
    description:
      "Meet the councils shaping campus life and discover their initiatives.",
    href: "councils",
    icon: FaUsers,
  },
];

const Announcements = ({ announcements = ann }) => {
  if (!announcements) announcements = ann;

  return (
    <section className="w-full outfit-font bg-[#fff9f6] px-4 py-14 text-[#192b35] sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase text-[#b96f65]">
            From across the campus
          </p>
          <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
            Announcements
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-[#657078] sm:text-base">
            Updates and useful links from the Gymkhana community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3">
          {ann.map(({ title, description, href, icon: Icon }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.9,
                delay: index * 0.15,
                ease: "easeOut",
              }}
              className="flex min-h-60 flex-col items-start rounded-lg border border-[#f0e1d4] bg-[#fff3e8] p-6 shadow-[0_3px_10px_rgba(74,48,31,0.12)] sm:p-7"
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#f4dfd4] text-[#b96f65]"
                aria-hidden="true"
              >
                <Icon />
              </div>
              <h3 className="text-xl font-semibold leading-snug text-[#bd746b] sm:text-2xl">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-[#26343b] sm:text-base">
                {description}
              </p>
              <div className="mt-5">
                <ExploreMore href={href} text="Know More" />
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcements;
