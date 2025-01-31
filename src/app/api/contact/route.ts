import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import Contact from "../models/Contact";
import dbConnect from '../../../config/db';

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); // Ensure MongoDB is connected

    const { name, email, phone } = await req.json();

    if (!name || !email || !phone) {
      return NextResponse.json(
        { success: false, message: "All fields are required." },
        { status: 400 }
      );
    }

    const newContact = new Contact({ name, email, phone });
    await newContact.save();

    return NextResponse.json(
      { success: true, message: "Contact saved successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Something went wrong.", error },
      { status: 500 }
    );
  }
}
