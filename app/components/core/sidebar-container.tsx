import { ReactNode } from 'react'

interface SidebarContainerProps {
  children: ReactNode
}

export const SidebarContainer = ({ children }: SidebarContainerProps) => {
  return <div className='lg:w-1/4'>{children}</div>
}
