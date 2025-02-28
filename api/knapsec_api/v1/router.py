from datetime import datetime
from fastapi import APIRouter, HTTPException
from knapsec_api.scheduler import TaskSchedulingApp
from knapsec_api.schemas import Schedule, ScheduleRequest

router = APIRouter()


@router.post("/schedule", response_model=Schedule)
async def optimize_schedule(request: ScheduleRequest):
    try:
        # Validate datetime strings by parsing them
        for time_slot in request.times:
            try:
                datetime.fromisoformat(time_slot.start)
                datetime.fromisoformat(time_slot.end)
            except ValueError:
                raise HTTPException(
                    status_code=400,
                    detail=f"Invalid datetime format. Use ISO format (YYYY-MM-DDTHH:MM:SS)",
                )

        # Convert Pydantic models to dictionaries for the TaskSchedulingApp
        tasks = [task.model_dump() for task in request.tasks]
        times = [time_slot.model_dump() for time_slot in request.times]

        # Call the optimize_schedule method
        schedule = TaskSchedulingApp.optimize_schedule(tasks, times)

        return schedule
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now().isoformat()}
