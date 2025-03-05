'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { formatDuration } from '@/utils/sidebar'

export const UnscheduledTasksList = () => {
  const { schedule } = useSchedule()

  return (
    schedule &&
    schedule.unscheduled_tasks.length > 0 && (
      <div className='sidebar-group'>
        <h3 className='sidebar-subheading'>Unscheduled Tasks</h3>
        <ul className='text-xs'>
          {schedule.unscheduled_tasks.map((task, index) => (
            <li key={index}>
              <span>{task.name}</span> ({formatDuration(task.duration)})
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
