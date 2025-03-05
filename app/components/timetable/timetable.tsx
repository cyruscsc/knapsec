'use client'

import { Cell } from './cell'
import { HeaderRow } from './header-row'
import { TimeLabel } from './time-label'
import { useSchedule } from '@/hooks/use-schedule'
import { useSelection } from '@/hooks/use-selection'
import { useWeek } from '@/hooks/use-week'
import {
  getCellKey,
  getScheduledTaskForCell,
  isTaskStart,
} from '@/utils/timetable'
import { Fragment } from 'react'

export const Timetable: React.FC = () => {
  const { selection, setSelection } = useSelection()
  const { schedule } = useSchedule()
  const { weekStart, days } = useWeek()

  // Generate time slots
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0')
    return `${hour}:00`
  })

  // Toggle cell selection
  const toggleSelection = (day: number, hour: number, minute: number) => {
    const key = getCellKey(day, hour, minute)
    const newSelection = new Map(selection)

    if (newSelection.has(key)) {
      newSelection.delete(key)
    } else {
      newSelection.set(key, true)
    }

    setSelection(newSelection)
  }

  return (
    <div className='overflow-auto lg:w-3/4'>
      <div className='min-w-[900px]'>
        <div className='grid grid-cols-8'>
          <HeaderRow />

          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <Fragment key={timeIndex}>
              {/* Time label */}
              <TimeLabel time={time} />

              {/* First 30 minutes */}
              {days.map((_, dayIndex) => {
                const cellKey = getCellKey(dayIndex, timeIndex, 0)
                const isSelected = selection?.has(cellKey)
                const task = getScheduledTaskForCell(
                  dayIndex,
                  timeIndex,
                  0,
                  schedule,
                  weekStart
                )
                const isStart = isTaskStart(
                  dayIndex,
                  timeIndex,
                  0,
                  schedule,
                  weekStart
                )

                return (
                  <Cell
                    key={`${dayIndex}-${timeIndex}-0`}
                    task={task}
                    isSelected={isSelected}
                    isStart={isStart}
                    handleClick={() =>
                      !schedule && toggleSelection(dayIndex, timeIndex, 0)
                    }
                  />
                )
              })}

              {/* Second 30 minutes */}
              {days.map((_, dayIndex) => {
                const cellKey = getCellKey(dayIndex, timeIndex, 30)
                const isSelected = selection?.has(cellKey)
                const task = getScheduledTaskForCell(
                  dayIndex,
                  timeIndex,
                  30,
                  schedule,
                  weekStart
                )
                const isStart = isTaskStart(
                  dayIndex,
                  timeIndex,
                  30,
                  schedule,
                  weekStart
                )

                return (
                  <Cell
                    key={`${dayIndex}-${timeIndex}-30`}
                    task={task}
                    isSelected={isSelected}
                    isStart={isStart}
                    handleClick={() =>
                      !schedule && toggleSelection(dayIndex, timeIndex, 30)
                    }
                  />
                )
              })}
            </Fragment>
          ))}
        </div>
      </div>
    </div>
  )
}
