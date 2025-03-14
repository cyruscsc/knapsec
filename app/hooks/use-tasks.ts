import { TasksContext } from '@/contexts/tasks-context'
import { useContext } from 'react'

export const useTasks = () => {
  const context = useContext(TasksContext)

  if (!context) {
    throw new Error('useTasks must be used within a TasksProvider')
  }

  return context
}
