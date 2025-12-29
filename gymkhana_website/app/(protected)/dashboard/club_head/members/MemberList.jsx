// "use client";

// import { useState } from "react";
// import { FaTrash } from "react-icons/fa";
// import { removeMemberAction } from "@/app/api/club/remove-members/actions";

// export default function MemberList({ members: initialMembers }) {
//   const [confirmRemove, setConfirmRemove] = useState(null);
//   const [removing, setRemoving] = useState(false);
//   const [members, setMembers] = useState(initialMembers);

//   const handleRemoveClick = (member) => {
//     setConfirmRemove(member);
//   };

//   const handleConfirmRemove = async () => {
//     if (!confirmRemove) return;

//     setRemoving(true);
//     try {
//       const formData = new FormData();
//       formData.append("memberId", confirmRemove.member_id);

//       await removeMemberAction(formData);
//       setConfirmRemove(null);
//       // Update local state to remove the member immediately
//       setMembers(members.filter(m => m.member_id !== confirmRemove.member_id));
//     } catch (error) {
//       console.error("Error removing member:", error);
//       alert("Failed to remove member. Please try again.");
//     } finally {
//       setRemoving(false);
//     }
//   };

//   const handleCancelRemove = () => {
//     setConfirmRemove(null);
//   };

//   return (
//     <>
//       <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
//         {members.length === 0 ? (
//           <div className="text-gray-400 text-center py-8">
//             No members added yet.
//           </div>
//         ) : (
//           members.map((member) => (
//             <div
//               key={member.member_id}
//               className="flex justify-between items-center p-4 bg-gray-950/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-colors"
//             >
//               <div>
//                 <h4 className="text-white font-medium">{member.name}</h4>
//                 <p className="text-gray-400 text-sm">{member.email}</p>
//                 <p className="text-gray-500 text-xs mt-1">
//                   {member.position} · {member.status}
//                 </p>
//               </div>

//               <button
//                 onClick={() => handleRemoveClick(member)}
//                 className="flex items-center gap-2 px-3 py-1.5 bg-red-500 text-white text-xs font-bold rounded-lg hover:bg-red-400 transition-all"
//               >
//                 <FaTrash /> Remove
//               </button>
//             </div>
//           ))
//         )}
//       </div>

//       {/* Confirmation Modal */}
//       {confirmRemove && (
//         <div className="fixed inset-0 bg-black bg-opacity-20 flex items-center justify-center z-50 backdrop-blur-sm">
//           <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl">
//             <h3 className="text-xl font-bold text-white mb-4">Remove Member</h3>
//             <p className="text-gray-300 mb-6">
//               Are you sure you want to remove <strong>{confirmRemove.name}</strong> from the club?
//               This action cannot be undone.
//             </p>

//             <div className="flex gap-3">
//               <button
//                 onClick={handleCancelRemove}
//                 disabled={removing}
//                 className="flex-1 px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-all disabled:opacity-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleConfirmRemove}
//                 disabled={removing}
//                 className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400 transition-all disabled:opacity-50"
//               >
//                 {removing ? "Removing..." : "Yes, Remove"}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }



"use client";

import { useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function MemberListClient({ members: initialMembers }) {
  const [members, setMembers] = useState(initialMembers);
  const [confirmMember, setConfirmMember] = useState(null);
  const [loading, setLoading] = useState(false);

  async function removeMember() {
    if (!confirmMember) return;

    setLoading(true);
    try {
      const res = await fetch(
        `/api/club/remove-members/${confirmMember.member_id}`,
        { method: "DELETE" }
      );

      if (!res.ok) throw new Error("Failed");

      setMembers(members.filter(
        m => m.member_id !== confirmMember.member_id
      ));
      setConfirmMember(null);
    } catch {
      alert("Failed to remove member");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-4">
        {members.length === 0 ? (
          <div className="text-gray-400 text-center py-8">
            No members added yet.
          </div>
        ) : (
          members.map(member => (
            <div
              key={member.member_id}
              className="flex justify-between items-center p-4 bg-gray-950/60 border border-gray-800 rounded-xl"
            >
              <div>
                <p className="text-white font-semibold">{member.name}</p>
                <p className="text-sm text-gray-400">{member.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {member.position} · {member.status}
                </p>
                {member.remarks && (
                  <p className="text-xs text-blue-400 mt-1 italic">
                    "{member.remarks}"
                  </p>
                )}
              </div>

              <button
                onClick={() => setConfirmMember(member)}
                className="flex items-center gap-2 px-3 py-1.5 bg-red-600 hover:bg-red-500 rounded-lg text-xs font-bold"
              >
                <FaTrash /> Remove
              </button>
            </div>
          ))
        )}
      </div>

      {/* Confirmation Modal */}
      {confirmMember && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-white mb-4">
              Remove Member
            </h3>

            <p className="text-gray-300 mb-6">
              Are you sure you want to remove{" "}
              <strong>{confirmMember.name}</strong>?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setConfirmMember(null)}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={removeMember}
                disabled={loading}
                className="px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg font-bold"
              >
                {loading ? "Removing..." : "Yes, Remove"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
