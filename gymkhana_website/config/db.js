// config/db.js
import { Pool } from "pg";

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  throw new Error("Please define DATABASE_URL in your .env.local file");
}

let pool;

if (!global.postgresPool) {
  global.postgresPool = new Pool({
    connectionString,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
  });
}

pool = global.postgresPool;

// --- THIS IS THE PART YOU ARE MISSING ---
export const query = async (text, params) => {
  return await pool.query(text, params);
};
// ----------------------------------------

export default pool;