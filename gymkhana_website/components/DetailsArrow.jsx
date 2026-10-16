import React from "react";

/* Reusable Custom "Know More" component with Arrow */

const DetailsArrow = ({ Text }) => {
  return (
    <span className="mt-5 hover:text-blue-700 inline-flex items-center gap-5 text-xl font-semibold text-[#263f4b]">
      {Text}
      <span className="inline-flex h-4 w-5 items-center scale-250">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-5 overflow-visible"
          aria-hidden="true"
        >
          <line
            x1="4"
            y1="12"
            x2="14"
            y2="12"
            className="origin-left transition-transform duration-200 group-hover:scale-x-125"
          />
          <path
            d="m10 6 6 6-6 6"
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </svg>
      </span>
    </span>
  );
};

export default DetailsArrow;
