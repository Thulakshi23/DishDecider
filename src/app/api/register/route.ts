import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import dbConnect from '../../../config/db';
import userModel from '../models/User';


const JWT_SECRET = process.env.JWT_SECRET; // Ensure this is set in your environment

export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, confirmPassword } = await req.json();

  try {
    // Check if the JWT_SECRET is provided
    if (!JWT_SECRET) {
      return NextResponse.json({ message: 'JWT_SECRET is not defined' }, { status: 500 });
    }

    // Connect to the database
    await dbConnect();

    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 409 });
    }

    // Check if the confirmPassword matches the password
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }

    // Create new user instance without confirmPassword
    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
    });

    // Save the new user to the database
    await newUser.save();

    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration (1 hour)
    );

    // Send success response with the token
    return NextResponse.json(
      { message: 'User registered successfully', token, newUser },
      { status: 201 }
    );

  } catch (error) {
    // Handle errors
    console.error(error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ message: 'Something went wrong', error: errorMessage }, { status: 500 });
  }
}
