'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { formatDuration } from '@/utils/sidebar'

export const StatisticsList = () => {
  const { schedule } = useSchedule()

  return (
    schedule && (
      <div className='sidebar-group'>
        <h3 className='sidebar-subheading'>Statistics</h3>
        <div className='grid grid-cols-2 text-xs'>
          <div>Priority Achieved:</div>
          <div>{schedule.total_priority_achieved.toFixed(1)}</div>

          <div>Time Utilized:</div>
          <div>{formatDuration(schedule.time_utilized)}</div>

          <div>Utilization:</div>
          <div>{schedule.utilization_percentage}%</div>
        </div>
      </div>
    )
  )
}
