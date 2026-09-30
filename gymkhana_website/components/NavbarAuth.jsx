import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaSignInAlt, FaColumns } from "react-icons/fa";

const NavbarAuth = ({ setIsMenuOpen }) => {
  const { data: session } = useSession();

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
        <Link
          href="/login"
          onClick={() => setIsMenuOpen(false)}
          className="group flex items-center justify-center rounded-full border border-black/25 px-4 py-2 font-bold text-black transition-colors hover:bg-black hover:text-white"
        >
          <FaSignInAlt className="shrink-0" />
          <span className="ml-2 whitespace-nowrap">Login</span>
        </Link>
      )}
    </li>
  );
};

export default NavbarAuth;
