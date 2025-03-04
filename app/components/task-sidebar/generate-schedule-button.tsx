'use client'

import { useSchedule } from '@/hooks/use-schedule'
import { useSelection } from '@/hooks/use-selection'
import { useTasks } from '@/hooks/use-tasks'
import { useWeek } from '@/hooks/use-week'
import { sampleResponse } from '@/sample'
import { ScheduleRequest } from '@/types/scheduler'
import { getSelectedTimeSlots } from '@/utils/sidebar'
import { useState } from 'react'

export const GenerateScheduleButton = () => {
  const { weekStart } = useWeek()
  const { setSchedule } = useSchedule()
  const { selection } = useSelection()
  const { tasks } = useTasks()
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // Submit schedule request to API
  const submitSchedule = async () => {
    try {
      setIsLoading(true)

      if (!selection) {
        throw new Error('No time slots selected')
      }

      const requestData: ScheduleRequest = {
        tasks,
        times: getSelectedTimeSlots(selection, weekStart),
      }

      console.log('requestData', requestData)

      // API call to backend
      // const response = await axios.post<ScheduleResponse>(
      //   '/api/schedule',
      //   requestData
      // )
      const response = sampleResponse

      setSchedule(response.data)
    } catch (error) {
      console.error('Error submitting schedule:', error)
      alert('Failed to generate schedule. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='mb-4'>
      <p className='mb-2'>Selected time slots: {selection?.size}</p>
      <button
        onClick={submitSchedule}
        disabled={isLoading || selection?.size === 0 || tasks.length === 0}
        className='w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed'
      >
        {isLoading ? 'Generating Schedule...' : 'Generate Schedule'}
      </button>
    </div>
  )
}
