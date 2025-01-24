// import dbConnect from "../../../config/db";
// import User from "../../../app/api/models/User";
// import { NextResponse } from "next/server";

// // Handle GET requests (Fetch all users)
// export const GET = async () => {
//   try {
//     await dbConnect(); // Connect to the database
//     const users = await User.find(); // Fetch all users
//     return NextResponse.json(users, { status: 200 });
//   } catch (error: any) {
//     console.error("Error fetching users:", error.message);
//     return NextResponse.json(
//       { message: "Failed to fetch users.", error: error.message },
//       { status: 500 }
//     );
//   }
// };
