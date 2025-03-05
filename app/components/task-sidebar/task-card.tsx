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
    <div key={index} className='sidebar-card'>
      <div className='ms-2'>
        <div className='bg-sirocco-400 absolute top-0 bottom-0 left-0 w-2'></div>
        <span>{task.name}</span>
        <div className='text-xs'>
          {formatDuration(task.duration)} · Priority: {task.priority}
        </div>
      </div>
      <button
        onClick={() => removeTask(index)}
        className='text-sirocco-400 hover:text-sirocco-500 cursor-pointer transition-colors duration-150'
      >
        ✕
      </button>
    </div>
  )
}
