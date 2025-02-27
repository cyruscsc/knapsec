from .genetic import GeneticScheduler
from .task import Task
from .timeslot import TimeSlot

from datetime import datetime
from typing import Any, Dict, List


class TaskSchedulingApp:
    """Main application class for task scheduling."""

    @staticmethod
    def parse_tasks(task_dicts: List[Dict[str, Any]]) -> List[Task]:
        """Convert task dictionaries to Task objects."""
        return [Task.from_dict(task_dict) for task_dict in task_dicts]

    @staticmethod
    def parse_time_slots(time_dicts: List[Dict[str, str]]) -> List[TimeSlot]:
        """Convert time slot dictionaries to TimeSlot objects."""
        return [TimeSlot.from_dict(time_dict) for time_dict in time_dicts]

    @classmethod
    def optimize_schedule(
        cls,
        task_dicts: List[Dict[str, Any]],
        time_dicts: List[Dict[str, str]],
        population_size: int = 100,
        generations: int = 100,
    ) -> Dict[str, Any]:
        """
        Optimize task scheduling using genetic algorithm.

        Args:
            task_dicts: List of task dictionaries
            time_dicts: List of time slot dictionaries
            population_size: Size of the population in genetic algorithm
            generations: Number of generations to evolve

        Returns:
            Optimized schedule as a dictionary
        """
        # Parse input data
        tasks = cls.parse_tasks(task_dicts)
        time_slots = cls.parse_time_slots(time_dicts)

        # Create scheduler and evolve schedule
        scheduler = GeneticScheduler(
            tasks=tasks,
            time_slots=time_slots,
            population_size=population_size,
            generations=generations,
        )

        schedule = scheduler.evolve()

        # Return as dictionary
        return schedule.to_dict()

    @staticmethod
    def print_schedule(schedule_dict: Dict[str, Any]) -> None:
        """
        Print a human-readable representation of a schedule.

        Args:
            schedule_dict: Dictionary representation of a schedule
        """
        print("Optimized Schedule:")
        print("-----------------")

        # Group tasks by date for better readability
        tasks_by_date = {}
        for task in schedule_dict["scheduled_tasks"]:
            start = datetime.fromisoformat(task["start_time"])
            date_str = start.strftime("%Y-%m-%d")

            if date_str not in tasks_by_date:
                tasks_by_date[date_str] = []

            tasks_by_date[date_str].append(task)

        for date in sorted(tasks_by_date.keys()):
            print(f"\n{date}:")
            for task in tasks_by_date[date]:
                start = datetime.fromisoformat(task["start_time"]).strftime("%H:%M")
                end = datetime.fromisoformat(task["end_time"]).strftime("%H:%M")
                print(f"  {task['name']} ({task['priority']:.1f}): {start} - {end}")

        print("\nUnscheduled Tasks:")
        print("-----------------")
        for task in schedule_dict["unscheduled_tasks"]:
            duration_hours = task["duration"] / 3600
            print(
                f"{task['name']} ({task['priority']:.1f}): {duration_hours:.1f} hours"
            )

        print("\nSummary:")
        print("-----------------")
        print(
            f"Total priority achieved: {schedule_dict['total_priority_achieved']:.2f}"
        )
        print(
            f"Time utilization: {schedule_dict['time_utilized']/3600:.2f} hours out of {schedule_dict['time_available']/3600:.2f} hours available ({schedule_dict['utilization_percentage']:.1f}%)"
        )
