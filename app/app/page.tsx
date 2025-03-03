import { ScheduleProvider } from '@/components/providers/schedule-provider'
import { SelectionProvider } from '@/components/providers/selection-provider'
import { TasksProvider } from '@/components/providers/tasks-provider'
import Timetable from '@/components/timetable'
import Image from 'next/image'

export default function Home() {
  return (
    <SelectionProvider>
      <TasksProvider>
        <ScheduleProvider>
          <Timetable />
        </ScheduleProvider>
      </TasksProvider>
    </SelectionProvider>
  )
}
