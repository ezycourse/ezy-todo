'use client'

import { useState } from 'react'
import TodoItem from './TodoItem'

interface Todo {
  id: number
  title: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}

interface TodoListProps {
  todos: Todo[]
  onUpdate: (id: number, title: string) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export default function TodoList({
  todos,
  onUpdate,
  onDelete,
  onToggle,
}: TodoListProps) {
  const [editingId, setEditingId] = useState<number | null>(null)

  return (
    <div className="space-y-2 bg-white rounded-lg shadow-sm overflow-hidden">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          isEditing={editingId === todo.id}
          onEditStart={() => setEditingId(todo.id)}
          onEditEnd={() => setEditingId(null)}
          onUpdate={onUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  )
}
