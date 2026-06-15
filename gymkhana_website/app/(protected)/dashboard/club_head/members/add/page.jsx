// "use client";

// import React, { useState } from "react";
// import { FaArrowRight } from "react-icons/fa";

// export default function AddMemberPage() {
//   const [email, setEmail] = useState("");
//   const [position, setPosition] = useState("");
//   const [remarks, setRemarks] = useState("");
//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage("");

//     try {
//       const res = await fetch("/api/club/members", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, position, remarks }),
//       });

//       const data = await res.json();
//       if (!res.ok) throw new Error(data.message || "Error adding member");

//       setMessage(`✅ ${email} added as ${position}!`);
//       setEmail("");
//       setPosition("");
//       setRemarks("");
//     } catch (err) {
//       setMessage(`❌ ${err.message}`);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6 md:p-8 max-w-md mx-auto space-y-6">
//       <h1 className="text-2xl font-bold text-white">Add Member</h1>

//       <form className="space-y-4" onSubmit={handleSubmit}>
//         <div>
//           <label className="block text-gray-300 mb-1">Student Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//             className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white"
//             placeholder="student@example.com"
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-1">Position</label>
//           <input
//             type="text"
//             value={position}
//             onChange={(e) => setPosition(e.target.value)}
//             required
//             className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white"
//             placeholder="Developer, Designer..."
//           />
//         </div>

//         <div>
//           <label className="block text-gray-300 mb-1">Remarks (Optional)</label>
//           <textarea
//             value={remarks}
//             onChange={(e) => setRemarks(e.target.value)}
//             className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white resize-none"
//             placeholder="Any additional notes about this member..."
//             rows="3"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading}
//           className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400 transition-all"
//         >
//           Add Member <FaArrowRight />
//         </button>
//       </form>

//       {message && <p className="mt-4 text-white">{message}</p>}
//     </div>
//   );
// }



import React from "react";
import { auth } from "@/auth";
import { addMemberAction } from "@/app/api/club/add-members/add-member-actions";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

export default async function AddMemberPage({ searchParams }) {
  const session = await auth();

  if (!session?.user || session.user.role !== "club_head") {
    return <div className="p-6 text-white">Unauthorized</div>;
  }

  const params = await searchParams;
  const success = params?.success === "true";
  const error = params?.error;

  return (
    <div className="p-6 md:p-8 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-white">Add Member</h1>

      {success && (
        <div className="flex items-center gap-2 p-4 bg-green-900/50 border border-green-500 rounded-lg text-green-400">
          <FaCheckCircle className="text-green-500" />
          <span>Member added successfully!</span>
        </div>
      )}

      {error === "duplicate" && (
        <div className="flex items-center gap-2 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-400">
          <FaExclamationTriangle className="text-red-500" />
          <span>This student is already a member of your club!</span>
        </div>
      )}

      {error === "user_not_found" && (
        <div className="flex items-center gap-2 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-400">
          <FaExclamationTriangle className="text-red-500" />
          <span>Student with this email address not found. Please check the email and try again.</span>
        </div>
      )}

      {error === "no_club" && (
        <div className="flex items-center gap-2 p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-400">
          <FaExclamationTriangle className="text-red-500" />
          <span>You are not assigned to any club. Please contact the administrator.</span>
        </div>
      )}

      {/* ✅ SERVER ACTION FORM */}
      <form action={addMemberAction} className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-1">Student Email</label>
          <input
            type="email"
            name="email"
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white"
            placeholder="student@iiti.ac.in"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Position</label>
          <input
            type="text"
            name="position"
            required
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white"
            placeholder="Developer / Designer"
          />
        </div>

        <div>
          <label className="block text-gray-300 mb-1">Remarks (Optional)</label>
          <textarea
            name="remarks"
            className="w-full px-3 py-2 rounded-lg bg-gray-800 text-white resize-none"
            placeholder="Any additional notes about this member..."
            rows="3"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-400 transition"
        >
          Add Member
        </button>
      </form>
    </div>
  );
}
