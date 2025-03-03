'use client'

import { SelectionContext } from '@/contexts/selection-context'
import { Selection } from '@/types/timetable'
import { ReactNode, useEffect, useState } from 'react'

interface SelectionProviderProps {
  children: ReactNode
}

export const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const [selection, setSelection] = useState<Selection>(() => {
    const savedSelection = localStorage.getItem('selection')

    if (savedSelection) {
      return JSON.parse(savedSelection)
    }

    return new Map()
  })

  useEffect(() => {
    localStorage.setItem('selection', JSON.stringify(selection))
  }, [selection])

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionContext.Provider>
  )
}
