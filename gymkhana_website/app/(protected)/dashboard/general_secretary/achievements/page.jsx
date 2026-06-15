import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { FaPlus, FaLayerGroup, FaImage } from "react-icons/fa";
import SearchInput from "@/components/SearchInput";
import CouncilFilter from "@/components/CouncilFilter";

async function getAchievements(queryText, filter) {
  let sql = `
    SELECT a.*, c.name as council_name, c.color as council_color
    FROM council_achievements a
    JOIN councils c ON a.council_id = c.id
    WHERE 1=1
  `;
  const params = [];
  let paramIndex = 1;

  if (queryText) {
      sql += ` AND (a.title ILIKE $${paramIndex} OR a.description ILIKE $${paramIndex})`;
      params.push(`%${queryText}%`);
      paramIndex++;
  }

  if (filter && filter !== 'all') {
      sql += ` AND a.council_id = $${paramIndex}`;
      params.push(filter);
      paramIndex++;
  }

  sql += ` ORDER BY a.achievement_date DESC`;

  try {
      const res = await query(sql, params);
      return res.rows;
  } catch (error) {
      console.error(error);
      return [];
  }
}

async function getCouncils() {
    const sql = "SELECT id, name FROM councils ORDER BY name ASC";
    try {
        const res = await query(sql);
        return res.rows;
    } catch (e) { return []; }
}

export default async function AchievementsDashboardPage({ searchParams }) {
  const { query: queryText, filter } = await searchParams;
  const achievements = await getAchievements(queryText, filter);
  const councils = await getCouncils();

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 pb-24">
      {/* HEADER */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Manage Achievements</h1>
            <p className="text-xs md:text-base text-gray-400 mt-1 hidden md:block">Add, edit or remove council achievements.</p>
          </div>
          <Link
            href="/dashboard/general_secretary/achievements/create"
            className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-3.5 py-3 md:px-6 md:py-3 rounded-xl font-bold active:scale-95 transition-all shadow-lg shadow-yellow-500/10"
          >
            <FaPlus size={16} /> 
            <span className="hidden md:inline">Add Achievement</span>
          </Link>
        </div>
        
        {/* Row 2: Search & Filter */}
        <div className="flex gap-3">
            <div className="flex-1">
                <SearchInput placeholder="Search achievements..." />
            </div>
            <div className="shrink-0">
                <CouncilFilter councils={councils} /> 
            </div>
        </div>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {achievements.length === 0 ? (
          <div className="col-span-full flex flex-col items-center justify-center text-center py-16 md:py-24 bg-gray-900/50 rounded-2xl border-2 border-dashed border-gray-800">
            <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center text-gray-600 mb-4">
                <FaLayerGroup size={28} />
            </div>
            <h3 className="text-white font-bold text-lg">No achievements found</h3>
            <p className="text-gray-500 text-sm mt-1 max-w-xs mx-auto">
                Try adjusting your search or click 'Add Achievement' to create one.
            </p>
          </div>
        ) : (
          achievements.map((ach) => (
            <Link 
              href={`/dashboard/general_secretary/achievements/${ach.id}`}
              key={ach.id}
              className="group relative bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden hover:border-yellow-500/50 transition-all shadow-xl flex flex-col cursor-pointer"
            >
              {/* Image Preview */}
              <div className="relative aspect-video w-full bg-gray-950 overflow-hidden">
                {ach.image_url ? (
                  <img 
                    src={ach.image_url} 
                    alt={ach.title} 
                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-700">
                    <FaImage size={32} />
                  </div>
                )}
                <div 
                    className="absolute top-3 right-3 backdrop-blur-md border px-2.5 py-1 rounded-lg flex items-center gap-1.5 text-[10px] md:text-xs font-bold uppercase tracking-wider shadow-lg"
                    style={{ backgroundColor: ach.council_color + '80', borderColor: ach.council_color, color: '#fff' }}
                >
                    {ach.council_name.replace(' Council', '')}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5 flex-1 flex flex-col">
                <h3 className="font-bold text-lg leading-tight text-white mb-2">{ach.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 flex-1">{ach.description}</p>
                
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-500 font-mono">
                        {new Date(ach.achievement_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
