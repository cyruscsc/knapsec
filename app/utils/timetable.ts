import { ScheduledTask, ScheduleResponse } from '@/types/scheduler'
import { addDays, parseISO } from 'date-fns'

// Helper function to get cell key
export const getCellKey = (day: number, hour: number, minute: number) => {
  return `${day}-${hour}-${minute}`
}

// Check if a cell is within a scheduled task
export const getScheduledTaskForCell = (
  day: number,
  hour: number,
  minute: number,
  schedule: ScheduleResponse | null,
  weekStart: Date
): ScheduledTask | null => {
  if (!schedule) return null

  const cellDate = addDays(weekStart, day)
  cellDate.setHours(hour, minute, 0, 0)

  for (const task of schedule.scheduled_tasks) {
    const startTime = parseISO(task.start_time)
    const endTime = parseISO(task.end_time)

    if (cellDate >= startTime && cellDate < endTime) {
      return task
    }
  }

  return null
}

// Check if a cell is the starting point of a scheduled task
export const isTaskStart = (
  day: number,
  hour: number,
  minute: number,
  schedule: ScheduleResponse | null,
  weekStart: Date
): boolean => {
  if (!schedule) return false

  const cellDate = addDays(weekStart, day)
  cellDate.setHours(hour, minute, 0, 0)

  return schedule.scheduled_tasks.some((task) => {
    const startTime = parseISO(task.start_time)
    return cellDate.getTime() === startTime.getTime()
  })
}
