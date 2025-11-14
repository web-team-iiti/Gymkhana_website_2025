"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // Detect scroll to make navbar transparent
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

  // Active link helper
  const isActive = (path) =>
    pathname === path
      ? "text-yellow-700 dark:text-yellow-500"
      : "text-gray-900 dark:text-white hover:text-yellow-700 dark:hover:text-yellow-500";

  const isClubActive = pathname.startsWith("/club");

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 backdrop-blur-md border-b 
        ${
          isScrolled
            ? "bg-white/60 dark:bg-gray-900/60 border-gray-300 dark:border-gray-700 shadow-md"
            : "bg-white dark:bg-gray-900 border-transparent"
        }`}
    >
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between py-5 mx-auto px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/main_logo.png" className="h-10" alt="Logo" />
          <span className="self-center text-2xl font-bold whitespace-nowrap dark:text-white">
            <span className="text-yellow-500">Student's</span> Gymkhana
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none dark:text-gray-400 dark:hover:bg-gray-700"
        >
          <svg
            className="w-5 h-5"
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

        {/* Menu Links */}
        <div className={`${isMenuOpen ? "block" : "hidden"} w-full md:block md:w-auto`}>
          <ul className="flex flex-col font-bold text-xl p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">
            {/* Home */}
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link href="/" className={`block py-2 px-3 rounded md:p-0 ${isActive("/")}`}>
                Home
              </Link>
            </li>

            {/* Members */}
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link
                href="/members"
                className={`block py-2 px-3 rounded md:p-0 ${isActive("/members")}`}
              >
                Members
              </Link>
            </li>

            {/* Club Dropdown */}
            <li className="relative group">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-between w-full py-2 px-3 rounded md:w-auto md:p-0 ${
                  isClubActive
                    ? "text-yellow-700 dark:text-yellow-500"
                    : "text-gray-900 dark:text-white hover:text-yellow-700 dark:hover:text-yellow-500"
                }`}
              >
                Clubs
              </button>

              <div
                className={`absolute z-10 mt-2 font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600
                ${isDropdownOpen ? "block" : "hidden"} md:group-hover:block transition-all duration-200`}
              >
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
                  <li onClick={() => {setIsDropdownOpen(false);setIsMenuOpen(!isMenuOpen)}}>
                    <Link
                      href="/club/technical"
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${isActive(
                        "/club/technical"
                      )}`}
                    >
                      Technical Clubs
                    </Link>
                  </li>
                  <li onClick={() => {setIsDropdownOpen(false);setIsMenuOpen(!isMenuOpen)}}>
                    <Link
                      href="/club/cultural"
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${isActive(
                        "/club/cultural"
                      )}`}
                    >
                      Cultural Clubs
                    </Link>
                  </li>
                  <li onClick={() => {setIsDropdownOpen(false);setIsMenuOpen(!isMenuOpen)}}>
                    <Link
                      href="/club/sports"
                      className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white ${isActive(
                        "/club/sports"
                      )}`}
                    >
                      Sports Clubs
                    </Link>
                  </li>
                </ul>
              </div>
            </li>

            {/* Events */}
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link
                href="/events"
                className={`block py-2 px-3 rounded md:p-0 ${isActive("/events")}`}
              >
                Events
              </Link>
            </li>

            {/* Contact */}
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link
                href="/contact"
                className={`block py-2 px-3 rounded md:p-0 ${isActive("/contact")}`}
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
