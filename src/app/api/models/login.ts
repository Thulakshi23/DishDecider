import { NextRequest, NextResponse } from "next/server";
import User from "../models/User";
import dbConnect from "../../../config/db";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    const { email, password } = body;

    await dbConnect();

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET as string, {
      expiresIn: "1h",
    });

    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          email: user.email,
          firstname: user.firstName, // Make sure to use 'firstName' to match your model
          lastname: user.lastName, // Use 'lastName' here too
          role: user.role, 
        },
        token,
        redirectUrl: user.role === "admin" ? "/admin" : "/user", // Send redirect URL to frontend
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Login Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
