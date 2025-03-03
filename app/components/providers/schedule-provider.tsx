'use client'

import { ScheduleContext } from '@/contexts/schedule-context'
import { ScheduleResponse } from '@/types/scheduler'
import { ReactNode, useEffect, useState } from 'react'

interface ScheduleProviderProps {
  children: ReactNode
}

export const ScheduleProvider = ({ children }: ScheduleProviderProps) => {
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(() => {
    const savedSchedule = localStorage.getItem('schedule')

    if (savedSchedule) {
      return JSON.parse(savedSchedule)
    }

    return null
  })

  useEffect(() => {
    localStorage.setItem('schedule', JSON.stringify(schedule))
  }, [schedule])

  return (
    <ScheduleContext.Provider value={{ schedule, setSchedule }}>
      {children}
    </ScheduleContext.Provider>
  )
}
