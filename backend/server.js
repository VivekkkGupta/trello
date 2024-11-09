require("dotenv").config();
import express, { json } from "express";
import connectDB from "./config/db";
import taskRoutes from "./routes/taskRoutes";

const app = express();

// Middleware
app.use(json());

// Database connection
connectDB();

// Routes
app.use("/api", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
