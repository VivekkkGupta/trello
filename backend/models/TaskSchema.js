import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  dueDate: Date,
  state: String,
  assignedTo: {},
  state: String,
  notes: [
    {
      userDetails: {},
      text: String,
      avatar: String,
      type: String, // "Note" , "comment"
    },
  ],
});

export default model("Task", taskSchema);
