'use client'

import { useTasks } from '@/hooks/use-tasks'
import { Task } from '@/types/scheduler'
import { formatDuration } from '@/utils/sidebar'

interface TaskCardProps {
  task: Task
  index: number
}

export const TaskCard = ({ task, index }: TaskCardProps) => {
  const { tasks, setTasks } = useTasks()

  // Remove a task from the list
  const removeTask = (index: number) => {
    const updatedTasks = [...tasks]
    updatedTasks.splice(index, 1)
    setTasks(updatedTasks)
  }
  return (
    <div
      key={index}
      className='flex items-center justify-between bg-gray-50 p-2 rounded'
    >
      <div>
        <span className='font-medium'>{task.name}</span>
        <div className='text-sm text-gray-600'>
          {formatDuration(task.duration)} · Priority: {task.priority}
        </div>
      </div>
      <button
        onClick={() => removeTask(index)}
        className='text-red-500 hover:text-red-700'
      >
        ✕
      </button>
    </div>
  )
}
