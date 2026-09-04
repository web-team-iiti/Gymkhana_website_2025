const { query } = require("./config/db.js");

async function run() {
  const res = await query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'ibcc_contentions'");
  console.log("ibcc_contentions columns:", res.rows);
  
  const res2 = await query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'");
  console.log("tables:", res2.rows.map(r => r.table_name));
  process.exit(0);
}

run();
