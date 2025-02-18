import mongoose, { Schema, Document, models } from "mongoose";

// Define the TypeScript interface for a Meal document
export interface IMeal extends Document {
  name: string;
  category: string;
  ingredients: string[];
  image: string;
}

// Define the Mongoose Schema
const MealSchema = new Schema<IMeal>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    ingredients: { type: [String], required: true },
    image: { type: String, required: true }, // Store Cloudinary or other image URL
  },
  { timestamps: true }
);

// Prevent model re-registration in Next.js
const Meal = models.Meal || mongoose.model<IMeal>("Meal", MealSchema);

export default Meal;
