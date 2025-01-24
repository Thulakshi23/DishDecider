import express, { Application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
// import userRoutes from "../src/app/api/register/route";
// import dishRoutes from "./app/api/Dish/route";
import adminRoutes from "./app/api/Admin/route";

// Initialize dotenv to load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
// app.use("/api/users", userRoutes);
// app.use("/api/dishes", dishRoutes);
app.use("/api/admins", adminRoutes);

//
