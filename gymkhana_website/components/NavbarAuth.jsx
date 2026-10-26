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
          className="flex items-center gap-1.5 rounded-full border border-white/25 px-3 py-1 text-xs font-bold text-slate-200 transition-colors hover:bg-white hover:text-[#0d2234] hover:border-white"
        >
          <FaColumns className="text-sm" />
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
            className={`flex h-8 items-center justify-center rounded-full border border-white/25 font-bold text-slate-200 transition-[width,background-color,color] focus-visible:bg-white focus-visible:text-[#0d2234] md:px-0 hover:bg-white hover:text-[#0d2234] hover:border-white duration-200 ${isLoginExpanded ? "md:w-20 text-xs" : "md:w-8 text-xs"} w-auto px-3.5`}
          >
            <motion.span
              className="shrink-0 text-xs"
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
