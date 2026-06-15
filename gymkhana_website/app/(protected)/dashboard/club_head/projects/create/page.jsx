
import { auth } from "@/auth";
import { query } from "@/config/db";
import { FaEdit, FaTrash } from "react-icons/fa";

import AddProjectForm from "./AddProjectForm";

export default async function CreateProjectPage() {
  const session = await auth();

  if (!session || session.user.role !== "club_head") {
    return <div className="p-8 text-red-400">Unauthorized</div>;
  }

  const res = await query(
    `SELECT club_id FROM clubs WHERE club_head_id = $1`,
    [session.user.id]
  );

  if (res.rows.length === 0) {
    return <div className="p-8 text-red-400">No club assigned</div>;
  }

  return <AddProjectForm clubId={res.rows[0].club_id} />;
}
