import { Task } from "../../dist/types/public-types";

export function initTasks() {
  const currentDate = new Date();
  const tasks: Task[] = [
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 10),
      name: "Flow 1",
      id: "F1",
      progress: 100,
      type: "project",
      hideChildren: false,
      state: "failed",
      isDisabled: true,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 8),
      name: "Task 4",
      id: "T4",
      progress: 100,
      type: "task",
      project: "F1",
      dependencies: ["F2"],
      state: "completed",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 4),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 4),
      name: "Task 5",
      id: "T5",
      progress: 100,
      type: "task",
      project: "F1",
      dependencies: ["F2"],
      state: "cached",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 8),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 10),
      name: "Task 6",
      id: "T6",
      progress: 100,
      type: "task",
      project: "F1",
      dependencies: ["T4", "T5"],
      state: "failed",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 4),
      name: "Flow 2",
      id: "F2",
      progress: 100,
      type: "project",
      hideChildren: false,
      project: "F1",
      state: "completed",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 2),
      name: "Task 1",
      id: "T1",
      progress: 100,
      type: "task",
      project: "F2",
      state: "completed",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 2),
      name: "Task 2",
      id: "T2",
      progress: 100,
      type: "task",
      project: "F2",
      state: "completed",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 4),
      name: "Task 3",
      id: "T3",
      progress: 100,
      type: "task",
      project: "F2",
      dependencies: ["T1", "T2"],
      state: "completed",
      isDisabled: true,
    },
  ];
  return tasks;
}

export function getStartEndDateForProject(tasks: Task[], projectId: string) {
  const projectTasks = tasks.filter(t => t.project === projectId);
  let start = projectTasks[0].start;
  let end = projectTasks[0].end;

  for (let i = 0; i < projectTasks.length; i++) {
    const task = projectTasks[i];
    if (start.getTime() > task.start.getTime()) {
      start = task.start;
    }
    if (end.getTime() < task.end.getTime()) {
      end = task.end;
    }
  }
  return [start, end];
}
