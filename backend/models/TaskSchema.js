import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  state: String,
  assignedTo: String,
  notes: [
    {
      username: String,
      text: String,
      avatar: String,
    },
  ],
});

export default model("Task", taskSchema);
