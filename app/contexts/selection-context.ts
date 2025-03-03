import { Selection } from '@/types/timetable'
import { createContext, Dispatch, SetStateAction } from 'react'

interface SelectionContextProps {
  selection: Selection
  setSelection: Dispatch<SetStateAction<Selection>>
}

export const SelectionContext = createContext<
  SelectionContextProps | undefined
>(undefined)
