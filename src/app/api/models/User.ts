import { Schema, model, models, Document } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Define User interface
interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  generateAuthToken(): string; // JWT method
}

// Define User schema
const userSchema = new Schema<IUser>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Generate JWT token
userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign({ id: this._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h", // Token validity
  });
  return token;
};

const UserModel = models.User || model<IUser>("User", userSchema);
export default UserModel;
