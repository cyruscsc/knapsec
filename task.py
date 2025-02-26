class Task:
    def __init__(self, name: str, duration: int, priority: float):
        self.__name = name
        self.__duration = duration  # in seconds
        self.__priority = priority  # 0.0 to 1.0

    def __str__(self):
        return f"{self.name} - {self.required_timeslots} - {self.priority}"

    def __repr__(self):
        return f"{self.name} - {self.required_timeslots} - {self.priority}"

    @property
    def name(self) -> str:
        return self.__name

    @property
    def duration(self) -> int:
        return self.__duration

    @property
    def priority(self) -> float:
        return self.__priority
