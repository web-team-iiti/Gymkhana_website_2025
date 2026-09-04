import { auth } from "@/auth";
import { query } from "@/config/db";
import AdminIBCCContingents from "@/components/ibcc/AdminIBCCContingents";

export default async function GSSNTContingentsPage() {
  const session = await auth();
  
  if (!session || session.user.role !== "gs_snt") {
    return <div>Access Denied.</div>;
  }

  // Fetch contingents with their leader names
  const contingentsRes = await query(`
    SELECT c.id, c.name, 
           string_agg(u.name, ', ') as leader_name,
           array_remove(array_agg(u.id), NULL) as leader_ids
    FROM ibcc_contingents c
    LEFT JOIN ibcc_contingent_leaders cl ON c.id = cl.contingent_id
    LEFT JOIN users u ON cl.user_id = u.id
    GROUP BY c.id, c.name
    ORDER BY c.name ASC
  `);

  // Fetch available users to assign as leaders
  const usersRes = await query(`
    SELECT id, name, email FROM users WHERE role = 'contingent_leader'
  `);

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">IBCC Contingents</h1>
        <p className="text-gray-400">Manage all participating contingents and assign their leaders.</p>
      </div>
      <AdminIBCCContingents 
        contingents={contingentsRes.rows} 
        users={usersRes.rows} 
      />
    </div>
  );
}
