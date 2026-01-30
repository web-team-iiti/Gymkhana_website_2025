"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react"; // 👈 Added useSession
import {
  FaHome, FaCalendarAlt,
  FaFileAlt, FaRegFileArchive,
  FaCheckDouble,
  FaUsers,
  FaBoxOpen,
  FaArrowLeft,
  FaBuilding,
  FaFileSignature,
  FaSignOutAlt,
  FaChevronRight, FaFileInvoiceDollar
} from "react-icons/fa";

const MENU_ITEMS = {
  club_head: [
    { name: "Overview", href: "/dashboard/club_head", icon: <FaHome /> },
    { name: "Create Proposal", href: "/dashboard/club_head/create-proposal", icon: <FaFileAlt /> },
    { name: "My Members", href: "/dashboard/club_head/members", icon: <FaUsers /> },
    { name: "Club Inventory", href: "/dashboard/club_head/inventory", icon: <FaBoxOpen /> },
  ],
  gs: [
    { name: "Overview", href: "/dashboard/general_secretary", icon: <FaHome /> },
    { name: "Create Proposal", href: "/dashboard/general_secretary/create", icon: <FaFileAlt /> },
    { name: "Pending Approvals", href: "/dashboard/approvals", icon: <FaCheckDouble /> },
    { name: "My Proposals", href: "/dashboard/general_secretary/my-proposals", icon: <FaFileSignature /> },
    { name: "Verify PORs", href: "/dashboard/verify-members", icon: <FaUsers /> },
    { name: "Manage Events", href: "/dashboard/general_secretary/events", icon: <FaCalendarAlt /> },
    { name: "Master Inventory", href: "/dashboard/general_secretary/inventory", icon: <FaBoxOpen /> },
    { name: "Bill Repository", href: "/dashboard/general_secretary/bills", icon: <FaFileInvoiceDollar /> },
  ],
  office: [
    { name: "Overview", href: "/dashboard/office", icon: <FaHome /> },
    { name: "Received Files", href: "/dashboard/office/files", icon: <FaBuilding /> },
    // { name: "Budget Tracking", href: "/dashboard/office/budget", icon: <FaFileSignature /> },
    { name: "Master Inventory", href: "/dashboard/office/inventory", icon: <FaBoxOpen /> },
    { name: "Bill Repository", href: "/dashboard/office/bills", icon: <FaFileInvoiceDollar /> },
  ],
  adosa: [
    { name: "Overview", href: "/dashboard/adosa", icon: <FaHome /> },
    { name: "Pending Approvals", href: "/dashboard/adosa/files", icon: <FaCheckDouble /> },
    // { name: "Review History", href: "/dashboard/adosa/history", icon: <FaFileAlt /> },
    { name: "Master Inventory", href: "/dashboard/adosa/inventory", icon: <FaBoxOpen /> },
    { name: "Bill Repository", href: "/dashboard/adosa/bills", icon: <FaFileInvoiceDollar /> },
  ],
  dosa: [
    { name: "Overview", href: "/dashboard/dosa", icon: <FaHome /> },
    { name: "Final Approvals", href: "/dashboard/dosa/files", icon: <FaCheckDouble /> },
    { name: "Archive", href: "/dashboard/dosa/archive", icon: <FaRegFileArchive /> },
    { name: "Master Inventory", href: "/dashboard/dosa/inventory", icon: <FaBoxOpen /> },
    { name: "Bill Repository", href: "/dashboard/dosa/bills", icon: <FaFileInvoiceDollar /> },
  ],
};

const Sidebar = ({ userRole }) => {
  const pathname = usePathname();
  const { data: session } = useSession(); // 👈 Access session data
  const [isOpen, setIsOpen] = useState(false);

  // Logic to determine links
  let roleKey = userRole;
  if (!MENU_ITEMS[roleKey] && (userRole === 'admin')) roleKey = 'dosa';
  const links = MENU_ITEMS[roleKey] || [];

  // 👈 Extract Club Name safely
  const clubName = session?.user?.club_name;

  return (
    <>
      {/* --- BACKDROP (Mobile Only) --- */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsOpen(false)}
      />

      {/* --- SIDEBAR CONTAINER --- */}
      <aside className={`
        fixed top-0 left-0 h-full w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800 z-50
        transition-transform duration-300 ease-in-out shadow-2xl
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0 md:static md:shadow-none
      `}>

        {/* --- THE DRAWER HANDLE (Mobile Only) --- */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden absolute top-1/2 -right-8 -translate-y-1/2 bg-yellow-500 text-gray-900 p-2 rounded-r-lg shadow-lg border-y border-r border-yellow-400 flex items-center justify-center w-8 h-12 outline-none z-50"
        >
          <FaChevronRight
            size={16}
            className={`transition-transform duration-300 ${isOpen ? "rotate-180" : "rotate-0"}`}
          />
        </button>

        {/* --- Logo Area --- */}
        <div className="h-24 flex flex-col justify-center px-6 border-b border-gray-800 bg-gray-950">
          <h2 className="text-xl font-bold text-yellow-500 tracking-tight">
            Gymkhana <span className="text-white">Portal</span>
          </h2>

          <div className="flex flex-col mt-1">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">
              {userRole?.replace("_", " ") || "Dashboard"}
            </span>

            {/* 👇 LOGIC: If Club Head & Club Name exists, show it */}
            {userRole === 'club_head' && clubName && (
              <span className="text-xs font-bold text-yellow-500 uppercase tracking-wider truncate mt-0.5">
                {clubName}
              </span>
            )}
          </div>
        </div>

        {/* --- Navigation Links --- */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          {links.length > 0 ? (
            links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                    ${isActive
                      ? "bg-yellow-500 text-gray-900 font-bold shadow-[0_0_15px_rgba(234,179,8,0.3)]"
                      : "text-gray-400 hover:bg-gray-800 hover:text-white"
                    }`}
                >
                  <span className={`text-lg transition-transform duration-300 ${!isActive && "group-hover:scale-110"}`}>
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium tracking-wide">{link.name}</span>
                </Link>
              );
            })
          ) : (
            <div className="text-gray-500 text-center text-sm mt-10">No Access</div>
          )}
        </nav>

        {/* --- Footer Actions --- */}
        <div className="p-4 border-t border-gray-800 bg-gray-950 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-900"
          >
            <FaArrowLeft className="text-xs" />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all rounded-lg"
          >
            <FaSignOutAlt />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;