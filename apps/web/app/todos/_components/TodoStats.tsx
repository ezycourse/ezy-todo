'use client'

interface Todo {
  id: number
  title: string
  completed?: boolean
  createdAt: string
  updatedAt: string
}

interface TodoStatsProps {
  todos: Todo[]
}

export default function TodoStats({ todos }: TodoStatsProps) {
  const completedCount = todos.filter(t => t.completed).length
  const totalCount = todos.length
  const remainingCount = totalCount - completedCount

  return (
    <div className="grid grid-cols-3 gap-4 mb-8">
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-indigo-600">{totalCount}</div>
        <p className="text-gray-600 text-sm mt-1">Total Tasks</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-green-600">{completedCount}</div>
        <p className="text-gray-600 text-sm mt-1">Completed</p>
      </div>
      <div className="bg-white rounded-lg shadow-sm p-6 text-center">
        <div className="text-3xl font-bold text-orange-600">{remainingCount}</div>
        <p className="text-gray-600 text-sm mt-1">Remaining</p>
      </div>
    </div>
  )
}
