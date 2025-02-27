from .task import Task, ScheduledTask

from typing import Any, Dict, List


class Schedule:
    """Represents a complete schedule with scheduled and unscheduled tasks."""

    def __init__(self):
        """Initialize an empty schedule."""
        self.scheduled_tasks: List[ScheduledTask] = []
        self.unscheduled_tasks: List[Task] = []
        self.total_priority_achieved: float = 0.0
        self.time_utilized: int = 0
        self.time_available: int = 0

    def add_scheduled_task(self, scheduled_task: ScheduledTask) -> None:
        """Add a scheduled task to the schedule."""
        self.scheduled_tasks.append(scheduled_task)
        self.total_priority_achieved += scheduled_task.task.priority
        self.time_utilized += scheduled_task.task.duration

    def add_unscheduled_task(self, task: Task) -> None:
        """Add an unscheduled task to the schedule."""
        self.unscheduled_tasks.append(task)

    def set_time_available(self, time_available: int) -> None:
        """Set the total available time."""
        self.time_available = time_available

    def utilization_percentage(self) -> float:
        """Calculate time utilization as a percentage."""
        return (self.time_utilized / max(1, self.time_available)) * 100

    def sort_by_start_time(self) -> None:
        """Sort scheduled tasks by start time."""
        self.scheduled_tasks.sort(key=lambda x: x.start_time)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary representation."""
        return {
            "scheduled_tasks": [task.to_dict() for task in self.scheduled_tasks],
            "unscheduled_tasks": [task.to_dict() for task in self.unscheduled_tasks],
            "total_priority_achieved": self.total_priority_achieved,
            "time_utilized": self.time_utilized,
            "time_available": self.time_available,
            "utilization_percentage": self.utilization_percentage(),
        }
