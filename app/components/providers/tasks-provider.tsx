'use client'

import { TasksContext } from '@/contexts/tasks-context'
import { Task } from '@/types/scheduler'
import { ReactNode, useEffect, useState } from 'react'

interface TasksProviderProps {
  children: ReactNode
}

export const TasksProvider = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks')

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks))
  }, [tasks])

  return (
    <TasksContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TasksContext.Provider>
  )
}
