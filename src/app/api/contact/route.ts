import { NextResponse } from "next/server";
import connectToDatabase from "@/config/db"; // Adjust based on your project structure
import Contact from "../models/Contact"; // Create this model in `models/Contact.ts`

export async function POST(req: Request) {
  try {
    await connectToDatabase();
    const { name, email, phone, message } = await req.json();

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newContact = new Contact({ name, email, phone, message });
    await newContact.save();

    return NextResponse.json({ success: true, message: "Contact details saved!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    await connectToDatabase();
    const contacts = await Contact.find().sort({ createdAt: -1 });

    return NextResponse.json({ success: true, contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}
