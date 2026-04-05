import { namedQuery, query } from '../db/index.js'

export async function getAllTodos() {
  const { rows } = await query('SELECT * FROM todos ORDER BY created_at DESC')
  return rows
}

export async function createTodo({ title, description, priority }) {
  const { rows } = await namedQuery(
    'INSERT INTO todos (title, description, priority) VALUES (:title, :description, :priority) RETURNING *',
    { title, description, priority },
  )
  return rows[0]
}

export async function updateTodo(id, fields) {
  const allowed = ['title', 'description', 'priority', 'completed']
  const params = { id }
  const setClauses = []

  for (const key of allowed) {
    if (key in fields) {
      params[key] = fields[key]
      setClauses.push(`${key} = :${key}`)
    }
  }

  if (setClauses.length === 0) return { notFound: false, noFields: true }

  const { rows } = await namedQuery(
    `UPDATE todos SET ${setClauses.join(', ')}, updated_at = NOW() WHERE id = :id RETURNING *`,
    params,
  )
  return { todo: rows[0] ?? null, noFields: false }
}

export async function deleteTodo(id) {
  const { rowCount } = await namedQuery('DELETE FROM todos WHERE id = :id', { id })
  return rowCount > 0
}