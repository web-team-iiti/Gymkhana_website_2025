import { query } from "@/config/db"; // Direct DB access (No API call needed!)
import EditProposalForm from "@/components/EditProposalForm";
import { notFound } from "next/navigation";

// Fetch Helper (Runs on Server)
async function getProposal(id) {
  // 1. Validate UUID format
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(id)) return null;

  // 2. Direct Database Query
  const sql = `SELECT * FROM proposals WHERE id = $1`;
  const res = await query(sql, [id]);
  return res.rows[0];
}

export default async function EditPage({ params }) {
  // Next.js 15: Await params
  const { id } = await params;

  // Fetch data BEFORE rendering
  const proposal = await getProposal(id);

  // Handle 404
  if (!proposal) return notFound();

  // Render the Client Form with data already loaded
  return <EditProposalForm proposal={proposal} />;
}