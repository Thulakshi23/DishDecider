// src/models/Payment.ts
import mongoose, { Document, Schema } from "mongoose";

interface IPayment extends Document {
  userId: string;
  planName: string;
  price: number;
  paymentId: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
}

const paymentSchema: Schema = new Schema({
  userId: { type: String, required: true },
  planName: { type: String, required: true },
  price: { type: Number, required: true }, // Price should be a number
  paymentId: { type: String, required: true },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "pending" },
  timestamp: { type: Date, default: Date.now },
});

export default mongoose.models.Payment || mongoose.model<IPayment>("Payment", paymentSchema);