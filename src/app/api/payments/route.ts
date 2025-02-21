// src/app/api/payments/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectToDB from "@/config/db";
import Payment from "../../api/models/Payment";
import User from "../../api/models/User";

// Function to handle POST requests for recording a payment
export async function POST(req: NextRequest) {
  try {
    const { userId, planName, price, paymentId, status } = await req.json();

    await connectToDB();

    const newPayment = new Payment({
      userId,
      planName,
      price,
      paymentId,
      status,
      timestamp: new Date(),
    });

    await newPayment.save();

    return NextResponse.json(
      { message: "Payment recorded successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving payment:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Function to handle GET requests for fetching all payments
export async function GET() {
  try {
    await connectToDB();
    const payments = await Payment.find().sort({ timestamp: -1 });

    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Function to handle DELETE requests for removing a user
export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.searchParams.get("id");
    if (!id) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 });
    }

    await connectToDB();

    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting user:", (error as Error).message);
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}