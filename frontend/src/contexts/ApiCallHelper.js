import { connect } from "mongoose";

const connectDB = async () => {
  try {
    await connect(
      "mongodb+srv://guptavivek1035:3JrvkqC5WfopNlqP@trello-taskmanager.trwz8.mongodb.net/?retryWrites=true&w=majority&appName=Trello-TaskManager"
    );
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

connectDB();
