import React from "react";
import { query } from "@/config/db";
import InventoryList from "@/components/InventoryList";
import InventoryControls from "@/components/InventoryControls";
import { FaBoxes } from "react-icons/fa";

// Data Fetching Logic
async function getInventoryItems(councilFilter, searchText) {
    let sql = `SELECT * FROM inventory WHERE 1=1`;
    const params = [];
    let paramIndex = 1;

    if (councilFilter) {
        sql += ` AND council = $${paramIndex}`;
        params.push(councilFilter);
        paramIndex++;
    }

    if (searchText) {
        sql += ` AND (name ILIKE $${paramIndex} OR description ILIKE $${paramIndex} OR club_name ILIKE $${paramIndex})`;
        params.push(`%${searchText}%`);
        paramIndex++;
    }

    sql += ` ORDER BY created_at DESC`;
    const res = await query(sql, params);
    return res.rows;
}

// ✅ THE DEFAULT EXPORT (This must exist!)
export default async function InventoryPage({ searchParams }) {
    const params = await searchParams;
    const council = params?.council || "";
    const searchText = params?.query || "";

    const items = await getInventoryItems(council, searchText);

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 pb-32">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <FaBoxes className="text-blue-500" />
                        Central Inventory
                    </h1>
                    <p className="text-gray-400 mt-1 text-sm">Monitoring across all councils.</p>
                </div>
            </div>

            {/* This component must exist! See Step 2 */}
            <InventoryControls />

            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        Items List
                        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md border border-gray-700 font-mono">
                            {items.length}
                        </span>
                    </h2>
                </div>

                {/* View-Only Mode */}
                <InventoryList items={items} userRole="viewer" />
            </div>
        </div>
    );
}