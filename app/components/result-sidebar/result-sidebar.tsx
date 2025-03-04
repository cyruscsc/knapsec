'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { StatisticsList } from './statistics-list'
import { UnscheduledTasksList } from './unscheduled-tasks-list'
import { ResetScheduleButton } from './reset-schedule-button'

export const ResultSidebar = () => {
  const { schedule } = useSchedule()

  return (
    schedule && (
      <div className='bg-white p-4 rounded-lg shadow-md'>
        <h2 className='text-xl font-semibold mb-4'>Schedule Results</h2>

        <StatisticsList />
        <UnscheduledTasksList />
        <ResetScheduleButton />
      </div>
    )
  )
}
