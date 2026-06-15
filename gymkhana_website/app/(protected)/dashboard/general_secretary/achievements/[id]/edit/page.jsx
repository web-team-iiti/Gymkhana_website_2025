import React from "react";
import { query } from "@/config/db";
import EditAchievementForm from "@/components/EditAchievementForm";
import { notFound } from "next/navigation";

async function getAchievement(id) {
    const sql = "SELECT * FROM council_achievements WHERE id = $1";
    try {
        const res = await query(sql, [id]);
        return res.rows[0];
    } catch(e) { return null; }
}

async function getCouncils() {
    const sql = "SELECT id, name FROM councils ORDER BY name ASC";
    try {
        const res = await query(sql);
        return res.rows;
    } catch(e) { return []; }
}

export default async function EditAchievementPage({ params }) {
    const { id } = await params;
    const achievement = await getAchievement(id);
    
    if (!achievement) {
        return notFound();
    }
    
    const councils = await getCouncils();
    
    return <EditAchievementForm councils={councils} achievement={achievement} />;
}
