import React from "react";
import { query } from "@/config/db"; 
import InventoryList from "@/components/InventoryList";
import InventoryControls from "@/components/InventoryControls"; // 👈 Import the wrapper
import Link from "next/link"; 
import { FaBoxes, FaPlus } from "react-icons/fa";

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

export default async function InventoryPage({ searchParams }) {
    const { council, query: searchText } = await searchParams;
    const items = await getInventoryItems(council, searchText);

    return (
        <div className="max-w-5xl mx-auto p-4 md:p-8 space-y-6 pb-32">

            {/* Header */}
            <div className="flex items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <FaBoxes className="text-yellow-500" /> Inventory
                    </h1>
                    <p className="hidden md:block text-gray-400 mt-1 text-sm">Manage assets and logs.</p>
                </div>

                <Link 
                    href="/dashboard/general_secretary/inventory/add"
                    className="bg-yellow-500 hover:bg-yellow-400 text-black font-bold px-4 py-2.5 rounded-xl text-sm flex items-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                    <FaPlus /> <span className="hidden md:inline">Add Item</span><span className="md:hidden">Add</span>
                </Link>
            </div>

            {/* 👇 The Wrapper that handles Search & Filter UI */}
            <InventoryControls />

            {/* Results */}
            <div className="space-y-4">
                <div className="flex items-center justify-between px-1">
                    <h2 className="text-lg md:text-xl font-bold text-white flex items-center gap-2">
                        Items List 
                        <span className="bg-gray-800 text-gray-400 text-xs px-2 py-1 rounded-md border border-gray-700 font-mono">
                            {items.length}
                        </span>
                    </h2>
                </div>
                
                <InventoryList items={items} userRole="general_secretary" />
            </div>

        </div>
    );
}