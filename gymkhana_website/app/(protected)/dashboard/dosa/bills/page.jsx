import React from "react";
import { query } from "@/config/db";
import MasterBillManager from "@/components/MasterBillManager";
import { FaFileInvoiceDollar } from "react-icons/fa";

// Reuse the exact same data logic as the GS page
async function getData(searchText = "", councilFilter = "") {
    const searchTerm = `%${searchText}%`;

    // 1. Uploaded Bills
    let billsSql = `
    SELECT b.*, COALESCE(CAST(i.council AS TEXT), 'EVENT') as derived_council
    FROM bills b
    LEFT JOIN inventory i ON (b.entity_id = i.id AND b.category = 'INVENTORY')
    WHERE 1=1
  `;
    const billsParams = [];
    let pIdx = 1;
    if (searchText) { billsSql += ` AND b.entity_name ILIKE $${pIdx}`; billsParams.push(searchTerm); pIdx++; }
    if (councilFilter) {
        if (councilFilter === 'EVENT') billsSql += ` AND b.category = 'EVENT'`;
        else { billsSql += ` AND i.council = $${pIdx}`; billsParams.push(councilFilter); pIdx++; }
    }
    billsSql += ` ORDER BY b.created_at DESC`;
    const billsRes = await query(billsSql, billsParams);

    // 2. Missing Inventory
    let missingInventory = [];
    if (councilFilter !== 'EVENT') {
        let invSql = `SELECT id, name, council, created_at, 'INVENTORY' as category FROM inventory WHERE id NOT IN (SELECT entity_id FROM bills WHERE category = 'INVENTORY')`;
        const invParams = [];
        let invIdx = 1;
        if (searchText) { invSql += ` AND name ILIKE $${invIdx}`; invParams.push(searchTerm); invIdx++; }
        if (councilFilter) { invSql += ` AND council = $${invIdx}`; invParams.push(councilFilter); invIdx++; }
        const invRes = await query(invSql, invParams);
        missingInventory = invRes.rows;
    }

    // 3. Missing Events
    let missingEvents = [];
    if (!councilFilter || councilFilter === 'EVENT') {
        let eventSql = `SELECT id, title as name, 'EVENT' as council, created_at, 'EVENT' as category FROM events WHERE id NOT IN (SELECT entity_id FROM bills WHERE category = 'EVENT')`;
        const eventParams = [];
        let evtIdx = 1;
        if (searchText) { eventSql += ` AND title ILIKE $${evtIdx}`; eventParams.push(searchTerm); evtIdx++; }
        const evtRes = await query(eventSql, eventParams);
        missingEvents = evtRes.rows;
    }

    const allMissing = [...missingInventory, ...missingEvents].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    return { uploaded: billsRes.rows, missing: allMissing };
}

export default async function BillsPage({ searchParams }) {
    const params = await searchParams;
    const searchText = params?.query || "";
    const councilFilter = params?.council || "";

    const { uploaded, missing } = await getData(searchText, councilFilter);

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-8 pb-32">
            <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                    <FaFileInvoiceDollar size={24} />
                </div>
                <div>
                    <h1 className="sm:text-2xl text-xl font-bold text-white">Central Bill Repository</h1>
                    <p className="text-sm text-gray-400">View audit status for Assets & Events.</p>
                </div>
            </div>

            {/* 👇 MAGIC: Pass readOnly={true} to hide Upload/Delete buttons */}
            <MasterBillManager
                uploadedBills={uploaded}
                missingItems={missing}
                readOnly={true}
            />
        </div>
    );
}