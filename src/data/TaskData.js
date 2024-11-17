import { UserData, AdminData } from "./AuthData";

const TaskData = [
  {
    id: 1,
    title: "Task 1",
    description: "This is a task in todos",
    state: "Todos",
    assignedTo: "Yash",
    notes: [
      {
        userDetails: {
          id: 1,
          username: "Admin",
          email: "admin@example.com",
          password: "admin123",
          avatar: null,
          role: "admin",
        },
        noteId: 2,
        text: "Note added manually ",
        timestamp: "Sat Nov 09 2024 12:09:29 GMT+0530 (India Standard Time)",
      },
    ],
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is another task in todos",
    state: "Todos",
    assignedTo: "Yash",
    notes: [],
  },
  {
    id: 3,
    title: "Task 3",
    description: "This task is in progress",
    state: "Progress",
    assignedTo: "Yash",
    notes: [],
  },
  {
    id: 4,
    title: "Task 4",
    description: "This task is completed",
    state: "Done",
    assignedTo: "Yash",
    notes: [],
  },
  {
    id: 5,
    title: "Task 5",
    description: "This task is completed",
    state: "Done",
    assignedTo: "Yash",
    notes: [],
  },
  {
    id: 6,
    title: "Task 6",
    description: "This task failed",
    state: "Failed",
    assignedTo: "Yash",
    notes: [],
  },
  {
    id: 7,
    title: "Task 7",
    description: "This is a task in todos",
    state: "Todos",
    assignedTo: "Akash",
    notes: [],
  },
  {
    id: 8,
    title: "Task 8",
    description: "This is another task in todos",
    state: "Todos",
    assignedTo: "Akash",
    notes: [],
  },
];

export default TaskData;
