"use client";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function DeleteAchievementButton({ id }) {
    const router = useRouter();
    const handleDelete = async () => {
        if(confirm('Are you sure you want to delete this achievement?')) {
            const res = await fetch(`/api/achievements/${id}`, { method: 'DELETE' });
            if (res.ok) {
                router.refresh();
            } else {
                alert("Failed to delete achievement.");
            }
        }
    };
    return (
        <button 
            onClick={handleDelete}
            className="text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-colors"
            title="Delete Achievement"
        >
            <FaTrash />
        </button>
    );
}
