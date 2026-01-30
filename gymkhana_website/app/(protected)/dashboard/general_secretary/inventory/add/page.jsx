import React from "react";
import AddInventoryForm from "@/components/AddInventoryForm";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

export default function AddInventoryPage() {
    return (
        <div className="max-w-3xl mx-auto px-4 py-6 md:p-8 pb-32"> 
            
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <Link
                    href="/dashboard/general_secretary/inventory"
                    className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:text-white transition-colors border border-gray-800 active:scale-95"
                >
                    <FaArrowLeft />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold text-white">Add Inventory</h1>
                    <p className="text-sm text-gray-400">Fill in details for the new asset.</p>
                </div>
            </div>

            {/* Form Container */}
            {/* Mobile: Transparent & Flat | Desktop: Card & Shadow */}
            <div className="md:bg-gray-900/50 md:border md:border-gray-800 md:rounded-3xl md:p-8 md:shadow-2xl">
                <AddInventoryForm />
            </div> 
        </div>
    );
}