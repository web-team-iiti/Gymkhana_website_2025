import { auth } from "@/auth";
import { query } from "@/config/db";
import { FaCertificate, FaClock, FaCheckCircle } from "react-icons/fa";

async function getMyPORs(studentId) {
  const sql = `
    SELECT
      cm.member_id,
      c.club_name,
      cm.position,
      cm.status,
      cm.approved_at
    FROM club_members cm
    JOIN clubs c ON c.club_id = cm.club_id
    WHERE cm.student_id = $1
    ORDER BY cm.added_at DESC;
  `;
  const res = await query(sql, [studentId]);
  return res.rows;
}

export default async function StudentDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "student") {
    return <div className="text-red-400">Unauthorized</div>;
  }

  const pors = await getMyPORs(session.user.id);

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Welcome, {session.user.name}
        </h1>
        <p className="text-gray-400">{session.user.email}</p>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          My Positions of Responsibility
        </h2>

        {pors.length === 0 ? (
          <p className="text-gray-400">No PORs assigned yet.</p>
        ) : (
          <div className="space-y-4">
            {pors.map(p => (
              <div
                key={p.member_id}
                className="flex justify-between items-center bg-gray-950 border border-gray-800 rounded-xl p-4"
              >
                <div>
                  <p className="text-white font-semibold">{p.club_name}</p>
                  <p className="text-sm text-gray-400">{p.position}</p>

                  {p.status === "PENDING" && (
                    <span className="text-yellow-400 flex items-center gap-2 text-xs mt-2">
                      <FaClock /> Pending Approval
                    </span>
                  )}

                  {p.status === "APPROVED" && (
                    <span className="text-green-400 flex items-center gap-2 text-xs mt-2">
                      <FaCheckCircle /> Approved
                    </span>
                  )}
                </div>

                {p.status === "APPROVED" && (
                  <a
                    href={`/api/por/${p.member_id}`}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold"
                  >
                    <FaCertificate />
                    Download Certificate
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
