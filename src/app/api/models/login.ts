import type { NextApiRequest, NextApiResponse } from "next";
import User from "./User"; // Adjust the path based on your project structure
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; // Import JWT for token generation

export interface LoginInput {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password }: LoginInput = req.body;

    try {
      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Compare the provided password with the stored hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect password" });
      }

      // Generate an authentication token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });

      // Return user information and token (only expose necessary user fields)
      return res.status(200).json({ user: { email: user.email, id: user._id }, token });
    } catch (error) {
      console.error(error); // Log the error for debugging
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
