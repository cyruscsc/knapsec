'use client'

import { WeekContext } from '@/contexts/week-context'
import { addDays, format, startOfWeek } from 'date-fns'
import { ReactNode } from 'react'

interface WeekProviderProps {
  children: ReactNode
}

export const WeekProvider = ({ children }: WeekProviderProps) => {
  const today = new Date()
  const weekStart = startOfWeek(today, { weekStartsOn: 1 }) // Start on Monday
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(weekStart, i)
    return {
      date: day,
      name: format(day, 'EEEE'),
      formattedDate: format(day, 'MMM d'),
    }
  })

  return (
    <WeekContext.Provider value={{ today, weekStart, days }}>
      {children}
    </WeekContext.Provider>
  )
}
