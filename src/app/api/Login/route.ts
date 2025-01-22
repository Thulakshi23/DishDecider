import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dbConnect from "../../../config/db";
import userModel from "../models/User";

// Load environment variables
const JWT_SECRET = process.env.JWT_SECRET || "default_secret_key";

// Route for user login
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { email, password } = await req.json();

    // Connect to the database
    await dbConnect();

    // Find the user by email
    const user = await userModel.findOne({ email });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      JWT_SECRET,
      { expiresIn: "1h" } // Token expires in 1 hour
    );

    // Send success response with the token
    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Something went wrong", error: errorMessage },
      { status: 500 }
    );
  }
}
