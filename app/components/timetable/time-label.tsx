interface TimeLabelProps {
  time: string
}

export const TimeLabel = ({ time }: TimeLabelProps) => {
  return (
    <div className='row-span-2 border-b border-r p-2 flex items-center justify-center'>
      {time}
    </div>
  )
}
