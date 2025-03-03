export type Task = {
  name: string
  duration: number
  priority: number
}

export type ScheduledTask = Task & {
  start_time: string
  end_time: string
}

export type TimeSlot = {
  start: string
  end: string
}

export type ScheduleRequest = {
  tasks: Task[]
  times: TimeSlot[]
}

export type ScheduleResponse = {
  scheduled_tasks: ScheduledTask[]
  unscheduled_tasks: Task[]
  total_priority_achieved: number
  time_utilized: number
  time_available: number
  utilization_percentage: number
}
