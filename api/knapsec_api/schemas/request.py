from .task import Task
from .timeslot import TimeSlot

from pydantic import BaseModel


class ScheduleRequest(BaseModel):
    tasks: list[Task]
    times: list[TimeSlot]

    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "tasks": [
                        {"name": "lecture", "duration": 7200, "priority": 0.8},
                        {"name": "assignment", "duration": 7200, "priority": 0.8},
                        {"name": "quiz", "duration": 3600, "priority": 0.7},
                        {"name": "forum", "duration": 1800, "priority": 0.7},
                        {"name": "leetcode", "duration": 3600, "priority": 0.5},
                        {"name": "side_project", "duration": 3600, "priority": 0.5},
                        {"name": "netflix", "duration": 7200, "priority": 0.3},
                        {"name": "gaming", "duration": 7200, "priority": 0.3},
                    ],
                    "times": [
                        {"start": "2025-02-24T21:30", "end": "2025-02-24T23:00"},
                        {"start": "2025-02-25T21:00", "end": "2025-02-25T23:00"},
                        {"start": "2025-02-26T21:00", "end": "2025-02-26T23:00"},
                        {"start": "2025-02-27T21:00", "end": "2025-02-27T23:00"},
                        {"start": "2025-02-28T22:00", "end": "2025-03-01T00:00"},
                    ],
                }
            ]
        }
    }
