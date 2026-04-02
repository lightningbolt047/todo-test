import { useTodos } from '../hooks/useTodos'

export default function TodosPage() {
  const { todos, loading, error, createTodo, toggleTodo, deleteTodo } =
    useTodos()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const title = e.target.title.value.trim()
    if (!title) return
    await createTodo({ title })
    e.target.reset()
  }

  return (
    <div>
      <h1>Todos</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="title"
          type="text"
          placeholder="New todo..."
          autoComplete="off"
        />
        <button type="submit">Add</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id, todo.completed)}
              />
              <span className={todo.completed ? 'done' : ''}>{todo.title}</span>
              <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
