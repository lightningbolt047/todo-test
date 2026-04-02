import { useState, useEffect, useCallback } from 'react'

const API = '/api/todos'

export function useTodos() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch(API)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch')
        return res.json()
      })
      .then((data) => {
        setTodos(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message)
        setLoading(false)
      })
  }, [])

  const createTodo = useCallback(async ({ title }) => {
    const res = await fetch(API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    if (!res.ok) throw new Error('Failed to create')
    const todo = await res.json()
    setTodos((prev) => [todo, ...prev])
  }, [])

  const toggleTodo = useCallback(async (id, completed) => {
    const res = await fetch(`${API}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed }),
    })
    if (!res.ok) throw new Error('Failed to update')
    const updated = await res.json()
    setTodos((prev) => prev.map((t) => (t.id === id ? updated : t)))
  }, [])

  const deleteTodo = useCallback(async (id) => {
    const res = await fetch(`${API}/${id}`, { method: 'DELETE' })
    if (!res.ok) throw new Error('Failed to delete')
    setTodos((prev) => prev.filter((t) => t.id !== id))
  }, [])

  return { todos, loading, error, createTodo, toggleTodo, deleteTodo }
}
