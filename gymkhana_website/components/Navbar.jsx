"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import NavbarLinks from "./NavbarLinks";
import NavbarAuth from "./NavbarAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`outfit-font fixed left-0 top-0 z-50 w-full border-b transition-all duration-300 ${isScrolled ? "border-black/10 bg-[#fff8ed]/95 shadow-sm backdrop-blur-md" : "border-transparent bg-[#fff8ed]"}`}
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-x-6 px-4 py-3 sm:px-6">
        {/* Main Logo Here */}
        <Link href="/" className="flex min-w-0 items-center gap-3 text-black">
          <Image
            src="/main_logo.png"
            width={56}
            height={56}
            className="h-14 w-14 shrink-0 bg-gray-800/40 rounded-full object-contain"
            alt="IIT Indore Students' Gymkhana"
            priority
          />
          <span
            className="h-11 w-px shrink-0 bg-red-700/70"
            aria-hidden="true"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-black/60">
              IIT Indore
            </span>
            <span className="text-lg font-bold font-[Outfit,sans-serif] sm:text-xl">
              Students&apos; Gymkhana
            </span>
          </span>
        </Link>

        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-black/10 focus-visible:outline-solid focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black md:hidden"
        >
          <svg
            className="h-5 w-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>

        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul className="mt-3 flex flex-col gap-1 rounded-2xl bg-gray-200 p-3 text-sm font-bold text-black md:mt-0 md:flex-row md:items-center md:gap-7 md:rounded-full md:px-7 md:py-3">
            <NavbarLinks setIsMenuOpen={setIsMenuOpen} />
            <NavbarAuth setIsMenuOpen={setIsMenuOpen} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
