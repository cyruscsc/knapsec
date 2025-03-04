interface CellProps {
  task: any
  isSelected: boolean | undefined
  isStart: boolean
  handleClick: () => void
}

export const Cell = ({ task, isSelected, isStart, handleClick }: CellProps) => {
  return (
    <div
      className={`h-10 border-r border-b ${
        task
          ? `bg-blue-${Math.round(task.priority * 10)}00 text-white`
          : isSelected
          ? 'bg-green-200'
          : 'bg-white'
      } relative cursor-pointer`}
      onClick={handleClick}
    >
      {isStart && task && (
        <div className='absolute inset-0 flex items-center justify-center overflow-hidden text-xs p-1'>
          <div className='font-semibold'>{task.name}</div>
        </div>
      )}
    </div>
  )
}
