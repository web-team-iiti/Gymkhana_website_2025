// import { auth } from "@/auth";
// import { query } from "@/config/db";
// import { FaCheck, FaTimes, FaClock } from "react-icons/fa";

// async function getPendingMembers() {
//   const sql = `
//     SELECT
//       cm.member_id,
//       u.name,
//       u.email,
//       c.club_name,
//       cm.position,
//       cm.added_at
//     FROM club_members cm
//     JOIN users u ON u.id = cm.student_id
//     JOIN clubs c ON c.club_id = cm.club_id
//     WHERE cm.status = 'PENDING'
//     ORDER BY cm.added_at ASC;
//   `;

//   const res = await query(sql);
//   return res.rows;
// }

// export default async function GsClubMembersPage() {
//   const session = await auth();
//   if (!session || session.user.role !== "gs") {
//     return <div className="text-red-400">Unauthorized</div>;
//   }

//   const members = await getPendingMembers();

//   return (
//     <div className="p-6 max-w-6xl mx-auto">
//       <div className="flex items-center gap-3 mb-6">
//         <FaClock className="text-yellow-500 text-2xl" />
//         <h1 className="text-3xl font-bold text-white">
//           Pending Club Member Requests
//         </h1>
//       </div>

//       {members.length === 0 ? (
//         <div className="text-center py-12">
//           <FaClock className="text-gray-500 text-4xl mx-auto mb-4" />
//           <p className="text-gray-400 text-lg">No pending requests.</p>
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {members.map(m => (
//             <div
//               key={m.member_id}
//               className="bg-gray-900 border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-colors"
//             >
//               <div className="flex justify-between items-start">
//                 <div className="flex-1">
//                   <p className="text-white font-semibold text-lg">{m.name}</p>
//                   <p className="text-sm text-gray-400 mb-2">{m.email}</p>
//                   <div className="flex items-center gap-4 text-sm text-gray-300">
//                     <span className="bg-blue-900/50 text-blue-300 px-3 py-1 rounded-full">
//                       {m.club_name}
//                     </span>
//                     <span className="bg-purple-900/50 text-purple-300 px-3 py-1 rounded-full">
//                       {m.position}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">
//                     Requested: {new Date(m.added_at).toLocaleDateString()}
//                   </p>
//                 </div>

//                 <div className="flex gap-3 ml-6">
//                   <form action={`/api/club/approve/${m.member_id}`} method="POST">
//                     <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-bold transition-colors">
//                       <FaCheck className="text-xs" />
//                       Approve
//                     </button>
//                   </form>

//                   <form action={`/api/club/reject/${m.member_id}`} method="POST">
//                     <button className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition-colors">
//                       <FaTimes className="text-xs" />
//                       Reject
//                     </button>
//                   </form>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }





// import React from "react";
// import { auth } from "@/auth";
// import { query } from "@/config/db";
// import MemberVerificationClient from "./MemberVerificationClient";

// /* ===========================
//    DATA
// =========================== */

// async function getStats() {
//   const sql = `
//     SELECT
//       COUNT(*) FILTER (WHERE status = 'PENDING')  AS pending,
//       COUNT(*) FILTER (WHERE status = 'APPROVED') AS approved,
//       COUNT(*) FILTER (WHERE status = 'REJECTED') AS rejected
//     FROM club_members;
//   `;

//   const res = await query(sql);
//   return res.rows[0];
// }

// async function getPendingMembers() {
//   const sql = `
//     SELECT
//       cm.member_id,
//       u.name,
//       u.email,
//       c.club_name,
//       cm.position,
//       cm.added_at,
//       cm.remarks
//     FROM club_members cm
//     JOIN users u ON u.id = cm.student_id
//     JOIN clubs c ON c.club_id = cm.club_id
//     WHERE cm.status = 'PENDING'
//     ORDER BY cm.added_at ASC;
//   `;

//   const res = await query(sql);
//   return res.rows;
// }

// /* ===========================
//    PAGE
// =========================== */

// export default async function GsClubMemberVerification({ searchParams }) {
//   const session = await auth();
//   if (!session || session.user.role !== "gs") {
//     return <div className="text-red-400">Unauthorized</div>;
//   }

//   const [stats, members] = await Promise.all([
//     getStats(),
//     getPendingMembers()
//   ]);

//   const success = searchParams?.success === "true";
//   const action = searchParams?.action; // 'approved' or 'rejected'

//   return (
//     <MemberVerificationClient
//       stats={stats}
//       members={members}
//       success={success}
//       action={action}
//     />
//   );
// }




import { unstable_noStore as noStore } from "next/cache";

import { auth } from "@/auth";
import { query } from "@/config/db";
import MemberVerificationClient from "./MemberVerificationClient";

export const dynamic = "force-dynamic";

/* =========================
   FETCH STATS
========================= */
async function getStats() {
  const res = await query(`
    SELECT
      COUNT(*) FILTER (WHERE status = 'TENURE_ADDED') AS pending,
      COUNT(*) FILTER (WHERE status = 'APPROVED') AS approved,
      COUNT(*) FILTER (WHERE status = 'REJECTED') AS rejected
    FROM club_members;
  `);

  return res.rows[0];
}

/* =========================
   FETCH MEMBERS BY STATUS
========================= */
async function getMembersByStatus(status) {
  const sql = `
    SELECT
      cm.member_id,
      u.name,
      u.email,
      c.club_name,
      cm.position,
      cm.added_at,
      cm.remarks
    FROM club_members cm
    JOIN users u ON u.id = cm.student_id
    JOIN clubs c ON c.club_id = cm.club_id
    WHERE cm.status = $1
    ORDER BY cm.added_at ASC;
  `;

  const res = await query(sql, [status]);
  return res.rows;
}


/* =========================
   PAGE
========================= */
export default async function GsClubMemberVerification({ searchParams }) {
    noStore();
  const session = await auth();
  if (!session || session.user.role !== "gs") {
    return <div className="text-red-400">Unauthorized</div>;
  }

  // Await searchParams in Next.js 15
  const params = await searchParams;
  const statusParam = params?.status?.toUpperCase();

  const validStatuses = ["TENURE_ADDED", "APPROVED", "REJECTED"];
  const activeStatus = validStatuses.includes(statusParam)
    ? statusParam
    : "TENURE_ADDED"; // ✅ default

  const [stats, members] = await Promise.all([
    getStats(),
    getMembersByStatus(activeStatus),
  ]);

  const success = params?.success === "true";
  const action = params?.action;

  return (
    // <MemberVerificationClient
    //   stats={stats}
    //   members={members}
    //   success={success}
    //   action={action}
    //   activeStatus={activeStatus}
    // />
    <MemberVerificationClient
  key={activeStatus}   
  stats={stats}
  members={members}
  success={success}
  action={action}
  activeStatus={activeStatus}
/>

  );
}




