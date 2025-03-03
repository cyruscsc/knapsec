import { ScheduleContext } from '@/contexts/schedule-context'
import { useContext } from 'react'

export const useSchedule = () => {
  const context = useContext(ScheduleContext)

  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider')
  }

  return context
}
