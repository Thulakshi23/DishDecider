import dbConnect from "@/config/db"; // Update the path if needed
import User from "@/app/api/models/User"; // Update the path if needed
import { NextResponse } from "next/server";

// Handle GET requests (Fetch all users)
export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users from the database
    const users = await User.find();

    // Return the users as a JSON response
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users:", error.message);

    // Return an error response if something goes wrong
    return NextResponse.json(
      { message: "Failed to fetch users.", error: error.message },
      { status: 500 }
    );
  }
}
