'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { useTasks } from '@/hooks/use-tasks'
import { GenerateScheduleButton } from './generate-schedule-button'
import { TaskCard } from './task-card'
import { TaskCardsContainer } from './task-cards-container'
import { TaskForm } from '../task-form/task-form'

export const TaskSidebar = () => {
  const { schedule } = useSchedule()
  const { tasks } = useTasks()

  return (
    !schedule && (
      <>
        <div className='bg-white p-4 rounded-lg shadow-md mb-6'>
          <h2 className='text-xl font-semibold mb-4'>Tasks</h2>
          <TaskCardsContainer>
            {tasks.map((task, index) => (
              <TaskCard key={index} task={task} index={index} />
            ))}
          </TaskCardsContainer>
          <TaskForm />
        </div>
        <GenerateScheduleButton />
      </>
    )
  )
}
