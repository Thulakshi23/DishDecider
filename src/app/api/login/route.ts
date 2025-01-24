import { NextRequest, NextResponse } from "next/server";
import User from "../models/User"; // Adjust the path based on your project structure
import bcrypt from "bcrypt";
import dbConnect from "../../../config/db"; // Adjust the path based on your project structure
import jwt from "jsonwebtoken"; // Import JWT for token generation

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Parse the JSON body from the request
    const { email, password } = body;

    await dbConnect(); // Connect to the database

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
    }

    // Generate an authentication token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || 'your_secret_key', { expiresIn: '1h' });

    // Return the user information and token as the response
    return NextResponse.json({ user: { email: user.email, id: user._id }, token }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
