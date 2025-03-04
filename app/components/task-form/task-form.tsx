import { NameInput } from './name-input'
import { DurationSelect } from './duration-select'
import { PriorityRange } from './priority-range'
import { AddTaskButton } from './add-task-button'

export const TaskForm = () => {
  return (
    <div className='space-y-2 mb-4'>
      <NameInput />
      <DurationSelect />
      <PriorityRange />
      <AddTaskButton />
    </div>
  )
}
