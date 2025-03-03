import { ScheduleResponse } from '@/types/scheduler'
import { createContext, Dispatch, SetStateAction } from 'react'

interface ScheduleContextProps {
  schedule: ScheduleResponse | null
  setSchedule: Dispatch<SetStateAction<ScheduleResponse | null>>
}

export const ScheduleContext = createContext<ScheduleContextProps | undefined>(
  undefined
)
