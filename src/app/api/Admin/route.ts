import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import Admin from "../models/admin"; // Ensure this is the correct path to your Admin model

const router = express.Router();

// Register Admin
router.post("/register", async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin instance
    const newAdmin = new Admin({
      username,
      email,
      password: hashedPassword,
      role,
    });

    // Save the admin to the database
    const savedAdmin = await newAdmin.save();
    res.status(201).json(savedAdmin);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});

export default router;
