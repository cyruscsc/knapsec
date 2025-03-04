'use client'

import { useWeek } from '@/hooks/use-week'

export const HeaderRow = () => {
  const { days } = useWeek()
  return (
    <>
      {/* Header row with days */}
      <div className='bg-gray-100 p-2 border-b border-r font-semibold'>
        Time
      </div>
      {days.map((day, index) => (
        <div
          key={index}
          className='bg-gray-100 p-2 border-b border-r font-semibold text-center'
        >
          <div>{day.name}</div>
          <div className='text-sm'>{day.formattedDate}</div>
        </div>
      ))}
    </>
  )
}
