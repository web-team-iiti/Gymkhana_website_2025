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
      className={`outfit-font fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-[#0d2234]/85 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/30 py-2 sm:py-2.5"
          : "bg-transparent border-b border-transparent py-3 sm:py-4"
      }`}
    >
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between gap-x-6 px-4 sm:px-6">
        {/* Main Logo & Bilingual Title */}
        <Link href="/" className="group flex min-w-0 items-center gap-3 text-white">
          <Image
            src="/main_logo.png"
            width={52}
            height={52}
            className="h-12 w-12 sm:h-13 sm:w-13 shrink-0 rounded-full object-contain p-0.5 transition-transform duration-200 group-hover:scale-105"
            alt="IIT Indore Students' Gymkhana"
            priority
          />
          <span
            className="h-10 w-px shrink-0 bg-white/30"
            aria-hidden="true"
          />
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] sm:text-xs font-semibold tracking-wide text-slate-100 drop-shadow-sm">
              भारतीय प्रौद्योगिकी संस्थान इंदौर
            </span>
            <span className="text-base sm:text-lg font-bold font-[Outfit,sans-serif] text-white tracking-tight drop-shadow-sm">
              Students&apos; Gymkhana
            </span>
          </span>
        </Link>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          aria-label={
            isMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMenuOpen}
          className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition-all md:hidden ${
            isScrolled
              ? "text-slate-200 hover:bg-white/10 hover:text-amber-300"
              : "bg-[#1b2a38]/85 backdrop-blur-md border border-white/20 text-white hover:text-amber-300 shadow-md"
          }`}
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

        {/* Navigation Capsule */}
        <div
          className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
        >
          <ul
            className={`mt-3 flex flex-col gap-1 p-3 text-xs md:text-xs lg:text-sm font-bold text-slate-200 transition-all duration-300 md:mt-0 md:flex-row md:items-center md:gap-1.5 md:rounded-full ${
              isScrolled
                ? "bg-[#0d2234]/95 border border-white/10 rounded-2xl md:bg-white/5 md:border-white/15 md:px-4 md:py-1.5 md:shadow-inner"
                : "bg-[#0d2234]/95 border border-white/15 rounded-2xl md:bg-[#1a2b3c]/85 md:backdrop-blur-md md:border-white/20 md:px-4 md:py-1.5 md:shadow-xl md:shadow-black/25"
            }`}
          >
            <NavbarLinks setIsMenuOpen={setIsMenuOpen} />
            <span
              className="hidden md:inline-block h-4 w-px bg-white/20 shrink-0 mx-1"
              aria-hidden="true"
            />
            <NavbarAuth setIsMenuOpen={setIsMenuOpen} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
