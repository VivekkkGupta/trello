import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  state: String,
  assignedTo: {},
  state: String,
  notes: [],
});

export default model("Task", taskSchema);
