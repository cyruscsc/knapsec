from task import Task
from timeslot import Timeslot


class Schedule:
    def __init__(
        self, tasks: list[Task], timeslots: list[Timeslot], timeslot_length: int
    ):
        self.__tasks = tasks
        self.__timeslots = timeslots
        self.__timeslot_length = timeslot_length  # in seconds

    @property
    def tasks(self) -> list[Task]:
        return self.__tasks

    @property
    def timeslots(self) -> list[Timeslot]:
        return self.__timeslots

    @property
    def timeslot_length(self) -> int:
        return self.__timeslot_length

    def overview(self) -> None:
        available_duration = sum([ts.length / 3600 for ts in self.timeslots])
        required_duration = sum([t.duration / 3600 for t in self.tasks])
        # print overview
        print(f"{"tasks":<30} {len(self.tasks):>6}")
        print(f"{"timeslots":<30} {len(self.timeslots):>6}")
        print(f"{"required duration (hr)":<30} {required_duration:>6.1f}")
        print(f"{"available duration (hr)":<30} {available_duration:>6.1f}")

    def required_timeslots(self, task: Task) -> int:
        return task.duration // self.timeslot_length
