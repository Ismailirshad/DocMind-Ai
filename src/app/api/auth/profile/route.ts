import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);

    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log("Error fetching user profile:", error);
    return NextResponse.json(
      { message: "User not found, Please login" },
      { status: 401 },
    );
  }
}
