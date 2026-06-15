import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { FaSignInAlt, FaColumns } from "react-icons/fa";

const NavbarAuth = ({ setIsMenuOpen }) => {
  const { data: session } = useSession();

  return (
    <li className="mt-4 md:mt-0 md:ml-4 flex items-center">
      {session ? (
        // 1. LOGGED IN: Show ONLY Dashboard Button
        <Link 
          href="/dashboard" 
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
  );
};

export default NavbarAuth;
