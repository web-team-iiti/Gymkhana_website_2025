import React from "react";
import Link from "next/link";
import { query } from "@/config/db";
import { redirect } from "next/navigation";
import { supabase } from "@/config/supabase";
import { FaArrowLeft, FaCalendarAlt, FaTrash, FaImages, FaEdit, FaTrophy } from "react-icons/fa";

async function getAchievement(id) {
    const sql = `
      SELECT a.*, c.name as council_name, c.color as council_color
      FROM council_achievements a
      JOIN councils c ON a.council_id = c.id
      WHERE a.id = $1
    `;
    const res = await query(sql, [id]);
    return res.rows[0];
}

async function deleteAchievement(formData) {
    "use server";
    const id = formData.get("id");
    const res = await query(`SELECT image_url FROM council_achievements WHERE id = $1`, [id]);
    const achievement = res.rows[0];

    if (achievement && achievement.image_url) {
        const url = achievement.image_url;
        if (url.includes("supabase")) {
            const parts = url.split('/');
            const fileName = parts[parts.length - 1];
            const { error } = await supabase.storage.from('achievement_images').remove([fileName]);
            if (error) {
                console.error("Supabase Storage Delete Error:", error.message);
            }
        }
    }
    await query(`DELETE FROM council_achievements WHERE id = $1`, [id]);
    redirect("/dashboard/general_secretary/achievements");
}

export default async function AchievementDetailsPage({ params }) {
    const { id } = await params;
    const achievement = await getAchievement(id);

    if (!achievement) return <div className="text-white p-8">Achievement not found</div>;

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 pb-24">
            
            {/* --- HEADER --- */}
            <div className="flex flex-col gap-6 mb-8 border-b border-gray-800 pb-8 md:border-none md:pb-0">
                
                <div className="w-full">
                    <Link 
                        href="/dashboard/general_secretary/achievements" 
                        className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm font-medium transition-colors bg-gray-900/50 px-3 py-1.5 rounded-lg md:bg-transparent md:p-0"
                    >
                        <FaArrowLeft /> <span className="md:hidden">Back</span> <span className="hidden md:inline">Back to List</span>
                    </Link>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                    <div className="w-full md:w-auto">
                        <h1 className="text-2xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
                            {achievement.title}
                        </h1>
                        <p className="font-bold uppercase tracking-widest mt-2 text-xs md:text-sm" style={{ color: achievement.council_color }}>
                            {achievement.council_name}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <Link
                            href={`/dashboard/general_secretary/achievements/${achievement.id}/edit`}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3.5 md:py-3 rounded-xl font-bold transition-all shadow-lg shadow-blue-500/20 active:scale-95"
                        >
                            <FaEdit size={16} /> Edit
                        </Link>

                        <form action={deleteAchievement} className="flex-1 md:flex-none">
                            <input type="hidden" name="id" value={achievement.id} />
                            <button
                                type="submit"
                                className="w-full flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white px-6 py-3.5 md:py-3 rounded-xl border border-red-500/20 font-bold transition-all active:scale-95"
                            >
                                <FaTrash size={16} /> Delete
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* --- CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                
                {/* --- LEFT: INFO --- */}
                <div className="lg:col-span-1 space-y-6 order-2 lg:order-1">
                    
                    <div className="bg-gray-900 border border-gray-800 p-5 md:p-6 rounded-2xl shadow-xl">
                        <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-3">Achievement Date</h3>
                        <div className="flex items-center gap-3 text-white text-lg md:text-xl font-bold">
                            <div className="bg-gray-800 p-3 rounded-xl text-yellow-500 shadow-inner">
                                <FaCalendarAlt size={20} />
                            </div>
                            <span className="leading-snug">
                                {new Date(achievement.achievement_date).toLocaleDateString(undefined, {
                                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                                })}
                            </span>
                        </div>
                    </div>

                    <div className="bg-gray-900 border border-gray-800 p-5 md:p-6 rounded-2xl shadow-xl">
                        <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-4">Description</h3>
                        <p className="text-gray-300 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                            {achievement.description}
                        </p>
                    </div>
                </div>

                {/* --- RIGHT: IMAGE GALLERY --- */}
                <div className="lg:col-span-2 order-1 lg:order-2">
                    <div className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-2xl shadow-xl h-full">
                        <h3 className="text-gray-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6 flex items-center gap-2">
                            <FaImages /> Image
                        </h3>
                        
                        {achievement.image_url ? (
                            <div className="group relative aspect-video bg-gray-950 rounded-xl overflow-hidden border border-gray-800 shadow-2xl">
                                <img
                                    src={achievement.image_url}
                                    alt="Achievement shot"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        ) : (
                            <div className="aspect-video bg-gray-950 rounded-xl border border-gray-800 flex items-center justify-center text-gray-700">
                                <FaTrophy size={48} />
                            </div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
