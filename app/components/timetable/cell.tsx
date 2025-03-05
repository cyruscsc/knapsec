interface CellProps {
  task: any
  isSelected: boolean | undefined
  isStart: boolean
  handleClick: () => void
}

export const Cell = ({ task, isSelected, isStart, handleClick }: CellProps) => {
  return (
    <div
      className={`timetable-border h-8 border-r ${
        task
          ? `bg-sirocco-${Math.round(task.priority * 10)}00 text-white`
          : isSelected
            ? 'bg-mist-700'
            : 'bg-mist-900'
      } relative cursor-pointer`}
      onClick={handleClick}
    >
      {isStart && task && (
        <div className='absolute inset-0 flex items-center justify-center overflow-hidden p-1 text-xs'>
          <div>{task.name}</div>
        </div>
      )}
    </div>
  )
}

// trick tailwindcss into generating the correct classes
// bg-sirocco-50
// bg-sirocco-100
// bg-sirocco-200
// bg-sirocco-300
// bg-sirocco-400
// bg-sirocco-500
// bg-sirocco-600
// bg-sirocco-700
// bg-sirocco-800
// bg-sirocco-900
// bg-sirocco-950
