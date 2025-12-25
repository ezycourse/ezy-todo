'use client'

import { useState, useEffect } from 'react'
import TodoForm from './TodoForm'
import TodoList from './TodoList'
import TodoStats from './TodoStats'

interface Todo {
  id: number
  title: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}

export default function TodoComp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch todos from API
  useEffect(() => {
    fetchTodos()
  }, [])

  const fetchTodos = async () => {
    try {
      setLoading(true)
      const response = await fetch('http://localhost:3333/todo')
      if (!response.ok) throw new Error('Failed to fetch todos')
      const data = await response.json()
      setTodos(Array.isArray(data) ? data : [])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const addTodo = async (title: string) => {
    if (!title.trim()) return

    try {
      const response = await fetch('http://localhost:3333/todo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!response.ok) throw new Error('Failed to create todo')
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add todo')
    }
  }

  const updateTodo = async (id: number, title: string) => {
    try {
      const response = await fetch(`http://localhost:3333/todo/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title }),
      })
      if (!response.ok) throw new Error('Failed to update todo')
      await fetchTodos()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update todo')
    }
  }

  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3333/todo/${id}`, {
        method: 'DELETE',
      })
      if (!response.ok) throw new Error('Failed to delete todo')
      setTodos(todos.filter(todo => todo.id !== id))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete todo')
    }
  }

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Tasks</h1>
          <p className="text-gray-600">Stay organized and productive</p>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
            <button
              onClick={() => setError(null)}
              className="text-red-600 text-sm font-semibold mt-2 hover:text-red-800"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Stats */}
        <TodoStats todos={todos} />

        {/* Add Todo Form */}
        <TodoForm onAdd={addTodo} />

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            <p className="text-gray-600 mt-4">Loading your tasks...</p>
          </div>
        )}

        {/* Todo List */}
        {!loading && (
          <TodoList
            todos={todos}
            onUpdate={updateTodo}
            onDelete={deleteTodo}
            onToggle={toggleTodo}
          />
        )}

        {/* Empty State */}
        {!loading && todos.length === 0 && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">📝</div>
            <p className="text-gray-600 text-lg">No tasks yet. Create one to get started!</p>
          </div>
        )}
      </div>
    </div>
  )
}
