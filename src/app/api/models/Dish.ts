import mongoose, { Schema, model, Document } from "mongoose";

export interface DishDocument extends Document {
  name: string;
  description: string;
  ingredients: string[];
  imageUrl: string;
}

const dishSchema = new Schema<DishDocument>({
  name: { type: String, required: true },
  description: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  imageUrl: { type: String },
});

export default mongoose.models.Dish || model<DishDocument>("Dish", dishSchema);
