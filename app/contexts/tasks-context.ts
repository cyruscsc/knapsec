import { Task } from '@/types/scheduler'
import { createContext, Dispatch, SetStateAction } from 'react'

interface TasksContextProps {
  tasks: Task[]
  setTasks: Dispatch<SetStateAction<Task[]>>
}

export const TasksContext = createContext<TasksContextProps | undefined>(
  undefined
)
