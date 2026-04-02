import pg from 'pg'
import 'dotenv/config'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error', err)
})

export async function query(text, params) {
  const client = await pool.connect()
  try {
    return await client.query(text, params)
  } finally {
    client.release()
  }
}

export function namedQuery(sql, params) {
  const values = []
  const text = sql.replace(/:(\w+)/g, (_, name) => {
    values.push(params[name])
    return `$${values.length}`
  })
  return query(text, values)
}
