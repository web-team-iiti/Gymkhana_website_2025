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
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md border-b 
        ${isScrolled
        ? "bg-gray-900/60 border-gray-700 shadow-md"
        : "bg-gray-900 border-transparent"
      }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between py-5 mx-auto px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <Image src="/main_logo.png" width={40} height={40} className="h-10 w-auto" alt="Logo" priority />
          <span className="self-center text-xl sm:text-2xl font-bold whitespace-nowrap dark:text-white">
            <span className="text-yellow-500">Students'</span> Gymkhana
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
          </svg>
        </button>

        {/* Menu Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-bold text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-950 text-white md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            <NavbarLinks setIsMenuOpen={setIsMenuOpen} />
            <NavbarAuth setIsMenuOpen={setIsMenuOpen} />
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;