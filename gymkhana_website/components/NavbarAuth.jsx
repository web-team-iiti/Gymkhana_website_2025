"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaSignInAlt, FaColumns } from "react-icons/fa";
import { motion, useReducedMotion } from "motion/react";

const NavbarAuth = ({ setIsMenuOpen }) => {
  const { data: session } = useSession();
  const [isLoginExpanded, setIsLoginExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <li className="mt-2 flex items-center px-3 md:ml-1 md:mt-0 md:px-0">
      {session ? (
        // 1. LOGGED IN: Show ONLY Dashboard Button
        <Link
          href="/dashboard"
          onClick={() => setIsMenuOpen(false)}
          className="flex items-center gap-2 rounded-full border border-black/25 px-4 py-2 text-sm font-bold text-black transition-colors hover:bg-black hover:text-white"
        >
          <FaColumns className="text-lg" />
          <span>Dashboard</span>
        </Link>
      ) : (
        // 2. LOGGED OUT: Show Login Button
        <motion.div
          onHoverStart={() => setIsLoginExpanded(true)}
          onHoverEnd={() => setIsLoginExpanded(false)}
        >
          <Link
            href="/login"
            onClick={() => setIsMenuOpen(false)}
            onFocus={() => setIsLoginExpanded(true)}
            onBlur={() => setIsLoginExpanded(false)}
            className={`flex h-10 items-center justify-center rounded-full border border-black/25 font-bold text-black transition-[width,background-color,color] focus-visible:bg-black focus-visible:text-white md:px-0 hover:bg-amber-50/90 hover:text-amber-950 hover:border hover:border-amber-200/60 hover:shadow-[0_3px_10px_rgba(217,119,6,0.12)] hover:-translate-y-0.5 duration-200  ${isLoginExpanded ? "md:w-24" : "md:w-10"} w-auto px-4`}
          >
            <motion.span
              className="shrink-0"
              animate={{ x: isLoginExpanded ? -2 : 0 }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              <FaSignInAlt />
            </motion.span>
            <motion.span
              className="hidden overflow-hidden whitespace-nowrap md:inline-block"
              initial={false}
              animate={{
                width: isLoginExpanded ? "auto" : 0,
                opacity: isLoginExpanded ? 1 : 0,
                marginLeft: isLoginExpanded ? 8 : 0,
              }}
              transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
            >
              Login
            </motion.span>
            <span className="ml-2 md:hidden">Login</span>
          </Link>
        </motion.div>
      )}
    </li>
  );
};

export default NavbarAuth;
