import TaskData from "../data/TaskData";

export const getUserTaskInfo = (username) => {
  const tasks = TaskData.filter((task) => task.assignedTo === username);
  return {
    tasksAssigned: tasks.map((task) => task.id),
    tasksAssignedCounts: {
      Todos: tasks.filter((task) => task.state === "Todos").length,
      Progress: tasks.filter((task) => task.state === "Progress").length,
      Done: tasks.filter((task) => task.state === "Done").length,
      Failed: tasks.filter((task) => task.state === "Failed").length,
    },
  };
};
