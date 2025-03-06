interface TimeLabelProps {
  time: string
}

export const TimeLabel = ({ time }: TimeLabelProps) => {
  return (
    <div className='timetable-heading relative row-span-2 flex items-start justify-center'>
      <span className='absolute -top-3'>{time}</span>
    </div>
  )
}
