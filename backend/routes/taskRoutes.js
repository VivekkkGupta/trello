import { Router } from "express";
// import { createTask, getTasks } from "../controllers/taskController.js";
const router = Router();

router.post("/tasks", (req, res) => {
  res.send("Hellow");
});
router.get("/tasks", (req, res) => {
  res.send("Hello");
});

export default router;
