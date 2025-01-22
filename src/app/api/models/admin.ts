import mongoose, { Schema, model, Document } from "mongoose";

export interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
  role: "superadmin" | "admin";
}

const adminSchema = new Schema<AdminDocument>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "admin"], default: "admin" },
});

export default mongoose.models.Admin || model<AdminDocument>("Admin", adminSchema);
