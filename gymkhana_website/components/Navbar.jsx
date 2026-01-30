"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react"; 
import { FaSignInAlt, FaColumns } from "react-icons/fa"; // Removed FaSignOutAlt since we don't need it here anymore

const Navbar = () => {
  const { data: session } = useSession(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  // --- 1. DEFINE ROUTES MAPPING ---
  const roleRoutes = {
    club_head: "/dashboard/club_head",
    gs: "/dashboard/general_secretary",
    office: "/dashboard/office",
    adosa: "/dashboard/adosa",
    dosa: "/dashboard/dosa",
  };

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

  const isActive = (path) =>
    pathname === path
      ? "text-yellow-700 dark:text-yellow-500"
      : "text-white hover:text-yellow-700 dark:hover:text-yellow-500";

  const isClubActive = pathname.startsWith("/club");

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
          <img src="/main_logo.png" className="h-10" alt="Logo" />
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
            {/* Standard Links */}
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link href="/" className={`block py-2 px-3 rounded md:p-0 ${isActive("/")}`}>Home</Link>
            </li>
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link href="/members" className={`block py-2 px-3 rounded md:p-0 ${isActive("/members")}`}>Members</Link>
            </li>

            {/* Club Dropdown */}
            <li className="relative group w-full md:w-auto">
              <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className={`flex items-center justify-between w-full py-2 px-3 rounded md:w-auto md:p-0 transition-colors ${isClubActive ? "text-yellow-500" : "text-white hover:text-yellow-500"}`}
              >
                <span>Clubs</span>
                <svg className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : 'rotate-0'}`} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                </svg>
              </button>
              <div className={`relative w-full overflow-hidden transition-all duration-300 ease-in-out ${isDropdownOpen ? "max-h-96 opacity-100 mt-2" : "max-h-0 opacity-0 md:opacity-100 md:max-h-none"} md:absolute md:z-10 md:mt-2 md:w-48 md:rounded-lg md:shadow-lg md:bg-gray-800 md:group-hover:block md:hidden ${isDropdownOpen ? "md:block" : ""}`}>
                <ul className="py-2 text-sm text-gray-300 bg-transparent md:bg-gray-800 rounded-lg border-l-2 border-yellow-500/50 md:border-0 ml-2 md:ml-0 pl-2 md:pl-0">
                  <li onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false) }}>
                    <Link href="/club/technical" className={`block px-4 py-2 hover:text-white md:hover:bg-gray-600 ${isActive("/club/technical")}`}>Technical Clubs</Link>
                  </li>
                  <li onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false) }}>
                    <Link href="/club/cultural" className={`block px-4 py-2 hover:text-white md:hover:bg-gray-600 ${isActive("/club/cultural")}`}>Cultural Clubs</Link>
                  </li>
                  <li onClick={() => { setIsDropdownOpen(false); setIsMenuOpen(false) }}>
                    <Link href="/club/sports" className={`block px-4 py-2 hover:text-white md:hover:bg-gray-600 ${isActive("/club/sports")}`}>Sports Clubs</Link>
                  </li>
                </ul>
              </div>
            </li>

            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link href="/events" className={`block py-2 px-3 rounded md:p-0 ${isActive("/events")}`}>Events</Link>
            </li>
            <li onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Link href="/contact" className={`block py-2 px-3 rounded md:p-0 ${isActive("/contact")}`}>Contact</Link>
            </li>

            {/* --- UPDATED: Login / Dashboard Logic --- */}
            <li className="mt-4 md:mt-0 md:ml-4 flex items-center">
              {session ? (
                // 1. LOGGED IN: Show ONLY Dashboard Button
                <Link 
                  href={roleRoutes[session.user.role] || "/dashboard"} 
                  onClick={() => setIsMenuOpen(false)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full border border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-gray-900 transition-all font-bold text-sm shadow-[0_0_10px_rgba(234,179,8,0.2)] hover:shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                >
                  <FaColumns className="text-lg" />
                  <span>Dashboard</span>
                </Link>
              ) : (
                // 2. LOGGED OUT: Show Login Button
                <Link href="/login" onClick={() => setIsMenuOpen(false)}
                  className="group flex items-center justify-center px-6 py-2 md:px-2 md:py-1 rounded-full bg-yellow-500 text-gray-900 font-bold transition-all duration-300 shadow-[0_0_10px_rgba(234,179,8,0.5)] hover:bg-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.8)] md:hover:scale-105 md:hover:pr-5"
                >
                  <FaSignInAlt className="text-xl md:text-md shrink-0" />
                  <span className="whitespace-nowrap transition-all duration-300 ease-in-out max-w-xs opacity-100 ml-2 md:max-w-0 md:opacity-0 md:ml-0 md:group-hover:max-w-xs md:group-hover:opacity-100 md:group-hover:ml-2">
                    Login
                  </span>
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;