from scheduler import TaskSchedulingApp


def main():
    tasks = [
        {"name": "assignment1", "duration": 7200, "priority": 0.8},
        {"name": "assignment2", "duration": 7200, "priority": 0.8},
        {"name": "revision1", "duration": 5400, "priority": 0.7},
        {"name": "revision2", "duration": 5400, "priority": 0.7},
        {"name": "side_project1", "duration": 3600, "priority": 0.5},
        {"name": "side_project2", "duration": 3600, "priority": 0.5},
        {"name": "movie", "duration": 7200, "priority": 0.3},
        {"name": "game", "duration": 7200, "priority": 0.3},
    ]

    times = [
        {"start": "2025-02-24T21:30", "end": "2025-02-24T23:00"},
        {"start": "2025-02-25T21:00", "end": "2025-02-25T23:00"},
        {"start": "2025-02-26T21:00", "end": "2025-02-26T23:00"},
        {"start": "2025-02-27T21:00", "end": "2025-02-27T23:00"},
        {"start": "2025-02-28T22:00", "end": "2025-03-01T00:00"},
    ]

    # Run the optimization
    schedule = TaskSchedulingApp.optimize_schedule(tasks, times)
    # print(schedule)

    # Print the results
    TaskSchedulingApp.print_schedule(schedule)


if __name__ == "__main__":
    main()
