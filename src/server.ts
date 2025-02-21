// import express, { Application } from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import dotenv from "dotenv";
// import connectDB from "./config/db";
// import userRoutes from "./app/api/users/route"; // Use default import
// import adminRoutes from "./app/api/admin/route"; // Use default import

// dotenv.config();

// const app: Application = express();
// const PORT = process.env.PORT || 5000;

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// // Routes
// app.use("/api/users", userRoutes);
// app.use("/api/admins", adminRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
