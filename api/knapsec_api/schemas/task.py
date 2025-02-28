from pydantic import BaseModel, Field


class Task(BaseModel):
    name: str
    duration: int  # Duration in seconds
    priority: float = Field(..., ge=0.0, le=1.0)  # Priority between 0 and 1


class ScheduledTask(BaseModel):
    name: str
    start_time: str  # ISO format datetime string
    end_time: str  # ISO format datetime string
    duration: int
    priority: float
