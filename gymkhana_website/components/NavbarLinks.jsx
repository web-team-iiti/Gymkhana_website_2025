import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavbarLinks = ({ setIsMenuOpen }) => {
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const isActive = (path) =>
    pathname === path
      ? "text-yellow-700 dark:text-yellow-500"
      : "text-white hover:text-yellow-700 dark:hover:text-yellow-500";

  const isClubActive = pathname.startsWith("/club");

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMenuOpen(false);
  };

  return (
    <>
      <li>
        <Link href="/" onClick={() => setIsMenuOpen(false)} className={`block py-2 px-3 rounded md:p-0 ${isActive("/")}`}>Home</Link>
      </li>
      <li>
        <Link href="/members" onClick={() => setIsMenuOpen(false)} className={`block py-2 px-3 rounded md:p-0 ${isActive("/members")}`}>Members</Link>
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
            <li>
              <Link href="/club/technical" onClick={closeMenus} className={`block px-4 py-2 hover:text-white md:hover:bg-gray-600 ${isActive("/club/technical")}`}>Technical Clubs</Link>
            </li>
            <li>
              <Link href="/club/cultural" onClick={closeMenus} className={`block px-4 py-2 hover:text-white md:hover:bg-gray-600 ${isActive("/club/cultural")}`}>Cultural Clubs</Link>
            </li>
            <li>
              <Link href="/club/sports" onClick={closeMenus} className={`block px-4 py-2 hover:text-white md:hover:bg-gray-600 ${isActive("/club/sports")}`}>Sports Clubs</Link>
            </li>
          </ul>
        </div>
      </li>

      <li>
        <Link href="/events" onClick={() => setIsMenuOpen(false)} className={`block py-2 px-3 rounded md:p-0 ${isActive("/events")}`}>Events</Link>
      </li>
      <li>
        <Link href="/contact" onClick={() => setIsMenuOpen(false)} className={`block py-2 px-3 rounded md:p-0 ${isActive("/contact")}`}>Contact</Link>
      </li>
    </>
  );
};

export default NavbarLinks;
