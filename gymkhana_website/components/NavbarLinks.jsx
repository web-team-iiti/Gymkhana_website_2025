import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = ({ setIsMenuOpen }) => {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState(null);

  const isActive = (path) => pathname === path;
  const isClubActive = pathname.startsWith("/club");
  const isIBCCActive = pathname.startsWith("/ibcc");

  const getItemStyles = (active) =>
    active
      ? "bg-amber-200 text-amber-950 border border-amber-200/60 shadow-[0_4px_14px_rgba(217,119,6,0.15)] rounded-full uppercase tracking-wide font-[Outfit,sans-serif] font-bold"
      : "text-stone-700 hover:bg-amber-50/90 hover:text-amber-950 hover:border hover:border-amber-200/60 hover:shadow-[0_3px_10px_rgba(217,119,6,0.12)] hover:-translate-y-0.5 font-[Outfit,sans-serif] transition-all duration-200 font-bold rounded-full uppercase tracking-wide";

  const closeMenus = () => {
    setOpenDropdown(null);
    setIsMenuOpen(false);
  };

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const navItemBase =
    "flex items-center justify-between w-full md:w-auto px-4 py-2 rounded-xl text-base transition-all duration-200";

  return (
    <>
      <li>
        <Link
          href="/"
          onClick={() => setIsMenuOpen(false)}
          className={`${navItemBase} ${getItemStyles(isActive("/"))}`}
        >
          Home
        </Link>
      </li>

      <li>
        <Link
          href="/members"
          onClick={() => setIsMenuOpen(false)}
          className={`${navItemBase} ${getItemStyles(isActive("/members"))}`}
        >
          Members
        </Link>
      </li>

      {/* Club Dropdown */}
      <li className="relative group w-full md:w-auto">
        <button
          onClick={() => toggleDropdown("clubs")}
          className={`${navItemBase} ${getItemStyles(isClubActive)}`}
        >
          <span>Clubs</span>
          <svg
            className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${
              openDropdown === "clubs" ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          className={`relative w-full overflow-hidden transition-all duration-300 ease-in-out ${
            openDropdown === "clubs"
              ? "mt-2 max-h-96 opacity-100"
              : "max-h-0 opacity-0 md:max-h-0"
          } md:absolute md:left-0 md:top-full md:z-10 md:mt-2 md:w-52 md:rounded-2xl md:bg-amber-50/90 md:p-1.5 md:shadow-xl md:ring-1 md:ring-amber-900/10 md:backdrop-blur-md`}
        >
          <ul className="ml-2 space-y-1 rounded-lg border-l-2 border-amber-200/60 py-2 pl-2 md:ml-0 md:border-0 md:py-0 md:pl-0">
            <li>
              <Link
                href="/club/technical"
                onClick={closeMenus}
                className={`block px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${getItemStyles(
                  isActive("/club/technical"),
                )}`}
              >
                Technical Clubs
              </Link>
            </li>
            <li>
              <Link
                href="/club/cultural"
                onClick={closeMenus}
                className={`block px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${getItemStyles(
                  isActive("/club/cultural"),
                )}`}
              >
                Cultural Clubs
              </Link>
            </li>
            <li>
              <Link
                href="/club/sports"
                onClick={closeMenus}
                className={`block px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${getItemStyles(
                  isActive("/club/sports"),
                )}`}
              >
                Sports Clubs
              </Link>
            </li>
          </ul>
        </div>
      </li>

      <li>
        <Link
          href="/events"
          onClick={() => setIsMenuOpen(false)}
          className={`${navItemBase} ${getItemStyles(isActive("/events"))}`}
        >
          Events
        </Link>
      </li>

      {/* IBCC Dropdown (Mobile Only) */}
      <li className="relative group w-full md:hidden">
        <button
          onClick={() => toggleDropdown("ibcc")}
          className={`${navItemBase} ${getItemStyles(isIBCCActive)}`}
        >
          <span>IBCC</span>
          <svg
            className={`w-2.5 h-2.5 ms-2.5 transition-transform duration-300 ${
              openDropdown === "ibcc" ? "rotate-180" : "rotate-0"
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 4 4 4-4"
            />
          </svg>
        </button>

        <div
          className={`relative w-full overflow-hidden transition-all duration-300 ease-in-out ${
            openDropdown === "ibcc"
              ? "mt-2 max-h-96 opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >
          <ul className="ml-2 space-y-1 rounded-lg border-l-2 border-amber-200/60 py-2 pl-2">
            <li>
              <Link
                href="/ibcc/leaderboard"
                onClick={closeMenus}
                className={`block px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${getItemStyles(
                  isActive("/ibcc/leaderboard"),
                )}`}
              >
                Leaderboard
              </Link>
            </li>
            <li>
              <Link
                href="/ibcc/schedule"
                onClick={closeMenus}
                className={`block px-3.5 py-2 rounded-lg text-sm transition-all duration-150 ${getItemStyles(
                  isActive("/ibcc/schedule"),
                )}`}
              >
                Schedule
              </Link>
            </li>
          </ul>
        </div>
      </li>

      <li>
        <Link
          href="/contact"
          onClick={() => setIsMenuOpen(false)}
          className={`${navItemBase} ${getItemStyles(isActive("/contact"))}`}
        >
          Contact
        </Link>
      </li>
    </>
  );
};

export default NavbarLinks;
