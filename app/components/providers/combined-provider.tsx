import { ReactNode } from 'react'
import { SelectionProvider } from './selection-provider'
import { TasksProvider } from './tasks-provider'
import { NewTaskProvider } from './new-task-provider'
import { ScheduleProvider } from './schedule-provider'
import { WeekProvider } from './week-provider'

interface CombinedProviderProps {
  children: ReactNode
}

export const CombinedProvider = ({ children }: CombinedProviderProps) => {
  return (
    <ScheduleProvider>
      <TasksProvider>
        <NewTaskProvider>
          <SelectionProvider>
            <WeekProvider>{children}</WeekProvider>
          </SelectionProvider>
        </NewTaskProvider>
      </TasksProvider>
    </ScheduleProvider>
  )
}
