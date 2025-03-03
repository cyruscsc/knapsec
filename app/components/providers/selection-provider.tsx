'use client'

import { SelectionContext } from '@/contexts/selection-context'
import { Selection } from '@/types/timetable'
import { replacer, reviver } from '@/utils/json'
import { ReactNode, useEffect, useState } from 'react'

interface SelectionProviderProps {
  children: ReactNode
}

export const SelectionProvider = ({ children }: SelectionProviderProps) => {
  const [selection, setSelection] = useState<Selection | null>(null)

  useEffect(() => {
    const savedSelection = localStorage.getItem('selection')

    if (savedSelection) {
      setSelection(JSON.parse(savedSelection, reviver))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('selection', JSON.stringify(selection, replacer))
  }, [selection])

  return (
    <SelectionContext.Provider value={{ selection, setSelection }}>
      {children}
    </SelectionContext.Provider>
  )
}
