from datetime import datetime


class Timeslot:
    def __init__(self, start: datetime, end: datetime):
        self.__start = start
        self.__end = end

    def __str__(self):
        return f"{self.start} - {self.end}"

    def __repr__(self):
        return f"{self.start} - {self.end}"

    @property
    def start(self) -> datetime:
        return self.__start

    @property
    def end(self) -> datetime:
        return self.__end

    @property
    def length(self) -> int:
        return (self.end - self.start).seconds
