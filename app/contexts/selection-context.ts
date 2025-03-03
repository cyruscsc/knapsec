import { Selection } from '@/types/timetable'
import { createContext, Dispatch, SetStateAction } from 'react'

interface SelectionContextProps {
  selection: Selection | null
  setSelection: Dispatch<SetStateAction<Selection | null>>
}

export const SelectionContext = createContext<
  SelectionContextProps | undefined
>(undefined)
