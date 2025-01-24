import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import dbConnect from '../../../config/db';
import userModel from '../models/User';// Load environment variables


const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';// Route for user registration
export async function POST(req: NextRequest) {
  const { firstName, lastName, email, password, confirmPassword } = await req.json();  try {
    // Connect to the database
    await dbConnect();    // Check if the email already exists in the database
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'Email already exists' }, { status: 400 });
    }    // Check if the confirmPassword matches the password
    if (password !== confirmPassword) {
      return NextResponse.json({ message: 'Passwords do not match' }, { status: 400 });
    }    // Hash the password

    const newUser = new userModel({
      firstName,
      lastName,
      email,
      password,
      confirmPassword, // Add confirmPassword here
    });    // Save the new user to the database
    await newUser.save();    // Generate a JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: '1h' } // Token expiration (1 hour)
    );    // Send success response with the token
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