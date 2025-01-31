import dbConnect from "@/config/db"; // Ensure the path is correct
import User from "../models/User"; // Adjust path as needed
import { NextResponse } from "next/server";

//  GET: Fetch all users
export async function GET() {
  try {
    await dbConnect();
    const users = await User.find({}).select(
      "userName email profilePic createdAt"
    );
    return NextResponse.json(users, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { message: "Failed to fetch users", error: error.message },
      { status: 500 }
    );
  }
}

//  PUT: Update a user (expects JSON body with userId & updated data)
export async function PUT(request: Request) {
  try {
    await dbConnect();
    const { userId, updatedData } = await request.json(); // Extract userId & update fields

    if (!userId || !updatedData) {
      return NextResponse.json(
        { message: "User ID and data required" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Update failed", error: error.message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a user (expects JSON body with userId)
export async function DELETE(request: Request) {
  try {
    await dbConnect();
    const { userId } = await request.json(); // Extract userId

    if (!userId) {
      return NextResponse.json(
        { message: "User ID required" },
        { status: 400 }
      );
    }

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted", user: deletedUser },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { message: "Deletion failed", error: error.message },
      { status: 500 }
    );
  }
}
