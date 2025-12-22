"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react"; // <--- 1. Import signOut
import { 
  FaHome, 
  FaFileAlt, 
  FaCheckDouble, 
  FaUsers, 
  FaBoxOpen, 
  FaArrowLeft, 
  FaBuilding,
  FaFileSignature,
  FaSignOutAlt 
} from "react-icons/fa";

// ... (Your MENU_ITEMS object remains the same) ...
const MENU_ITEMS = {
  club_head: [
    { name: "Overview", href: "/dashboard/club_head", icon: <FaHome /> },
    { name: "Create Proposal", href: "/dashboard/club_head/create-proposal", icon: <FaFileAlt /> },
    { name: "My Members", href: "/dashboard/club_head/members", icon: <FaUsers /> },
    { name: "Club Inventory", href: "/dashboard/club_head/inventory", icon: <FaBoxOpen /> },
  ],
  gs: [
    { name: "Overview", href: "/dashboard/general_secretary", icon: <FaHome /> },
    { name: "Pending Approvals", href: "/dashboard/general_secretary/approvals", icon: <FaCheckDouble /> },
    { name: "Verify PORs", href: "/dashboard/general_secretary/verify-members", icon: <FaUsers /> },
    { name: "Master Inventory", href: "/dashboard/general_secretary/inventory", icon: <FaBoxOpen /> },
  ],
  office: [
    { name: "Overview", href: "/dashboard/office", icon: <FaHome /> },
    { name: "Received Files", href: "/dashboard/office-files", icon: <FaBuilding /> },
    { name: "Budget Tracking", href: "/dashboard/budget", icon: <FaFileSignature /> },
  ],
  admin: [
    { name: "Overview", href: "/dashboard", icon: <FaHome /> }, // You can update this to specific adosa/dosa routes later
    { name: "Final Approvals", href: "/dashboard/final-approvals", icon: <FaCheckDouble /> },
    { name: "Archive", href: "/dashboard/archive", icon: <FaFileAlt /> },
  ]
};

const Sidebar = ({ userRole }) => {
  const pathname = usePathname();
  
  let roleKey = userRole;
  if (userRole === 'adosa' || userRole === 'dosa') roleKey = 'admin';
  
  const links = MENU_ITEMS[roleKey] || MENU_ITEMS["club_head"];

  return (
    <aside className="h-screen w-64 bg-gray-900 text-white flex flex-col border-r border-gray-800 fixed left-0 top-0 z-50">
      
      {/* --- Logo Area --- */}
      <div className="h-20 flex flex-col justify-center px-6 border-b border-gray-800 bg-gray-950">
        <h2 className="text-xl font-bold text-yellow-500 tracking-tight">
          Gymkhana<span className="text-white">Portal</span>
        </h2>
        <span className="text-[10px] uppercase tracking-widest text-gray-500 mt-1 font-semibold">
          {userRole?.replace("_", " ") || "Dashboard"}
        </span>
      </div>

      {/* --- Navigation Links --- */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {links.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link 
              key={link.href} 
              href={link.href}
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
        })}
      </nav>

      {/* --- BOTTOM SECTION: Back & Logout --- */}
      <div className="p-4 border-t border-gray-800 bg-gray-950 space-y-2">
        
        {/* 1. Back to Website */}
        <Link 
          href="/" 
          className="flex items-center gap-3 px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-900"
        >
          <FaArrowLeft className="text-xs" />
          <span>Back to Website</span>
        </Link>

        {/* 2. Logout Button */}
        <button 
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-4 py-2 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-400/10 transition-all rounded-lg"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;