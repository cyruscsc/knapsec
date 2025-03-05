'use client'

import { ResetScheduleButton } from './reset-schedule-button'
import { StatisticsList } from './statistics-list'
import { UnscheduledTasksList } from './unscheduled-tasks-list'
import { useSchedule } from '@/hooks/use-schedule'

export const ResultSidebar = () => {
  const { schedule } = useSchedule()

  return (
    schedule && (
      <div className='sidebar'>
        <h2 className='sidebar-heading'>Schedule Results</h2>

        <StatisticsList />
        <UnscheduledTasksList />
        <ResetScheduleButton />
      </div>
    )
  )
}
