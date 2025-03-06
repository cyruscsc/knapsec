import { ReactNode } from 'react'

interface MainContainerProps {
  children: ReactNode
}

export const MainContainer = ({ children }: MainContainerProps) => {
  return (
    <div className='flex flex-col-reverse gap-6 overflow-auto md:flex-row'>
      {children}
    </div>
  )
}
