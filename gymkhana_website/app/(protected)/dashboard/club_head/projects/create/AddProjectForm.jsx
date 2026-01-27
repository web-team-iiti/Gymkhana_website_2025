"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProjectForm({ clubId }) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("IN_PROGRESS");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      setLoading(true);

      const res = await fetch(`/api/club/${clubId}/projects`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      router.push("/dashboard/club_head/projects");
      router.refresh();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8 text-white">
      <h1 className="text-2xl font-bold mb-6">Add Project</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <p className="text-red-400">{error}</p>}

        <input
          required
          className="w-full bg-gray-800 p-2 rounded"
          placeholder="Project Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          className="w-full bg-gray-800 p-2 rounded"
          placeholder="Short description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <select
          className="w-full bg-gray-800 p-2 rounded"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>

        <button
          disabled={loading}
          className="bg-yellow-500 text-black px-5 py-2 rounded font-bold"
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </div>
  );
}
