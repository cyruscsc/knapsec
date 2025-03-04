import { TimeSlot } from '@/types/scheduler'
import { Selection } from '@/types/timetable'
import { addDays, addMinutes, format } from 'date-fns'

// Format duration from seconds to hours and minutes
export const formatDuration = (seconds: number): string => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)

  if (hours > 0) {
    return `${hours}h${minutes > 0 ? ` ${minutes}m` : ''}`
  }
  return `${minutes}m`
}

// Convert selection to time slots for API request
export const getSelectedTimeSlots = (
  selection: Selection,
  weekStart: Date
): TimeSlot[] => {
  const timeSlotMap = new Map<string, { start: Date; end: Date }>()

  Array.from(selection.keys()).forEach((key) => {
    const [day, hour, minute] = key.split('-').map(Number)
    const date = addDays(weekStart, day)
    date.setHours(hour, minute, 0, 0)

    // Set end time to 30 minutes later
    const endDate = addMinutes(date, 30)

    // Format dates for API
    const dateStr = format(date, 'yyyy-MM-dd')

    // Check if there's already a time slot for this day
    if (!timeSlotMap.has(dateStr)) {
      timeSlotMap.set(dateStr, { start: date, end: endDate })
    } else {
      const existing = timeSlotMap.get(dateStr)!

      // Extend the time slot if needed
      if (date < existing.start) {
        existing.start = date
      }
      if (endDate > existing.end) {
        existing.end = endDate
      }

      timeSlotMap.set(dateStr, existing)
    }
  })

  // Convert to array of time slots
  return Array.from(timeSlotMap.values()).map(({ start, end }) => ({
    start: format(start, "yyyy-MM-dd'T'HH:mm"),
    end: format(end, "yyyy-MM-dd'T'HH:mm"),
  }))
}
