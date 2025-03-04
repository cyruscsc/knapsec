export const sampleTasks = [
  { duration: 7200, name: 'lecture', priority: 0.8 },
  { duration: 7200, name: 'assignment', priority: 0.8 },
  { duration: 3600, name: 'quiz', priority: 0.7 },
  { duration: 1800, name: 'forum', priority: 0.7 },
  { duration: 3600, name: 'leetcode', priority: 0.5 },
  { duration: 3600, name: 'side_project', priority: 0.5 },
  { duration: 7200, name: 'netflix', priority: 0.3 },
  { duration: 7200, name: 'gaming', priority: 0.3 },
]

export const sampleResponse = {
  data: {
    scheduled_tasks: [
      {
        name: 'forum',
        start_time: '2025-03-03T21:30:00',
        end_time: '2025-03-03T22:00:00',
        duration: 1800,
        priority: 0.7,
      },
      {
        name: 'leetcode',
        start_time: '2025-03-03T22:00:00',
        end_time: '2025-03-03T23:00:00',
        duration: 3600,
        priority: 0.5,
      },
      {
        name: 'gaming',
        start_time: '2025-03-04T21:00:00',
        end_time: '2025-03-04T23:00:00',
        duration: 7200,
        priority: 0.3,
      },
      {
        name: 'quiz',
        start_time: '2025-03-05T21:00:00',
        end_time: '2025-03-05T22:00:00',
        duration: 3600,
        priority: 0.7,
      },
      {
        name: 'side_project',
        start_time: '2025-03-05T22:00:00',
        end_time: '2025-03-05T23:00:00',
        duration: 3600,
        priority: 0.5,
      },
      {
        name: 'lecture',
        start_time: '2025-03-06T21:00:00',
        end_time: '2025-03-06T23:00:00',
        duration: 7200,
        priority: 0.8,
      },
      {
        name: 'assignment',
        start_time: '2025-03-07T22:00:00',
        end_time: '2025-03-08T00:00:00',
        duration: 7200,
        priority: 0.8,
      },
    ],
    unscheduled_tasks: [
      {
        name: 'netflix',
        duration: 7200,
        priority: 0.3,
      },
    ],
    total_priority_achieved: 4.3,
    time_utilized: 34200,
    time_available: 34200,
    utilization_percentage: 100,
  },
}
