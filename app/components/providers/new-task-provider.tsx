'use client'

interface NewTaskProviderProps {
  children: ReactNode
}

import { NewTaskContext } from '@/contexts/new-task-context'
import { Task } from '@/types/scheduler'
import React, { ReactNode, useState } from 'react'

export const NewTaskProvider = ({ children }: NewTaskProviderProps) => {
  const [newTask, setNewTask] = useState<Task>({
    name: '',
    duration: 1800,
    priority: 0.5,
  })

  return (
    <NewTaskContext.Provider value={{ newTask, setNewTask }}>
      {children}
    </NewTaskContext.Provider>
  )
}
