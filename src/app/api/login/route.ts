import { NextRequest, NextResponse } from "next/server";
import User from "../models/User"; // Adjust the path based on your project structure
import dbConnect from "../../../config/db"; // Adjust the path based on your project structure

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
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect password" }, { status: 400 });
    }

    // Generate an authentication token
    const token = user.generateAuthToken();

    // Return the user information and token as the response
    return NextResponse.json(
      {
        user: {
          email: user.email,
          id: user._id,
          firstName: user.firstName, // Ensure this matches your schema
          lastName: user.lastName, // Ensure this matches your schema
          role: user.role, // Include role
        },
        token,
        redirectUrl: user.role === "admin" ? "/admin" : "/user", // Send redirect URL to frontend
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
