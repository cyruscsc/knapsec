'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { useSelection } from '@/hooks/use-selection'

export const ResetScheduleButton = () => {
  const { setSchedule } = useSchedule()
  const { setSelection } = useSelection()

  // Reset the schedule and selection
  const resetSchedule = () => {
    setSchedule(null)
    setSelection(new Map())
  }

  return (
    <button onClick={resetSchedule} className='btn'>
      Reset Schedule
    </button>
  )
}
