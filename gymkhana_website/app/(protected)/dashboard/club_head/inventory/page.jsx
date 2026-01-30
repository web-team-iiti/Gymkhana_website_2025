import React from "react";
import { query } from "@/config/db";
import { auth } from "@/auth";
import InventoryList from "@/components/InventoryList";
import InventoryControls from "@/components/InventoryControls";
import { FaBoxes, FaExclamationTriangle } from "react-icons/fa";
 
async function getClubInventory(clubName, searchText, councilFilter) {
    let sql = `SELECT * FROM inventory WHERE club_name = $1`;
    const params = [clubName];
    let paramIndex = 2;
    if (searchText) {
        sql += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex})`;
        params.push(`%${searchText}%`);
        paramIndex++;
    }
    if (councilFilter) {
        sql += ` AND council = $${paramIndex}`;
        params.push(councilFilter);
        paramIndex++;
    }
    sql += ` ORDER BY created_at DESC`;
    const res = await query(sql, params);
    return res.rows;
}

export default async function ClubInventoryPage({ searchParams }) {
    const session = await auth();
    const params = await searchParams;
    const searchText = params?.query || "";
    const councilFilter = params?.council || "";  
    const clubName = session?.user?.club_name;
    if (!clubName) {
        return (
            <div className="p-10 flex flex-col items-center justify-center text-center space-y-4">
                <FaExclamationTriangle className="text-yellow-500 text-5xl" />
                <h2 className="text-2xl font-bold text-white">No Club Assigned</h2>
                <p className="text-gray-400">
                    Your account has the 'Club Head' role, but is not linked to a specific club.
                </p>
            </div>
        );
    } 
    const items = await getClubInventory(clubName, searchText, councilFilter);
    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 pb-32">

            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <FaBoxes className="text-yellow-500" />
                        {clubName} Inventory
                    </h1>
                    <p className="text-gray-400 mt-1 text-sm">Manage assets for your club.</p>
                </div>
            </div>

            <InventoryControls />

            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        My Items
                        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md border border-gray-700 font-mono">
                            {items.length}
                        </span>
                    </h2>
                </div>
                <InventoryList items={items} userRole="viewer" />
            </div>
        </div>
    );
}