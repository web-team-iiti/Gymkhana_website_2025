import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { FaArrowLeft, FaTrophy, FaCalendarAlt } from "react-icons/fa";

async function getCouncilDetails(id) {
    // Fetch council and its achievements by UUID
    const sql = `
        SELECT 
            c.id as council_id, c.name, c.description, c.color,
            a.id as achievement_id, a.title, a.description as ach_desc, a.achievement_date, a.image_url
        FROM councils c
        LEFT JOIN council_achievements a ON c.id = a.council_id
        WHERE c.id = $1
        ORDER BY a.achievement_date DESC
    `;
    
    try {
        const res = await query(sql, [id]);
    
        if (res.rows.length === 0) return null;

        // Grouping
        const council = {
            name: res.rows[0].name,
            description: res.rows[0].description,
            color: res.rows[0].color,
            achievements: res.rows[0].achievement_id ? res.rows.map(row => ({
                id: row.achievement_id,
                title: row.title,
                description: row.ach_desc,
                date: row.achievement_date,
                image_url: row.image_url
            })) : []
        };

        return council;
    } catch (error) {
        console.error("Error fetching council by UUID:", error);
        return null;
    }
}

export default async function CouncilPage({ params }) {
    const { id } = await params;
    const council = await getCouncilDetails(id);

    if (!council) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center text-white flex-col gap-4">
                <h1 className="text-3xl font-bold">Council not found</h1>
                <Link href="/" className="text-yellow-500 hover:underline">Return Home</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white selection:bg-yellow-500/30">
            {/* Header section with specific council color glow */}
            <div 
                className="relative pt-32 pb-16 px-6 overflow-hidden"
                style={{ 
                    background: `linear-gradient(to bottom, ${council.color}20 0%, black 100%)` 
                }}
            >
                <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 blur-[120px] rounded-full pointer-events-none"
                    style={{ backgroundColor: council.color + '40' }}
                />
                
                <div className="max-w-5xl mx-auto relative z-10 text-center">
                    <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors">
                        <FaArrowLeft /> Back to Home
                    </Link>
                    <h1 
                        className="text-4xl md:text-6xl font-bold mb-6 tracking-tight drop-shadow-xl"
                        style={{ color: council.color }}
                    >
                        {council.name}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                        {council.description}
                    </p>
                </div>
            </div>

            {/* Achievements Section */}
            <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">
                <div className="flex items-center gap-3 mb-10 border-b border-gray-800 pb-4">
                    <FaTrophy className="text-2xl" style={{ color: council.color }} />
                    <h2 className="text-3xl font-bold">Key Achievements</h2>
                </div>

                {council.achievements.length === 0 ? (
                    <div className="text-center py-20 border-2 border-dashed border-gray-800 rounded-3xl bg-gray-900/30">
                        <FaTrophy className="text-6xl text-gray-700 mx-auto mb-4" />
                        <h3 className="text-xl text-gray-400 font-bold mb-2">No Achievements Yet</h3>
                        <p className="text-gray-500">This council's achievements will be updated soon.</p>
                    </div>
                ) : (
                    <div className="space-y-12 md:space-y-24 relative before:absolute before:inset-0 before:ml-5 md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-gray-800 before:via-gray-800 before:to-transparent">
                        {council.achievements.map((ach, idx) => (
                            <div key={ach.id} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active`}>
                                {/* Timeline Dot */}
                                <div 
                                    className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-black bg-gray-900 absolute left-0 md:left-1/2 md:-translate-x-1/2 shadow-xl shrink-0 transition-transform group-hover:scale-125 z-10"
                                    style={{ boxShadow: `0 0 10px ${council.color}50` }}
                                >
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: council.color }} />
                                </div>

                                {/* Content Card */}
                                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-gray-900 border border-gray-800 rounded-3xl p-6 shadow-2xl hover:border-gray-600 transition-colors ml-16 md:ml-0 overflow-hidden relative">
                                    <div 
                                        className="absolute top-0 left-0 w-full h-1 opacity-0 group-hover:opacity-100 transition-opacity" 
                                        style={{ backgroundColor: council.color }}
                                    />
                                    
                                    {ach.image_url && (
                                        <div className="aspect-video w-full rounded-xl overflow-hidden mb-6 bg-black">
                                            <img 
                                                src={ach.image_url} 
                                                alt={ach.title} 
                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                                            />
                                        </div>
                                    )}
                                    
                                    <div className="flex items-center gap-2 text-xs font-mono text-gray-400 mb-3 uppercase tracking-wider">
                                        <FaCalendarAlt />
                                        {new Date(ach.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long' })}
                                    </div>
                                    
                                    <h3 className="text-2xl font-bold mb-3 text-white">{ach.title}</h3>
                                    <p className="text-gray-400 leading-relaxed">
                                        {ach.description}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
