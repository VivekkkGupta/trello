import { getUserTaskInfo } from "../utils/helper";

const AdminData = [
  {
    id: 1,
    username: "Admin",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
];

const UserData = [
  {
    id: 2,
    username: "Yash",
    email: "yash@example.com",
    password: "yash123",
    role: "user",
    ...getUserTaskInfo("Yash"),
  },
  {
    id: 3,
    username: "Akash",
    email: "akash@example.com",
    password: "akash123",
    role: "user",
    ...getUserTaskInfo("Akash"),
  },
];

export { AdminData, UserData };
