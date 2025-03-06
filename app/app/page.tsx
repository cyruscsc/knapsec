import { AppContainer } from '@/components/core/app-container'
import { MainContainer } from '@/components/core/main-container'
import { CombinedProvider } from '@/components/providers/combined-provider'
import { ResultSidebar } from '@/components/result-sidebar/result-sidebar'
import { TaskSidebar } from '@/components/task-sidebar/task-sidebar'
import { Timetable } from '@/components/timetable/timetable'

export default function Home() {
  return (
    <CombinedProvider>
      <AppContainer>
        <MainContainer>
          <Timetable />
          <TaskSidebar />
          <ResultSidebar />
        </MainContainer>
      </AppContainer>
    </CombinedProvider>
  )
}
