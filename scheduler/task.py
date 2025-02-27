from datetime import datetime, timedelta
from typing import Dict, Any


class Task:
    """Represents a task with a name, required time, and priority level."""

    def __init__(self, name: str, duration: int, priority: float):
        """
        Initialize a task.

        Args:
            name: Task name
            duration: Required time in seconds
            priority: Priority level (0.0 to 1.0, higher is more important)
        """
        self.name = name
        self.duration = duration
        self.priority = priority

    @classmethod
    def from_dict(cls, task_dict: Dict[str, Any]) -> "Task":
        """Create a Task object from a dictionary representation."""
        return cls(
            name=task_dict["name"],
            duration=task_dict["duration"],
            priority=task_dict["priority"],
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary representation."""
        return {"name": self.name, "duration": self.duration, "priority": self.priority}

    def __repr__(self) -> str:
        return f"Task(name='{self.name}', duration={self.duration}, priority={self.priority})"


class ScheduledTask:
    """Represents a task scheduled at a specific time."""

    def __init__(self, task: Task, start_time: datetime):
        """
        Initialize a scheduled task.

        Args:
            task: The task being scheduled
            start_time: When the task starts
        """
        self.task = task
        self.start_time = start_time
        self.end_time = start_time + timedelta(seconds=task.duration)

    def to_dict(self) -> Dict[str, Any]:
        """Convert to dictionary representation."""
        return {
            "name": self.task.name,
            "start_time": self.start_time.isoformat(),
            "end_time": self.end_time.isoformat(),
            "duration": self.task.duration,
            "priority": self.task.priority,
        }

    def __repr__(self) -> str:
        return f"ScheduledTask(task='{self.task.name}', start='{self.start_time.isoformat()}', end='{self.end_time.isoformat()}')"
