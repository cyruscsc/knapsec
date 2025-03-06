'use client'

import { useWeek } from '@/hooks/use-week'

export const HeaderRow = () => {
  const { days } = useWeek()
  return (
    <div className='sticky top-0 z-10 grid w-full grid-cols-[2rem_repeat(7,1fr)]'>
      {/* Header row with days */}
      <div className='bg-mist-900 mb-2'></div>
      {days.map((day, index) => (
        <div
          key={index}
          className='timetable-border bg-mist-900 p-2 text-center'
        >
          <div className='timetable-heading'>{day.name}</div>
          <div className='text-xs'>{day.formattedDate}</div>
        </div>
      ))}
    </div>
  )
}
