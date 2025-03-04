import { MainContainer } from '@/components/core/main-container'
import { SidebarContainer } from '@/components/core/sidebar-container'
import { CombinedProvider } from '@/components/providers/combined-provider'
import { ResultSidebar } from '@/components/result-sidebar/result-sidebar'
import { TaskSidebar } from '@/components/task-sidebar/task-sidebar'
import { Timetable } from '@/components/timetable/timetable'

export default function Home() {
  return (
    <CombinedProvider>
      <div className='max-w-7xl mx-auto px-4 py-8'>
        <h1 className='text-3xl font-bold mb-6'>Weekly Schedule Planner</h1>
        <MainContainer>
          <Timetable />
          <SidebarContainer>
            <TaskSidebar />
            <ResultSidebar />
          </SidebarContainer>
        </MainContainer>
      </div>
    </CombinedProvider>
  )
}
