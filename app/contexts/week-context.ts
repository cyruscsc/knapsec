import { createContext } from 'react'

interface WeekContextProps {
  today: Date
  weekStart: Date
  days: {
    date: Date
    name: string
    formattedDate: string
  }[]
}

export const WeekContext = createContext<WeekContextProps | undefined>(
  undefined
)
