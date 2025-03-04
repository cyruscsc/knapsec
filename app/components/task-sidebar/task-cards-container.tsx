import { ReactNode } from 'react'

interface TaskCardsContainerProps {
  children: ReactNode
}

export const TaskCardsContainer = ({ children }: TaskCardsContainerProps) => {
  return <div className='space-y-2 mb-4'>{children}</div>
}
