import { NextRequest, NextResponse } from "next/server";
import dbConnect from '../../../config/db';
import DishModel from '../models/Dish'; // Assuming you have a Dish model

// Route to handle Dish operations

// Create a new dish
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const { name, description, price, category, imageUrl } = await req.json();

    // Connect to the database
    await dbConnect();

    // Create a new dish instance
    const newDish = new DishModel({
      name,
      description,
      price,
      category,
      imageUrl,
    });

    // Save the dish to the database
    await newDish.save();

    return NextResponse.json({ message: "Dish created successfully", dish: newDish }, { status: 201 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Failed to create dish", error: errorMessage }, { status: 500 });
  }
}

// Get all dishes
export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await dbConnect();

    // Fetch all dishes from the database
    const dishes = await DishModel.find();

    return NextResponse.json({ message: "Dishes retrieved successfully", dishes }, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Failed to fetch dishes", error: errorMessage }, { status: 500 });
  }
}

// Update a dish
export async function PUT(req: NextRequest) {
  try {
    const { id, name, description, price, category, imageUrl } = await req.json();

    // Connect to the database
    await dbConnect();

    // Update the dish
    const updatedDish = await DishModel.findByIdAndUpdate(
      id,
      { name, description, price, category, imageUrl },
      { new: true } // Return the updated document
    );

    if (!updatedDish) {
      return NextResponse.json({ message: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Dish updated successfully", dish: updatedDish }, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Failed to update dish", error: errorMessage }, { status: 500 });
  }
}

// Delete a dish
export async function DELETE(req: NextRequest) {
  try {
    const { id } = await req.json();

    // Connect to the database
    await dbConnect();

    // Delete the dish
    const deletedDish = await DishModel.findByIdAndDelete(id);

    if (!deletedDish) {
      return NextResponse.json({ message: "Dish not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Dish deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ message: "Failed to delete dish", error: errorMessage }, { status: 500 });
  }
}
