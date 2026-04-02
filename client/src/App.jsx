import { Routes, Route, Navigate } from 'react-router-dom'
import TodosPage from './pages/TodosPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" replace />} />
      <Route path="/todos" element={<TodosPage />} />
    </Routes>
  )
}
