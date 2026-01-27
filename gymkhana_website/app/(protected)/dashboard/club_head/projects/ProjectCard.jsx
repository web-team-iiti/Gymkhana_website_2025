// "use client";

// import { useState } from "react";
// import { FaEdit, FaTrash, FaClock, FaCheckCircle } from "react-icons/fa";

// export default function ProjectCard({ project }) {
//   const [editing, setEditing] = useState(false);
//   const [title, setTitle] = useState(project.title);
//   const [description, setDescription] = useState(project.description || "");
//   const [status, setStatus] = useState(project.status);
//   const [loading, setLoading] = useState(false);

//   const handleDelete = async () => {
//     if (!confirm("Are you sure you want to delete this project?")) return;

//     await fetch(`/api/club/projects/${project.project_id}`, {
//       method: "DELETE",
//     });

//     window.location.reload();
//   };

//   const handleSave = async () => {
//     setLoading(true);

//     await fetch(`/api/club/projects/${project.project_id}`, {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ title, description, status }),
//     });

//     window.location.reload();
//   };

//   return (
//     <div className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-xl relative">

//       {/* Status */}
//       <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold
//         ${status === "IN_PROGRESS"
//           ? "bg-yellow-500/20 text-yellow-400"
//           : "bg-green-500/20 text-green-400"
//         }`}
//       >
//         {status === "IN_PROGRESS" ? <FaClock /> : <FaCheckCircle />}
//         {status === "IN_PROGRESS" ? "In Progress" : "Completed"}
//       </span>

//       {/* Actions */}
//       <div className="absolute top-4 right-4 flex gap-2">
//         <button
//           onClick={() => setEditing(true)}
//           className="p-2 rounded bg-gray-800 hover:bg-gray-700"
//           title="Edit"
//         >
//           <FaEdit />
//         </button>

//         <button
//           onClick={handleDelete}
//           className="p-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
//           title="Delete"
//         >
//           <FaTrash />
//         </button>
//       </div>

//       {/* Content */}
//       <h3 className="text-lg md:text-xl font-bold text-white mt-3">
//         {project.title}
//       </h3>

//       <p className="text-gray-400 text-sm mt-1">
//         {project.description || "No description provided"}
//       </p>

//       <p className="text-gray-600 text-xs mt-3">
//         Created on {new Date(project.created_at).toLocaleDateString()}
//       </p>

//       {/* EDIT MODAL */}
//       {editing && (
//         <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
//           <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg">
//             <h2 className="text-xl font-bold mb-4">Edit Project</h2>

//             <input
//               className="w-full bg-gray-800 p-2 rounded mb-3"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//             />

//             <textarea
//               className="w-full bg-gray-800 p-2 rounded mb-3"
//               rows={4}
//               value={description}
//               onChange={(e) => setDescription(e.target.value)}
//             />

//             <select
//               className="w-full bg-gray-800 p-2 rounded mb-4"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="IN_PROGRESS">In Progress</option>
//               <option value="COMPLETED">Completed</option>
//             </select>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setEditing(false)}
//                 className="px-4 py-2 bg-gray-700 rounded"
//               >
//                 Cancel
//               </button>

//               <button
//                 onClick={handleSave}
//                 disabled={loading}
//                 className="px-4 py-2 bg-yellow-500 text-black font-bold rounded"
//               >
//                 {loading ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaClock,
  FaCheckCircle,
} from "react-icons/fa";

export default function ProjectCard({ project }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(project.title);
  const [description, setDescription] = useState(project.description || "");
  const [status, setStatus] = useState(project.status);
  const [loading, setLoading] = useState(false);

  /* =====================
     DELETE PROJECT
     ===================== */
  const confirmDelete = async () => {
    setLoading(true);

    await fetch(`/api/club/projects/${project.project_id}`, {
      method: "DELETE",
    });

    setShowDeleteModal(false);
    window.location.reload();
  };

  /* =====================
     UPDATE PROJECT
     ===================== */
  const handleSave = async () => {
    setLoading(true);

    await fetch(`/api/club/projects/${project.project_id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, status }),
    });

    setEditing(false);
    window.location.reload();
  };

  return (
    <>
      {/* =====================
          PROJECT CARD
          ===================== */}
      <div className="bg-gray-900 border border-gray-800 p-4 md:p-6 rounded-xl relative">

        {/* STATUS BADGE */}
        <span
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-bold
          ${
            status === "IN_PROGRESS"
              ? "bg-yellow-500/20 text-yellow-400"
              : "bg-green-500/20 text-green-400"
          }`}
        >
          {status === "IN_PROGRESS" ? <FaClock /> : <FaCheckCircle />}
          {status === "IN_PROGRESS" ? "In Progress" : "Completed"}
        </span>

        {/* ACTION BUTTONS */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => setEditing(true)}
            className="p-2 rounded bg-gray-800 hover:bg-gray-700"
            title="Edit Project"
          >
            <FaEdit />
          </button>

          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-2 rounded bg-red-500/20 text-red-400 hover:bg-red-500/30"
            title="Delete Project"
          >
            <FaTrash />
          </button>
        </div>

        {/* CONTENT */}
        <h3 className="text-lg md:text-xl font-bold text-white mt-3">
          {project.title}
        </h3>

        <p className="text-gray-400 text-sm mt-1">
          {project.description || "No description provided"}
        </p>

        <p className="text-gray-600 text-xs mt-3">
          Created on {new Date(project.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* =====================
          DELETE CONFIRM MODAL
          ===================== */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold text-white mb-2">
              Remove Project
            </h2>

            <p className="text-gray-400 mb-6">
              Are you sure you want to remove{" "}
              <span className="font-semibold text-white">
                {project.title}
              </span>
              ?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg"
              >
                {loading ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================
          EDIT PROJECT MODAL
          ===================== */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 w-full max-w-lg">
            <h2 className="text-xl font-bold mb-4">Edit Project</h2>

            <input
              className="w-full bg-gray-800 p-2 rounded mb-3"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <textarea
              className="w-full bg-gray-800 p-2 rounded mb-3"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <select
              className="w-full bg-gray-800 p-2 rounded mb-4"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditing(false)}
                className="px-4 py-2 bg-gray-700 rounded"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={loading}
                className="px-4 py-2 bg-yellow-500 text-black font-bold rounded"
              >
                {loading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
