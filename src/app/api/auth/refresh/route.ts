import User from "@/models/User";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import { JwtPayload } from "@/lib/auth";

export async function GET() {
  try {
    await connectDB();
    const cookieStore = await cookies();
    const existingRefreshToken = cookieStore.get("refreshToken")?.value;
    if (!existingRefreshToken) {
      return NextResponse.json(
        { message: "Refresh token not found" },
        { status: 401 },
      );
    }

    const decoded = jwt.verify(
      existingRefreshToken,
      process.env.REFRESH_SECRET!,
    ) as JwtPayload;

    const existUser = await User.findById(decoded.id);

    if (!existUser) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const accessToken = jwt.sign(
      { id: existUser._id },
      process.env.ACCESS_SECRET!,
      {
        expiresIn: "1m",
      },
    );

    return NextResponse.json({ accessToken }, { status: 201 });
  } catch (error) {
    console.log("Error refreshing access token:", error);
    return NextResponse.json(
      { message: "Refresh token not found, Please login" },
      { status: 401 },
    );
  }
}
