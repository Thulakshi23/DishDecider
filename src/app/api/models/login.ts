import type { NextApiRequest, NextApiResponse } from "next";
import User from "../models/User"; // Adjust the path based on your project structure
import bcrypt from "bcrypt";

export interface LoginInput {
  email: string;
  password: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password }: LoginInput = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log(user);

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Incorrect Password" });
      }

      console.log(user.password);

      const token = user.generateAuthToken();
      return res.status(200).json({ user, token });
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
