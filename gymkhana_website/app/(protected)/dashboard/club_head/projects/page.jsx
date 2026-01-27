


import React from "react";
import Link from "next/link";
import ProjectCard from "./ProjectCard";

import { auth } from "@/auth";
import { query } from "@/config/db";
import {
  FaPlus,
  FaClock,
  FaCheckCircle,
  FaTasks,
  FaSearch
} from "react-icons/fa";

/* =========================
   Get Club ID for Club Head
   ========================= */
async function getClubId(userId) {
  const res = await query(
    `
    SELECT club_id
    FROM clubs
    WHERE club_head_id = $1
    `,
    [userId]
  );

  return res.rows[0]?.club_id || null;
}

/* =========================
   Fetch Projects
   ========================= */
async function getClubProjects(clubId, search) {
  let sql = `
    SELECT
      project_id,
      title,
      description,
      status,
      created_at
    FROM club_projects
    WHERE club_id = $1
  `;
  const params = [clubId];

  if (search) {
    sql += ` AND title ILIKE $2`;
    params.push(`%${search}%`);
  }

  sql += ` ORDER BY created_at DESC`;

  const res = await query(sql, params);
  return res.rows;
}

/* =========================
   Fetch Stats
   ========================= */
async function getProjectStats(clubId) {
  const res = await query(
    `
    SELECT
      COUNT(*) AS total,
      COUNT(*) FILTER (WHERE status = 'IN_PROGRESS') AS in_progress,
      COUNT(*) FILTER (WHERE status = 'COMPLETED') AS completed
    FROM club_projects
    WHERE club_id = $1
    `,
    [clubId]
  );

  return res.rows[0];
}

/* =========================
   Status Badge
   ========================= */
const getStatusBadge = (status) => {
  switch (status) {
    case "IN_PROGRESS":
      return {
        label: "In Progress",
        color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/50",
        icon: <FaClock />
      };
    case "COMPLETED":
      return {
        label: "Completed",
        color: "bg-green-500/20 text-green-400 border-green-500/50",
        icon: <FaCheckCircle />
      };
    default:
      return {
        label: status,
        color: "bg-gray-700 text-gray-400 border-gray-600",
        icon: <FaTasks />
      };
  }
};

export default async function ClubProjectsPage({ searchParams }) {
  /* ---------- AUTH ---------- */
  const session = await auth();

  if (!session || session.user.role !== "club_head") {
    return (
      <div className="p-8 text-red-400">
        Unauthorized access
      </div>
    );
  }

  /* ---------- CLUB ID ---------- */
  const clubId = await getClubId(session.user.id);

  if (!clubId) {
    return (
      <div className="p-8 text-red-400">
        No club assigned to this account
      </div>
    );
  }

  const q = searchParams?.query || "";

  /* ---------- DATA ---------- */
  const [projects, stats] = await Promise.all([
    getClubProjects(clubId, q),
    getProjectStats(clubId)
  ]);

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto pb-20">

      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl md:text-3xl font-bold text-white">
            Club Projects
          </h1>
          <p className="text-gray-400 text-sm">
            Manage and track your club’s projects
          </p>
        </div>

        <Link
          href="/dashboard/club_head/projects/create"
          className="flex items-center gap-2 bg-yellow-500 text-gray-900 px-4 py-2 rounded-xl font-bold hover:bg-yellow-400 active:scale-95"
        >
          <FaPlus />
          Add Project
        </Link>
      </div>

      {/* ---------- STATS ---------- */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <StatBox label="Total" value={stats.total} icon={<FaTasks />} />
        <StatBox label="In Progress" value={stats.in_progress} icon={<FaClock />} />
        <StatBox label="Completed" value={stats.completed} icon={<FaCheckCircle />} />
      </div>

      {/* ---------- SEARCH ---------- */}
      <form className="mb-6">
        <div className="relative">
          <FaSearch className="absolute left-3 top-3 text-gray-500" />
          <input
            name="query"
            defaultValue={q}
            placeholder="Search projects..."
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-800 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-gray-700"
          />
        </div>
      </form>

      {/* ---------- PROJECT LIST ---------- */}
      <div className="space-y-3">
        {projects.length === 0 ? (
          <div className="text-center py-16 bg-gray-900 border border-gray-800 rounded-xl">
            <FaTasks className="text-4xl text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">
              {q ? "No matching projects found" : "No projects added yet"}
            </p>
          </div>
        ) : (
          projects.map((p) => {
            const badge = getStatusBadge(p.status);

            return (
            //   <div
            //     key={p.project_id}
            //     className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-xl hover:border-gray-700 transition-all"
            //   >
            //     <span
            //       className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold border ${badge.color}`}
            //     >
            //       {badge.icon}
            //       {badge.label}
            //     </span>

            //     <h3 className="text-lg md:text-xl font-bold text-white mt-2">
            //       {p.title}
            //     </h3>

            //     <p className="text-gray-400 text-sm mt-1">
            //       {p.description || "No description provided"}
            //     </p>

            //     <p className="text-gray-600 text-xs mt-3">
            //       Created on {new Date(p.created_at).toLocaleDateString()}
            //     </p>
            //   </div>
            <ProjectCard key={p.project_id} project={p} />

            );
          })
        )}
      </div>
    </div>
  );
}

/* =========================
   Stat Box
   ========================= */
const StatBox = ({ label, value, icon }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
    <div className="text-xl text-yellow-400 flex justify-center mb-1">
      {icon}
    </div>
    <div className="text-2xl font-bold text-white">{value}</div>
    <div className="text-xs uppercase text-gray-400">{label}</div>
  </div>
);
