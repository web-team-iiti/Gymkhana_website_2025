const { query } = require('./config/db.js');

async function migrate() {
  try {
    // 1. Create the junction table
    await query(`
      CREATE TABLE IF NOT EXISTS ibcc_contingent_leaders (
        contingent_id INTEGER REFERENCES ibcc_contingents(id) ON DELETE CASCADE,
        user_id UUID REFERENCES users(id) ON DELETE CASCADE,
        PRIMARY KEY (contingent_id, user_id)
      );
    `);
    console.log("Created ibcc_contingent_leaders table.");

    // 2. Migrate existing leaders over (if any exist)
    await query(`
      INSERT INTO ibcc_contingent_leaders (contingent_id, user_id)
      SELECT id, leader_id 
      FROM ibcc_contingents 
      WHERE leader_id IS NOT NULL
      ON CONFLICT DO NOTHING;
    `);
    console.log("Migrated existing leaders.");

    // 3. Drop the old column
    await query(`
      ALTER TABLE ibcc_contingents
      DROP COLUMN IF EXISTS leader_id;
    `);
    console.log("Dropped old leader_id column.");

    process.exit(0);
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
}

migrate();
