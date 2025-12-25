'use client'

import { useState } from 'react'

interface Todo {
  id: number
  title: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}

interface TodoItemProps {
  todo: Todo
  isEditing: boolean
  onEditStart: () => void
  onEditEnd: () => void
  onUpdate: (id: number, title: string) => void
  onDelete: (id: number) => void
  onToggle: (id: number) => void
}

export default function TodoItem({
  todo,
  isEditing,
  onEditStart,
  onEditEnd,
  onUpdate,
  onDelete,
  onToggle,
}: TodoItemProps) {
  const [editValue, setEditValue] = useState(todo.title)
  const [isDeleting, setIsDeleting] = useState(false)

  const handleSave = async () => {
    if (editValue.trim() && editValue !== todo.title) {
      await onUpdate(todo.id, editValue)
    }
    onEditEnd()
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    onDelete(todo.id)
  }

  const handleCancel = () => {
    setEditValue(todo.title)
    onEditEnd()
  }

  if (isDeleting) {
    return null
  }

  return (
    <div className="border-b last:border-b-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3 p-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-6 h-6 rounded border-2 flex items-center justify-center transition-colors ${
            todo.completed
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 hover:border-gray-400'
          }`}
        >
          {todo.completed && <span className="text-white text-sm">✓</span>}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              autoFocus
              className="w-full px-2 py-1 border border-indigo-400 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500 text-gray-900"
            />
          ) : (
            <p
              className={`text-gray-900 cursor-pointer hover:text-indigo-600 transition-colors ${
                todo.completed ? 'line-through text-gray-400' : ''
              }`}
              onClick={onEditStart}
            >
              {todo.title}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex-shrink-0 flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={handleSave}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded hover:bg-green-600 transition-colors"
              >
                Save
              </button>
              <button
                onClick={handleCancel}
                className="px-3 py-1 bg-gray-300 text-gray-700 text-sm rounded hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <button
                onClick={onEditStart}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                title="Edit"
              >
                ✏️
              </button>
              <button
                onClick={handleDelete}
                className="p-2 text-red-600 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                🗑️
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
