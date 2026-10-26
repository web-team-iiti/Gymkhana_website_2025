import * as motion from "motion/react-client";
import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

/* Custom "Know More" button component can be reusable */

const ExploreMore = ({ href, text }) => {
  const contvariants = {
    rest: {
      paddingLeft: "1.25rem",
      paddingRight: "1.25rem",
      gap: "0.5rem",
    },
    hover: {
      paddingLeft: "1.5rem",
      paddingRight: "2rem",
      gap: "0.875rem",
    },
  };
  const eleVariants = {
    rest: { scaleX: 1, x: 0, originX: 0 },
    hover: { scaleX: 1.4, x: 2, originX: 0 },
  };

  return (
    <motion.div
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.8, y: 5 }}
      transition={{ type: "spring", stiffness: 600, damping: 20 }}
      className="w-fit"
    >
      <Link
        href={`/${href}`}
        className="group inline-flex items-center rounded-full border border-slate-300 bg-white text-sm font-semibold text-slate-700 shadow-sm transition-all hover:border-blue-500 hover:bg-blue-50 hover:text-blue-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600"
      >
        <motion.div
          variants={contvariants}
          transition={{ type: "spring", stiffness: 380, damping: 24 }}
          className="flex items-center py-2.5"
        >
          <span>{text}</span>

          <motion.span
            variants={eleVariants}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            className="inline-flex"
          >
            <FaArrowRight aria-hidden="true" />
          </motion.span>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export default ExploreMore;
