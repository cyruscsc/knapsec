from .schedule import Schedule
from .task import Task, ScheduledTask
from .timeslot import TimeSlot

import random
import numpy as np
from typing import List, Tuple


class Chromosome:
    """Represents a potential schedule solution in the genetic algorithm."""

    def __init__(self, num_slots: int):
        """
        Initialize a chromosome with empty task lists for each time slot.

        Args:
            num_slots: Number of time slots
        """
        self.slots: List[List[int]] = [[] for _ in range(num_slots)]

    @classmethod
    def copy(cls, other: "Chromosome") -> "Chromosome":
        """Create a deep copy of another chromosome."""
        new_chromosome = cls(len(other.slots))
        new_chromosome.slots = [list(slot) for slot in other.slots]
        return new_chromosome


class GeneticScheduler:
    """Task scheduler using a genetic algorithm approach."""

    def __init__(
        self,
        tasks: List[Task],
        time_slots: List[TimeSlot],
        population_size: int = 100,
        generations: int = 100,
        mutation_rate: float = 0.2,
        crossover_rate: float = 0.8,
        elitism_count: int = 10,
    ):
        """
        Initialize the genetic scheduler.

        Args:
            tasks: List of tasks to schedule
            time_slots: List of available time slots
            population_size: Size of the population in genetic algorithm
            generations: Number of generations to evolve
            mutation_rate: Probability of mutation
            crossover_rate: Probability of crossover
            elitism_count: Number of best individuals to preserve
        """
        self.tasks = tasks
        self.time_slots = time_slots

        # Calculate total times
        self.total_available_time = sum(slot.duration for slot in time_slots)
        self.total_task_time = sum(task.duration for task in tasks)

        # Genetic algorithm parameters
        self.population_size = population_size
        self.generations = generations
        self.mutation_rate = mutation_rate
        self.crossover_rate = crossover_rate
        self.elitism_count = elitism_count

    def create_individual(self) -> Chromosome:
        """
        Create a random individual (chromosome) for the genetic algorithm.

        Returns:
            A chromosome representing a potential schedule
        """
        individual = Chromosome(len(self.time_slots))

        # Randomly assign tasks
        available_task_indices = list(range(len(self.tasks)))
        random.shuffle(available_task_indices)

        for task_idx in available_task_indices:
            task = self.tasks[task_idx]

            # Try to find suitable time slots
            possible_slots = []
            for slot_idx, slot in enumerate(self.time_slots):
                # Calculate remaining time in this slot
                used_time = sum(
                    self.tasks[t_idx].duration for t_idx in individual.slots[slot_idx]
                )
                remaining_time = slot.duration - used_time

                # Check if task fits in the remaining time
                if remaining_time >= task.duration:
                    possible_slots.append(slot_idx)

            if possible_slots:
                # Assign task to a random suitable slot
                slot_idx = random.choice(possible_slots)
                individual.slots[slot_idx].append(task_idx)

        return individual

    def initialize_population(self) -> List[Chromosome]:
        """
        Create an initial population of random schedules.

        Returns:
            A list of chromosomes representing potential schedules
        """
        return [self.create_individual() for _ in range(self.population_size)]

    def fitness(self, individual: Chromosome) -> float:
        """
        Calculate the fitness of an individual schedule.
        Higher values represent better schedules.

        Args:
            individual: A chromosome representing a schedule

        Returns:
            Fitness score
        """
        scheduled_tasks = set()
        total_priority = 0
        utilized_time = 0

        # Check if the schedule is valid and calculate metrics
        for slot_idx, task_indices in enumerate(individual.slots):
            slot = self.time_slots[slot_idx]
            slot_total_time = sum(
                self.tasks[task_idx].duration for task_idx in task_indices
            )

            # Check if all tasks fit in the slot
            if slot_total_time <= slot.duration:
                for task_idx in task_indices:
                    task = self.tasks[task_idx]
                    scheduled_tasks.add(task_idx)
                    total_priority += task.priority
                    utilized_time += task.duration
            # If tasks don't fit, penalize this schedule
            else:
                return 0  # Invalid schedule

        # Ensure no duplicate tasks
        if len(scheduled_tasks) != sum(len(tasks) for tasks in individual.slots):
            return 0  # Invalid schedule with duplicate tasks

        # Prioritize scheduling high-priority tasks
        priority_score = total_priority

        # Reward efficient time utilization
        efficiency_score = utilized_time / max(1, self.total_available_time)

        # Combine scores (weight can be adjusted based on importance)
        return priority_score * 0.7 + efficiency_score * 0.3

    def select_parent(
        self, population: List[Chromosome], fitnesses: List[float]
    ) -> Chromosome:
        """
        Select a parent for reproduction using tournament selection.

        Args:
            population: Current population
            fitnesses: Fitness scores for the population

        Returns:
            Selected parent chromosome
        """
        # Tournament selection
        tournament_size = 3
        tournament_indices = random.sample(range(len(population)), tournament_size)
        tournament_fitnesses = [fitnesses[i] for i in tournament_indices]
        winner_idx = tournament_indices[
            tournament_fitnesses.index(max(tournament_fitnesses))
        ]

        return population[winner_idx]

    def crossover(
        self, parent1: Chromosome, parent2: Chromosome
    ) -> Tuple[Chromosome, Chromosome]:
        """
        Perform crossover between two parents to create two children.

        Args:
            parent1: First parent chromosome
            parent2: Second parent chromosome

        Returns:
            Two child chromosomes
        """
        if random.random() > self.crossover_rate:
            return Chromosome.copy(parent1), Chromosome.copy(parent2)

        # One-point crossover
        crossover_point = random.randint(1, len(parent1.slots) - 1)

        # Create children
        child1 = Chromosome(len(parent1.slots))
        child2 = Chromosome(len(parent1.slots))

        # Copy parts from parents
        for i in range(len(parent1.slots)):
            if i < crossover_point:
                child1.slots[i] = list(parent1.slots[i])
                child2.slots[i] = list(parent2.slots[i])
            else:
                child1.slots[i] = list(parent2.slots[i])
                child2.slots[i] = list(parent1.slots[i])

        # Fix potential duplicates
        child1 = self.fix_duplicates(child1)
        child2 = self.fix_duplicates(child2)

        return child1, child2

    def fix_duplicates(self, chromosome: Chromosome) -> Chromosome:
        """
        Fix a chromosome by removing duplicate tasks.

        Args:
            chromosome: A chromosome that might have duplicate tasks

        Returns:
            Fixed chromosome without duplicates
        """
        seen_tasks = set()
        fixed_chromosome = Chromosome(len(chromosome.slots))

        # First pass: keep track of tasks we've seen
        for slot_idx, task_indices in enumerate(chromosome.slots):
            for task_idx in task_indices:
                if task_idx not in seen_tasks:
                    seen_tasks.add(task_idx)
                    fixed_chromosome.slots[slot_idx].append(task_idx)

        return fixed_chromosome

    def mutate(self, chromosome: Chromosome) -> Chromosome:
        """
        Mutate a chromosome by randomly changing task assignments.

        Args:
            chromosome: Chromosome to mutate

        Returns:
            Mutated chromosome
        """
        if random.random() >= self.mutation_rate:
            return Chromosome.copy(chromosome)

        mutated = Chromosome.copy(chromosome)

        # Choose random mutation operations
        mutation_type = random.choice(["move", "swap_tasks", "add", "remove"])

        if (
            mutation_type == "move"
            and sum(len(tasks) for tasks in chromosome.slots) > 0
        ):
            # Move a task from one slot to another
            # Find non-empty slots
            non_empty_slots = [i for i, tasks in enumerate(mutated.slots) if tasks]

            if non_empty_slots:
                # Select a source slot and task
                source_slot_idx = random.choice(non_empty_slots)
                task_idx_pos = random.randrange(len(mutated.slots[source_slot_idx]))
                task_idx = mutated.slots[source_slot_idx][task_idx_pos]
                task_time = self.tasks[task_idx].duration

                # Find possible destination slots
                possible_dest_slots = []
                for dest_slot_idx, slot in enumerate(self.time_slots):
                    if dest_slot_idx != source_slot_idx:
                        # Calculate remaining time in this slot
                        used_time = sum(
                            self.tasks[t_idx].duration
                            for t_idx in mutated.slots[dest_slot_idx]
                        )
                        remaining_time = slot.duration - used_time

                        # Check if task fits
                        if remaining_time >= task_time:
                            possible_dest_slots.append(dest_slot_idx)

                if possible_dest_slots:
                    # Move the task
                    dest_slot_idx = random.choice(possible_dest_slots)
                    mutated.slots[source_slot_idx].pop(task_idx_pos)
                    mutated.slots[dest_slot_idx].append(task_idx)

        elif (
            mutation_type == "swap_tasks"
            and sum(len(tasks) for tasks in chromosome.slots) >= 2
        ):
            # Swap two tasks between different slots
            # Find slots with tasks
            non_empty_slots = [i for i, tasks in enumerate(mutated.slots) if tasks]

            if len(non_empty_slots) >= 2:
                # Select two different slots
                slot1_idx, slot2_idx = random.sample(non_empty_slots, 2)

                # Select a task from each slot
                task1_pos = random.randrange(len(mutated.slots[slot1_idx]))
                task2_pos = random.randrange(len(mutated.slots[slot2_idx]))

                task1_idx = mutated.slots[slot1_idx][task1_pos]
                task2_idx = mutated.slots[slot2_idx][task2_pos]

                task1_time = self.tasks[task1_idx].duration
                task2_time = self.tasks[task2_idx].duration

                # Calculate if the swap is feasible (check time constraints)
                slot1_used_time = sum(
                    self.tasks[t_idx].duration for t_idx in mutated.slots[slot1_idx]
                )
                slot2_used_time = sum(
                    self.tasks[t_idx].duration for t_idx in mutated.slots[slot2_idx]
                )

                slot1_remaining = (
                    self.time_slots[slot1_idx].duration - slot1_used_time + task1_time
                )
                slot2_remaining = (
                    self.time_slots[slot2_idx].duration - slot2_used_time + task2_time
                )

                if slot1_remaining >= task2_time and slot2_remaining >= task1_time:
                    # Swap the tasks
                    mutated.slots[slot1_idx][task1_pos] = task2_idx
                    mutated.slots[slot2_idx][task2_pos] = task1_idx

        elif mutation_type == "add":
            # Add an unscheduled task to a slot
            # Find all scheduled tasks
            scheduled_tasks = set()
            for tasks in mutated.slots:
                scheduled_tasks.update(tasks)

            # Find unscheduled tasks
            unscheduled_tasks = set(range(len(self.tasks))) - scheduled_tasks

            if unscheduled_tasks:
                # Select a random unscheduled task
                task_idx = random.choice(list(unscheduled_tasks))
                task_time = self.tasks[task_idx].duration

                # Find possible slots
                possible_slots = []
                for slot_idx, slot in enumerate(self.time_slots):
                    used_time = sum(
                        self.tasks[t_idx].duration for t_idx in mutated.slots[slot_idx]
                    )
                    remaining_time = slot.duration - used_time

                    if remaining_time >= task_time:
                        possible_slots.append(slot_idx)

                if possible_slots:
                    # Add the task to a suitable slot
                    slot_idx = random.choice(possible_slots)
                    mutated.slots[slot_idx].append(task_idx)

        elif (
            mutation_type == "remove"
            and sum(len(tasks) for tasks in chromosome.slots) > 0
        ):
            # Remove a scheduled task
            non_empty_slots = [i for i, tasks in enumerate(mutated.slots) if tasks]

            if non_empty_slots:
                # Select a source slot and task
                slot_idx = random.choice(non_empty_slots)
                task_pos = random.randrange(len(mutated.slots[slot_idx]))

                # Remove the task
                mutated.slots[slot_idx].pop(task_pos)

        return mutated

    def evolve(self) -> Schedule:
        """
        Run the genetic algorithm to find an optimal schedule.

        Returns:
            Optimized schedule
        """
        population = self.initialize_population()

        for generation in range(self.generations):
            # Calculate fitness for each individual
            fitnesses = [self.fitness(individual) for individual in population]

            # Sort population by fitness (descending)
            sorted_indices = np.argsort(fitnesses)[::-1]
            population = [population[i] for i in sorted_indices]
            fitnesses = [fitnesses[i] for i in sorted_indices]

            # Create a new population
            new_population = []

            # Elitism: carry over best individuals
            new_population.extend(
                [Chromosome.copy(ind) for ind in population[: self.elitism_count]]
            )

            # Create rest of new population
            while len(new_population) < self.population_size:
                # Select parents
                parent1 = self.select_parent(population, fitnesses)
                parent2 = self.select_parent(population, fitnesses)

                # Create children through crossover
                child1, child2 = self.crossover(parent1, parent2)

                # Apply mutation
                child1 = self.mutate(child1)
                child2 = self.mutate(child2)

                # Add children to new population
                new_population.append(child1)
                if len(new_population) < self.population_size:
                    new_population.append(child2)

            population = new_population

        # Get the best individual from final population
        final_fitnesses = [self.fitness(individual) for individual in population]
        best_idx = final_fitnesses.index(max(final_fitnesses))
        best_chromosome = population[best_idx]

        return self.build_schedule(best_chromosome)

    def build_schedule(self, chromosome: Chromosome) -> Schedule:
        """
        Build a schedule from a chromosome.

        Args:
            chromosome: Chromosome representing a schedule

        Returns:
            Schedule object with detailed information
        """
        schedule = Schedule()
        schedule.set_time_available(self.total_available_time)

        # Track which tasks are scheduled
        scheduled_task_indices = set()

        # Process each time slot
        for slot_idx, task_indices in enumerate(chromosome.slots):
            slot = self.time_slots[slot_idx]
            current_time = slot.start

            # Sort tasks by index for deterministic ordering
            task_indices.sort()

            # Process each task in the slot
            for task_idx in task_indices:
                task = self.tasks[task_idx]
                scheduled_task = ScheduledTask(task, current_time)

                # Add to schedule
                schedule.add_scheduled_task(scheduled_task)
                scheduled_task_indices.add(task_idx)

                # Update current time for next task
                current_time = scheduled_task.end_time

        # Add unscheduled tasks
        for task_idx, task in enumerate(self.tasks):
            if task_idx not in scheduled_task_indices:
                schedule.add_unscheduled_task(task)

        # Sort scheduled tasks by start time
        schedule.sort_by_start_time()

        return schedule
