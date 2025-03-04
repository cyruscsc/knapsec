import { NewTaskContext } from '@/contexts/new-task-context'
import { useContext } from 'react'

export const useNewTask = () => {
  const context = useContext(NewTaskContext)

  if (!context) {
    throw new Error('useNewTask must be used within a NewTaskProvider')
  }

  return context
}
