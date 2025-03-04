import { Task } from '@/types/scheduler'
import { createContext, Dispatch, SetStateAction } from 'react'

interface NewTaskContextProps {
  newTask: Task
  setNewTask: Dispatch<SetStateAction<Task>>
}

export const NewTaskContext = createContext<NewTaskContextProps | undefined>(
  undefined
)
