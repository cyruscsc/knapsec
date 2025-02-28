from pydantic import BaseModel


class TimeSlot(BaseModel):
    start: str  # ISO format datetime string
    end: str  # ISO format datetime string
