'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { formatDuration } from '@/utils/sidebar'

export const UnscheduledTasksList = () => {
  const { schedule } = useSchedule()

  return (
    schedule &&
    schedule.unscheduled_tasks.length > 0 && (
      <div className='mb-4'>
        <h3 className='font-semibold'>Unscheduled Tasks</h3>
        <ul className='text-sm'>
          {schedule.unscheduled_tasks.map((task, index) => (
            <li key={index} className='py-1'>
              <span className='font-medium'>{task.name}</span> (
              {formatDuration(task.duration)})
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
