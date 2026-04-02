import { pool } from './index.js'

export async function migrate() {
  const client = await pool.connect()
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS todos (
        id          SERIAL PRIMARY KEY,
        title       TEXT        NOT NULL,
        description TEXT,
        priority    TEXT        NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
        completed   BOOLEAN     NOT NULL DEFAULT FALSE,
        created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
        updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
      );
    `)
    console.log('✓ Migrations applied')
  } finally {
    client.release()
  }
}
