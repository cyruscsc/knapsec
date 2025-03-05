import { NameInput } from './name-input'
import { DurationSelect } from './duration-select'
import { PriorityRange } from './priority-range'
import { AddTaskButton } from './add-task-button'

export const TaskForm = () => {
  return (
    <div className='sidebar-group'>
      <NameInput />
      <DurationSelect />
      <PriorityRange />
      <AddTaskButton />
    </div>
  )
}
