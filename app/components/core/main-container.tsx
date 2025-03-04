import { ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return <div className='flex flex-col lg:flex-row gap-6'>{children}</div>
}
