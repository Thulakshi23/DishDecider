import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client"; // Import PrismaClient
const db = new PrismaClient(); // Initialize PrismaClient
import jwt from "jsonwebtoken"; // To verify tokens

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { token } = req.query;

    if (!token) return res.status(400).json({ success: false, message: "Token is missing" });

    try {
      // Verify the token
      const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
      const userId = (decoded as jwt.JwtPayload).id;

      // Activate the user's account
      await db.user.update({
        where: { id: userId },
        data: { isVerified: true },
      });

      res.status(200).json({ success: true, message: "Email confirmed successfully" });
    } catch (error) {
      res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
