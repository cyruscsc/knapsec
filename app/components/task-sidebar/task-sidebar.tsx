'use client'

import { TaskForm } from '../task-form/task-form'
import { GenerateScheduleButton } from './generate-schedule-button'
import { TaskCard } from './task-card'
import { TaskCardsContainer } from './task-cards-container'
import { useSchedule } from '@/hooks/use-schedule'
import { useTasks } from '@/hooks/use-tasks'

export const TaskSidebar = () => {
  const { schedule } = useSchedule()
  const { tasks } = useTasks()

  return (
    !schedule && (
      <div className='sidebar'>
        <h2 className='sidebar-heading'>Tasks</h2>
        <TaskCardsContainer>
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} index={index} />
          ))}
        </TaskCardsContainer>
        <TaskForm />
        <GenerateScheduleButton />
      </div>
    )
  )
}
