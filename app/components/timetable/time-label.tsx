interface TimeLabelProps {
  time: string
}

export const TimeLabel = ({ time }: TimeLabelProps) => {
  return (
    <div className='timetable-heading row-span-2 flex items-center justify-center p-2 timetable-border border-r'>
      {time}
    </div>
  )
}
