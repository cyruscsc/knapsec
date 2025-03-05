'use client'

import { useNewTask } from '@/hooks/use-new-task'
import { useTasks } from '@/hooks/use-tasks'

export const AddTaskButton = () => {
  const { tasks, setTasks } = useTasks()
  const { newTask, setNewTask } = useNewTask()

  // Add a new task to the list
  const addTask = () => {
    setTasks([...tasks, { ...newTask }])
    setNewTask({ name: '', duration: 1800, priority: 0.5 })
  }

  return (
    <button
      onClick={addTask}
      disabled={newTask.name.trim() === ''}
      className='btn'
    >
      Add Task
    </button>
  )
}
