import * as motion from "motion/react-client";
import Link from "next/link";
import { FaArrowRight, FaTrophy } from "react-icons/fa";

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
      whileTap={{ scale: 0.97 }}
      className="w-fit"
    >
      <Link
        href={`/${href}`}
        className="group inline-flex items-center rounded-full border border-[#c8bcb4] bg-[#fffefd] text-sm font-semibold text-[#263f4b] shadow-[0_3px_8px_rgba(74,48,31,0.1)] transition-colors hover:border-[#b96f65] hover:text-[#a4574e] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#a75c4e]"
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
