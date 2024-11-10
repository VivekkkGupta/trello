import { Router } from "express";
import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";

const router = Router();

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Compare the entered password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Create a new user
router.post("/createuser", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email is already in use" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

    // Create and save the new user with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res
      .status(201)
      .json({ message: "User created successfully", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error); // Log the error for debugging purposes
    res.status(500).json({ error: "Error creating user" });
  }
});

// Read all users with role "user"
router.get("/getusers", async (req, res) => {
  try {
    const users = await User.find({ role: "user" });
    if (users.length > 0) {
      res.json(users);
    } else {
      res.status(404).json({ error: "No users with role 'user' found" });
    }
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "An error occurred while retrieving users" });
  }
});

// Read user details
router.get("/readuser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error reading user" });
  }
});

// Update user details
router.put("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  const { username, email, password } = req.body;

  try {
    // If password is being updated, hash it
    const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

    const user = await User.findByIdAndUpdate(
      id,
      { username, email, password: hashedPassword || password },
      { new: true, runValidators: true }
    );
    if (user) {
      res.json({ message: "User updated successfully", user });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error updating user" });
  }
});

// Delete a user
router.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findByIdAndDelete(id);
    if (user) {
      res.json({ message: "User deleted successfully" });
    } else {
      res.status(404).json({ error: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error deleting user" });
  }
});

export default router;
