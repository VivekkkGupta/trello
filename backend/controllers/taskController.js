import Task, { find } from "../models/Task";

export async function createTask(req, res) {
  try {
    const task = new Task(req.body);
    await task.save();
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export async function getTasks(req, res) {
  try {
    const tasks = await find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Add update and delete operations similarly
