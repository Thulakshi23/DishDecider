import { NextRequest, NextResponse } from "next/server";
import User from "../models/User"; // Adjust the path based on your project structure
import bcrypt from "bcrypt";
import dbConnect from "../../../config/db";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json(); // Use req.json() to parse the body
    const { email, password } = body;

    await dbConnect(); // Connect to the database

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: "Incorrect Password" }, { status: 400 });
    }

    const token = user.generateAuthToken();
    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    console.error(error); // Log the error for debugging
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
};
