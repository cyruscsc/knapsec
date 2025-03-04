import { WeekContext } from '@/contexts/week-context'
import { useContext } from 'react'

export const useWeek = () => {
  const context = useContext(WeekContext)

  if (!context) {
    throw new Error('useWeek must be used within a WeekProvider')
  }

  return context
}
