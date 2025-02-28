from .task import Task, ScheduledTask

from pydantic import BaseModel


class Schedule(BaseModel):
    scheduled_tasks: list[ScheduledTask]
    unscheduled_tasks: list[Task]
    total_priority_achieved: float
    time_utilized: int
    time_available: int
    utilization_percentage: float
