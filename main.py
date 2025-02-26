import sys

from datetime import datetime, timedelta
from schedule import Schedule
from task import Task
from timeslot import Timeslot


TIMESLOT_LENGTH = 1800


def main():
    # check if correct number of arguments
    if len(sys.argv) != 3:
        sys.exit("Usage: python main.py <time_file> <task_file>")

    # load timeslots and tasks
    timeslots = load_timeslots(sys.argv[1])
    tasks = load_tasks(sys.argv[2])

    schedule = Schedule(tasks, timeslots, TIMESLOT_LENGTH)
    schedule.overview()

    for task in schedule.tasks:
        print(f"{task.name} requires {schedule.required_timeslots(task)} timeslots")


def load_timeslots(file_path):
    timeslots = []

    # read file line by line
    with open(file_path, "r") as f:
        lines = f.readlines()

    # extract timeslots
    for line in lines:
        timeslots += extract_timeslots(line)

    return timeslots


def extract_timeslots(line):
    # extract start and end time
    [start, end] = line.split()
    start = datetime.strptime(start, "%Y-%m-%dT%H:%M")
    end = datetime.strptime(end.strip(), "%Y-%m-%dT%H:%M")

    # break time into 30 minute timeslots
    timeslots = []
    while start < end:
        timeslot = Timeslot(start, start + timedelta(minutes=30))
        timeslots.append(timeslot)
        start += timedelta(minutes=30)

    return timeslots


def load_tasks(file_path):
    tasks = []

    # read file line by line
    with open(file_path, "r") as f:
        lines = f.readlines()

    # extract tasks
    for line in lines:
        tasks.append(extract_tasks(line))

    return tasks


def extract_tasks(line):
    # extract task name, duration, and priority
    [name, duration, priority] = line.split()
    duration = int(duration)
    priority = float(priority)

    return Task(name, duration, priority)


if __name__ == "__main__":
    main()
