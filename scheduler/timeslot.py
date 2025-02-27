from datetime import datetime
from typing import Dict


class TimeSlot:
    """Represents an available time slot with start and end times."""

    def __init__(self, start: datetime, end: datetime):
        """
        Initialize a time slot.

        Args:
            start: Start datetime
            end: End datetime
        """
        self.start = start
        self.end = end
        self.duration = int((end - start).total_seconds())

    @classmethod
    def from_dict(cls, slot_dict: Dict[str, str]) -> "TimeSlot":
        """Create a TimeSlot object from a dictionary with ISO format strings."""
        return cls(
            start=datetime.fromisoformat(slot_dict["start"]),
            end=datetime.fromisoformat(slot_dict["end"]),
        )

    def to_dict(self) -> Dict[str, str]:
        """Convert to dictionary representation with ISO format strings."""
        return {"start": self.start.isoformat(), "end": self.end.isoformat()}

    def __repr__(self) -> str:
        return (
            f"TimeSlot(start='{self.start.isoformat()}', end='{self.end.isoformat()}')"
        )
