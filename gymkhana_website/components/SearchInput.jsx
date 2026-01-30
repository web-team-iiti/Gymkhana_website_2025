"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchInput({ placeholder }) {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    const [searchTerm, setSearchTerm] = useState(searchParams.get("query")?.toString() || "");
    useEffect(() => {
        const handler = setTimeout(() => {
            const params = new URLSearchParams(searchParams);
            if (searchTerm) {
                params.set("query", searchTerm);
            } else {
                params.delete("query");
            }
            replace(`${pathname}?${params.toString()}`);
        }, 300);
        return () => {
            clearTimeout(handler);
        };
    }, [searchTerm, pathname, replace, searchParams]);

    return (
        <div className="relative w-full md:w-96">
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
                type="text"
                className="w-full bg-gray-900 border border-gray-800 text-white rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:border-yellow-500 transition-colors placeholder-gray-600 shadow-inner"
                placeholder={placeholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
        </div>
    );
}