'use client'

import { useNewTask } from '@/hooks/use-new-task'

export const DurationSelect = () => {
  const { newTask, setNewTask } = useNewTask()

  return (
    <div className='sidebar-field'>
      <label>Duration:</label>
      <select
        className='input'
        value={newTask.duration}
        onChange={(e) =>
          setNewTask({
            ...newTask,
            duration: Number(e.target.value),
          })
        }
      >
        <option value='1800'>30 minutes</option>
        <option value='3600'>1 hour</option>
        <option value='5400'>1.5 hours</option>
        <option value='7200'>2 hours</option>
        <option value='10800'>3 hours</option>
      </select>
    </div>
  )
}
