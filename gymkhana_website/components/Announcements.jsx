import * as motion from "motion/react-client";
import ExploreMore from "./ExploreMoreButton";

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
// Note: I dont know the Database Query yet so the row names might not match and be incomplete with database rows and no rows are returned so ann is hardcoded on line no. 50 - I will update it fully once i know the rows and query

const Announcements = ({ announcements = [] }) => {
  if (!announcements) announcements = [];

  return (
    <section className="w-full outfit-font bg-white px-4 py-14 text-slate-900 sm:px-6 md:py-20 border-b border-slate-200">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <p className="mb-2 text-xs font-bold uppercase tracking-wider text-blue-600">
            From across the campus
          </p>
          <h2 className="text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">
            Announcements
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
            Official updates, announcements, and useful links from the Gymkhana community.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {ann.map(({ title, description, href }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 320, damping: 22 },
              }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              className="group flex min-h-60 flex-col items-start rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm transition-all duration-300 hover:border-blue-400 hover:bg-white hover:shadow-xl sm:p-7"
            >
              <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700 sm:text-2xl">
                {title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-6 text-slate-600 sm:text-base">
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
