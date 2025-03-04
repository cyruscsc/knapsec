'use client'

import { useNewTask } from '@/hooks/use-new-task'

export const NameInput = () => {
  const { newTask, setNewTask } = useNewTask()

  return (
    <input
      type='text'
      placeholder='Task name'
      className='w-full p-2 border rounded'
      value={newTask.name}
      onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
    />
  )
}
