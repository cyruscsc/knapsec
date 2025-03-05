'use client'

import { useNewTask } from '@/hooks/use-new-task'

export const NameInput = () => {
  const { newTask, setNewTask } = useNewTask()

  return (
    <input
      type='text'
      placeholder='Task name'
      className='input'
      value={newTask.name}
      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
    />
  )
}
