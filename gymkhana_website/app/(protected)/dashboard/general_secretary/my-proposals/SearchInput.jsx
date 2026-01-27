"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { FaSearch } from "react-icons/fa";

export default function SearchInput() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [text, setText] = useState(searchParams.get("query") || "");

  // Debounce Logic: Wait 500ms after typing before updating URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams);
      if (text) {
        params.set("query", text);
      } else {
        params.delete("query");
      }
      router.replace(`?${params.toString()}`, { scroll: false });
    }, 500);

    return () => clearTimeout(timer);
  }, [text, router, searchParams]);

  return (
    <div className="relative w-full md:max-w-md">
      <FaSearch className="absolute left-3 top-3.5 text-gray-500" />
      <input
        type="text"
        placeholder="Search by title..."
        className="w-full bg-gray-900 border border-gray-800 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  );
}