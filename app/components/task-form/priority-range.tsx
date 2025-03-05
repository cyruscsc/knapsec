'use client'

import { useNewTask } from '@/hooks/use-new-task'

export const PriorityRange = () => {
  const { newTask, setNewTask } = useNewTask()

  return (
    <div className='sidebar-field'>
      <label className='text-sm'>Priority:</label>
      <div className='flex items-center gap-2'>
        <input
          type='range'
          min='0.1'
          max='1'
          step='0.1'
          className='slider'
          value={newTask.priority}
          onChange={(e) =>
            setNewTask({
              ...newTask,
              priority: parseFloat(e.target.value),
            })
          }
        />
        <span className='text-sm'>{newTask.priority.toFixed(1)}</span>
      </div>
    </div>
  )
}
