'use client'

import { TasksContext } from '@/contexts/tasks-context'
import { Task } from '@/types/scheduler'
import { ReactNode, useEffect, useState } from 'react'

interface TasksProviderProps {
  children: ReactNode
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      return JSON.parse(savedTasks)
    }

    return []
  })

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}
