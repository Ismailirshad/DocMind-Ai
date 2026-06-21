import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB()
    const user = await protectRoute();
    console.log("User profile fetched successfully:", user);

    return NextResponse.json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "User not found, Please login", error },
      { status: 401 },
    );
  }
}
