'use client'

import { useWeek } from '@/hooks/use-week'

export const HeaderRow = () => {
  const { days } = useWeek()
  return (
    <>
      {/* Header row with days */}
      <div></div>
      {days.map((day, index) => (
        <div key={index} className='timetable-border p-2 text-center'>
          <div className='timetable-heading'>{day.name}</div>
          <div className='text-xs'>{day.formattedDate}</div>
        </div>
      ))}
    </>
  )
}
