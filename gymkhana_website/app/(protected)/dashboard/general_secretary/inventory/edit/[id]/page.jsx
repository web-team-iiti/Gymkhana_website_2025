import React from "react";
import { notFound } from "next/navigation";
import { query } from "@/config/db";
import EditInventoryForm from "@/components/EditInventoryForm"; // We will create this component below
import { FaEdit } from "react-icons/fa";

// 1. Fetch Item Data (Server Side)
async function getItem(id) {
    const res = await query(`SELECT * FROM inventory WHERE id = $1`, [id]);
    if (res.rows.length === 0) return null;
    return res.rows[0];
}

export default async function EditInventoryPage({ params }) {
    const { id } = await params;
    const item = await getItem(id);

    if (!item) return notFound();

    return (
        <div className="max-w-2xl mx-auto p-4 md:p-8 pb-32">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <FaEdit size={20} />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Edit Item</h1>
                    <p className="text-sm text-gray-400">Update details for {item.name}</p>
                </div>
            </div>

            {/* 2. Render Client Form with Data */}
            <EditInventoryForm item={item} />
        </div>
    );
}