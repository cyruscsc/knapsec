import { ReactNode } from 'react'

interface TaskCardsContainerProps {
  children: ReactNode
}

export const TaskCardsContainer = ({ children }: TaskCardsContainerProps) => {
  return <div className='sidebar-group flex-1 overflow-auto'>{children}</div>
}
