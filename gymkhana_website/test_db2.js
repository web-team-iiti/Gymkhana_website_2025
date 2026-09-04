const { Client } = require("pg");
const fs = require("fs");

async function run() {
  const envContent = fs.readFileSync(".env.local", "utf8");
  const dbUrlLine = envContent.split("\n").find(line => line.startsWith("DATABASE_URL="));
  const dbUrl = dbUrlLine.split("=")[1].trim();

  const client = new Client({ connectionString: dbUrl });
  await client.connect();

  const res = await client.query("SELECT column_name, data_type FROM information_schema.columns WHERE table_name = 'ibcc_contentions'");
  console.log(res.rows);

  await client.end();
}

run().catch(console.error);
