import { ReactNode } from 'react'

interface AppContainerProps {
  children: ReactNode
}

export const AppContainer = ({ children }: AppContainerProps) => {
  return (
    <div className='mx-auto flex h-screen flex-col p-2'>
      {children}
    </div>
  )
}
