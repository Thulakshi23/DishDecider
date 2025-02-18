// src/app/api/payments/route.ts
import { NextResponse } from "next/server";
import connectToDB from "@/config/db";
import Payment from "../models/Payment";

// Function to handle POST requests for recording a payment
export async function POST(req: Request) {
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

    return NextResponse.json({ message: "Payment recorded successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error saving payment:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

// Function to handle GET requests for fetching all payments
export async function GET() {
  try {
    await connectToDB();
    const payments = await Payment.find().sort({ timestamp: -1 }); // Fetch payments sorted by timestamp
    return NextResponse.json({ payments }, { status: 200 });
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
