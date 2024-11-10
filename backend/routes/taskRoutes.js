import { Router } from "express";
import Task from "../models/TaskSchema.js";
const router = Router();

router.get("/getalltasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    if (tasks.length > 0) {
      res.json(tasks);
    } else {
      res.status(404).json({ error: "No tasks found" });
    }
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
    res.status(500).json({ error: "An error occurred while retrieving tasks" });
  }
});

router.post("/createtask", (req, res) => {
  const { title, description, dueDate, state, assignedTo, notes } = req.body;

  try {
    const task = new Task({
      title,
      description,
      dueDate,
      state,
      assignedTo,
      notes,
    });
    task.save();
    res.send({ message: "Task created successfully", TaskDetails: task });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to Create Task" });
  }
});

router.put("/edittask/:id", async (req, res) => {
  const { id } = req.params; // Get the task ID from the request parameters
  const { title, description, dueDate, state, assignedTo, notes } = req.body; // Get the updated fields from the request body

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate, state, assignedTo, notes },
      { new: true } // This option returns the updated document
    );

    if (!updatedTask) {
      return res.status(404).json({ error: "Task not found" });
    }

    res.send({
      message: "Task updated successfully",
      TaskDetails: updatedTask,
    });
  } catch (error) {
    console.error("Error updating task:", error.message);
    res.status(500).json({ error: "Unable to update task" });
  }
});

export default router;
