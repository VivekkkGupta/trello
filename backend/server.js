import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectDB from "./config/db.js";
import { json } from "express";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(json());

// Database connection
connectDB();

app.use(cors());

// Routes
// app.use("/", (req, res) => {
//   res.status(200).send({ Data: "Welcome to Our Backend" });
// });
app.use("/userapi", userRoutes);
app.use("/taskapi", taskRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
