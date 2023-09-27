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
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 2),
      name: "Task 1",
      id: "T1",
      progress: 100,
      type: "task",
      project: "F1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 3),
      name: "Task 2",
      id: "T2",
      progress: 100,
      dependencies: ["T1"],
      type: "task",
      project: "F1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 2),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 6),
      name: "Task 3",
      id: "T3",
      progress: 100,
      dependencies: ["T1"],
      type: "task",
      project: "F1",
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 0),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 10),
      name: "Flow 2",
      id: "F2",
      progress: 100,
      type: "project",
      project: "F1",
      hideChildren: false,
    },
    {
      start: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 6),
      end: new Date(currentDate.getFullYear(), currentDate.getMonth(), 1, 12, 30, 10),
      name: "Task 4",
      id: "T4",
      progress: 100,
      dependencies: ["T3"],
      type: "task",
      project: "F2",
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
