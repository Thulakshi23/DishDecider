// src/app/api/Admin/route.ts
import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '../../../config/db'; // Ensure this path is correct
import User from '../models/User'; // Adjust the import path based on your project structure
import Dish from '../models/Dish'; // Adjust the import path for the Dish model

export async function GET() {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all users, ensure all fields are selected
    const users = await User.find({}, 'firstName lastName email phoneNumber'); // Specify the fields you want to fetch
    console.log("Fetched users:", users); // Log to check the data structure

    // Format the response to include all necessary user fields
    const formattedUsers = users.map((user: { _id: string, firstName: string, lastName: string, email: string, phoneNumber: string }) => ({
      _id: user._id.toString(), // Convert ObjectId to string
      firstName: user.firstName || "", // Ensure firstName is available
      lastName: user.lastName || "",   // Ensure lastName is available
      email: user.email || "",         // Ensure email is available
      phoneNumber: user.phoneNumber || "", // Ensure phoneNumber is available
    }));

    // Fetch all dishes associated with users
    const dishes = await Dish.find({}); // Adjust the query if you want to filter dishes
    console.log("Fetched dishes:", dishes); // Log to check the data structure

    // Format the response to include all necessary dish fields
    const formattedDishes = dishes.map((dish: { _id: string, name: string, userId: string }) => ({
      _id: dish._id.toString(), // Convert ObjectId to string
      name: dish.name || "", // Ensure name is available
      userId: dish.userId.toString(), // Ensure userId is available
    }));

    // Return combined data
    return NextResponse.json({ users: formattedUsers, dishes: formattedDishes }, { status: 200 });
  } catch (error: any) {
    console.error("Error fetching users and dishes:", error.message);
    return NextResponse.json({ error: "Failed to fetch users and dishes" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get('id'); // Assuming the user ID is passed as a query parameter

    await dbConnect();

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
  } catch (error: any) {
    console.error("Error deleting user:", error.message);
    return NextResponse.json({ error: 'Failed to delete user' }, { status: 500 });
  }
}
