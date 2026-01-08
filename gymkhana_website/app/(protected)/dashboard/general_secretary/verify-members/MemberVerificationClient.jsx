// "use client";

// import React, { useState } from "react";
// import {
//   FaUsers,
//   FaClock,
//   FaCheckCircle,
//   FaTimesCircle,
//   FaCheck,
//   FaTimes,
//   FaExclamationTriangle
// } from "react-icons/fa";

// /* ===========================
//    CLIENT COMPONENT
// =========================== */

// export default function MemberVerificationClient({ stats, members, success, action }) {
//   return (
//     <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-white flex items-center gap-3">
//           <FaUsers className="text-blue-500" />
//           POR / Club Member Verification
//         </h1>
//         <p className="text-gray-400 mt-1">
//           Review and approve club member requests
//         </p>
//       </div>

//       {success && action && (
//         <div className={`flex items-center gap-2 p-4 border rounded-lg ${
//           action === 'approved'
//             ? 'bg-green-900/50 border-green-500 text-green-400'
//             : 'bg-red-900/50 border-red-500 text-red-400'
//         }`}>
//           <FaCheckCircle className={action === 'approved' ? 'text-green-500' : 'text-red-500'} />
//           <span>Member {action} successfully!</span>
//         </div>
//       )}

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <StatsCard
//           icon={<FaClock />}
//           color="text-yellow-500"
//           title="Pending"
//           value={stats.pending}
//         />
//         <StatsCard
//           icon={<FaCheckCircle />}
//           color="text-green-500"
//           title="Approved"
//           value={stats.approved}
//         />
//         <StatsCard
//           icon={<FaTimesCircle />}
//           color="text-red-500"
//           title="Rejected"
//           value={stats.rejected}
//         />
//       </div>

//       {/* Pending Requests */}
//       <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
//         <h3 className="text-lg font-bold text-white mb-6">
//           Pending Requests
//         </h3>

//         {members.length === 0 ? (
//           <div className="text-center py-12 text-gray-500">
//             No pending club member requests.
//           </div>
//         ) : (
//           <div className="space-y-4">
//             {members.map(m => (
//               <MemberRequestCard key={m.member_id} member={m} />
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// /* ===========================
//    COMPONENTS
// =========================== */

// const StatsCard = ({ icon, color, title, value }) => (
//   <div className="bg-gray-900 border border-gray-800 p-6 rounded-2xl relative overflow-hidden">
//     <div className={`absolute top-0 right-0 p-4 opacity-10 text-8xl ${color}`}>
//       {icon}
//     </div>
//     <h3 className="text-gray-400 text-sm uppercase tracking-wider">
//       {title}
//     </h3>
//     <p className="text-4xl font-bold text-white mt-3">
//       {value}
//     </p>
//   </div>
// );

// const MemberRequestCard = ({ member }) => {
//   const [showConfirmApprove, setShowConfirmApprove] = useState(false);
//   const [showConfirmReject, setShowConfirmReject] = useState(false);

//   const handleApprove = async () => {
//     try {
//       const response = await fetch(`/api/club/approve/${member.member_id}`, {
//         method: 'POST',
//       });

//       if (response.ok) {
//         // Redirect to show success message
//         window.location.href = '/dashboard/general_secretary/verify-members?success=true&action=approved';
//       } else {
//         alert('Failed to approve member. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred. Please try again.');
//     }
//     setShowConfirmApprove(false);
//   };

//   const handleReject = async () => {
//     try {
//       const response = await fetch(`/api/club/reject/${member.member_id}`, {
//         method: 'POST',
//       });

//       if (response.ok) {
//         // Redirect to show success message
//         window.location.href = '/dashboard/general_secretary/verify-members?success=true&action=rejected';
//       } else {
//         alert('Failed to reject member. Please try again.');
//       }
//     } catch (error) {
//       alert('An error occurred. Please try again.');
//     }
//     setShowConfirmReject(false);
//   };

//   return (
//     <>
//       <div className="flex justify-between items-center p-4 bg-gray-950/60 border border-gray-800 rounded-xl hover:border-gray-700 transition">
//         <div>
//           <p className="text-white font-semibold">{member.name}</p>
//           <p className="text-sm text-gray-400">{member.email}</p>

//           <div className="flex gap-3 mt-2 text-xs">
//             <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400">
//               {member.club_name}
//             </span>
//             <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400">
//               {member.position}
//             </span>
//           </div>

//           <p className="text-xs text-gray-500 mt-2">
//             Requested on {new Date(member.added_at).toLocaleDateString()}
//           </p>
//         </div>

//         <div className="flex gap-3">
//           <button
//             onClick={() => setShowConfirmApprove(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-500 rounded-lg text-sm font-bold transition-colors"
//           >
//             <FaCheck />
//             Approve
//           </button>

//           <button
//             onClick={() => setShowConfirmReject(true)}
//             className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-500 rounded-lg text-sm font-bold transition-colors"
//           >
//             <FaTimes />
//             Reject
//           </button>
//         </div>
//       </div>

//       {/* Approve Confirmation Dialog */}
//       {showConfirmApprove && (
//         <ConfirmationDialog
//           title="Approve Member Request"
//           message={`Are you sure you want to approve ${member.name}'s request for POR of ${member.club_name} as ${member.position}?`}
//           confirmText="Approve"
//           confirmColor="bg-green-600 hover:bg-green-500"
//           onConfirm={handleApprove}
//           onCancel={() => setShowConfirmApprove(false)}
//         />
//       )}

//       {/* Reject Confirmation Dialog */}
//       {showConfirmReject && (
//         <ConfirmationDialog
//           title="Reject Member Request"
//           message={`Are you sure you want to reject ${member.name}'s request for POR of ${member.club_name} as ${member.position}? This action cannot be undone.`}
//           confirmText="Reject"
//           confirmColor="bg-red-600 hover:bg-red-500"
//           onConfirm={handleReject}
//           onCancel={() => setShowConfirmReject(false)}
//         />
//       )}
//     </>
//   );
// };

// const ConfirmationDialog = ({ title, message, confirmText, confirmColor, onConfirm, onCancel }) => {
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
//       <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 max-w-md w-full mx-4">
//         <div className="flex items-center gap-3 mb-4">
//           <FaExclamationTriangle className="text-yellow-500 text-xl" />
//           <h3 className="text-lg font-bold text-white">{title}</h3>
//         </div>

//         <p className="text-gray-300 mb-6">{message}</p>

//         <div className="flex gap-3 justify-end">
//           <button
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={onConfirm}
//             className={`px-4 py-2 ${confirmColor} rounded-lg text-sm font-bold transition-colors`}
//           >
//             {confirmText}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };





"use client";

import React, { useState } from "react";
import {
  FaUsers,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaCheck,
  FaTimes,
  FaExclamationTriangle
} from "react-icons/fa";

/* ===========================
   CLIENT COMPONENT
=========================== */

export default function MemberVerificationClient({ stats, members, success, action }) {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <FaUsers className="text-blue-500" />
          POR / Club Member Verification
        </h1>
        <p className="text-gray-400 mt-1">
          Review and approve club member requests
        </p>
      </div>

      {/* Success / Error Alert */}
      {success && action && (
        <div
          className={`flex items-center gap-2 p-4 border rounded-lg transition-all ${
            action === "approved"
              ? "bg-green-900/50 border-green-500 text-green-400"
              : "bg-red-900/50 border-red-500 text-red-400"
          }`}
        >
          <FaCheckCircle
            className={action === "approved" ? "text-green-500" : "text-red-500"}
          />
          <span>Member {action} successfully!</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatsCard icon={<FaClock />} color="text-yellow-500" title="Pending" value={stats.pending} />
        <StatsCard icon={<FaCheckCircle />} color="text-green-500" title="Approved" value={stats.approved} />
        <StatsCard icon={<FaTimesCircle />} color="text-red-500" title="Rejected" value={stats.rejected} />
      </div>

      {/* Pending Requests */}
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition">
        <h3 className="text-lg font-bold text-white mb-6">
          Pending Requests
        </h3>

        {members.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            No pending club member requests.
          </div>
        ) : (
          <div className="space-y-4">
            {members.map(m => (
              <MemberRequestCard key={m.member_id} member={m} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===========================
   STATS CARD
=========================== */

const StatsCard = ({ icon, color, title, value }) => (
  <div
    className="
      bg-gray-900 border border-gray-800 p-6 rounded-2xl
      relative overflow-hidden
      group hover:border-gray-700
      transition-all duration-200
    "
  >
    <div
      className={`
        absolute top-0 right-0 p-4
        opacity-10 group-hover:opacity-20
        transition-opacity duration-200
        text-8xl ${color}
      `}
    >
      {icon}
    </div>

    <h3 className="text-gray-400 text-sm uppercase tracking-wider">
      {title}
    </h3>

    <p className="text-4xl font-bold text-white mt-3">
      {value}
    </p>
  </div>
);

/* ===========================
   MEMBER REQUEST CARD
=========================== */

const MemberRequestCard = ({ member }) => {
  const [showConfirmApprove, setShowConfirmApprove] = useState(false);
  const [showConfirmReject, setShowConfirmReject] = useState(false);

  const handleApprove = async () => {
    try {
      const res = await fetch(`/api/club/approve/${member.member_id}`, {
        method: "POST",
      });

      if (res.ok) {
        window.location.href =
          "/dashboard/general_secretary/verify-members?success=true&action=approved";
      } else {
        alert("Failed to approve member.");
      }
    } catch {
      alert("Something went wrong.");
    }
    setShowConfirmApprove(false);
  };

  const handleReject = async () => {
    try {
      const res = await fetch(`/api/club/reject/${member.member_id}`, {
        method: "POST",
      });

      if (res.ok) {
        window.location.href =
          "/dashboard/general_secretary/verify-members?success=true&action=rejected";
      } else {
        alert("Failed to reject member.");
      }
    } catch {
      alert("Something went wrong.");
    }
    setShowConfirmReject(false);
  };

  return (
    <>
      <div
        className="
          flex justify-between items-center p-4
          bg-gray-950/60 border border-gray-800
          rounded-xl group
          hover:border-gray-700 hover:bg-gray-950/80
          transition-all duration-200
        "
      >
        <div>
          <p className="text-white font-semibold">{member.name}</p>
          <p className="text-sm text-gray-400">{member.email}</p>

          <div className="flex gap-3 mt-2 text-xs">
            <span className="
              px-3 py-1 rounded-full
              bg-blue-500/10 text-blue-400
              group-hover:bg-blue-500/20 transition
            ">
              {member.club_name}
            </span>

            <span className="
              px-3 py-1 rounded-full
              bg-purple-500/10 text-purple-400
              group-hover:bg-purple-500/20 transition
            ">
              {member.position}
            </span>
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Requested on {new Date(member.added_at).toLocaleDateString()}
          </p>

          {member.remarks && (
            <div className="mt-3 p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <p className="text-xs text-blue-300 font-medium mb-1">Club Remarks:</p>
              <p className="text-sm text-blue-200 italic">"{member.remarks}"</p>
            </div>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setShowConfirmApprove(true)}
            className="
              flex items-center gap-2 px-4 py-2
              bg-green-600 hover:bg-green-500
              rounded-lg text-sm font-bold
              transition-all duration-200
            "
          >
            <FaCheck />
            Approve
          </button>

          <button
            onClick={() => setShowConfirmReject(true)}
            className="
              flex items-center gap-2 px-4 py-2
              bg-red-600 hover:bg-red-500
              rounded-lg text-sm font-bold
              transition-all duration-200
            "
          >
            <FaTimes />
            Reject
          </button>
        </div>
      </div>

      {/* Approve Confirmation */}
      {showConfirmApprove && (
        <ConfirmationDialog
          title="Approve Member Request"
          message={`Are you sure you want to approve ${member.name}'s request for POR of ${member.club_name} as ${member.position}?`}
          confirmText="Approve"
          confirmColor="bg-green-600 hover:bg-green-500"
          onConfirm={handleApprove}
          onCancel={() => setShowConfirmApprove(false)}
        />
      )}

      {/* Reject Confirmation */}
      {showConfirmReject && (
        <ConfirmationDialog
          title="Reject Member Request"
          message={`Are you sure you want to reject ${member.name}'s request for POR of ${member.club_name} as ${member.position}? This action cannot be undone.`}
          confirmText="Reject"
          confirmColor="bg-red-600 hover:bg-red-500"
          onConfirm={handleReject}
          onCancel={() => setShowConfirmReject(false)}
        />
      )}
    </>
  );
};

/* ===========================
   CONFIRMATION DIALOG
=========================== */

const ConfirmationDialog = ({ title, message, confirmText, confirmColor, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div
        className="
          bg-gray-900 border border-gray-700
          hover:border-gray-600
          transition rounded-xl
          p-6 max-w-md w-full mx-4
        "
      >
        <div className="flex items-center gap-3 mb-4">
          <FaExclamationTriangle className="text-yellow-500 text-xl" />
          <h3 className="text-lg font-bold text-white">{title}</h3>
        </div>

        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex gap-3 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm font-medium transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 ${confirmColor} rounded-lg text-sm font-bold transition`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};







