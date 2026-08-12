import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import { JwtPayload } from "@/lib/auth";

interface ILoginData{ 
  email: string;
  password: string;
}
export async function POST(req: Request) {
  try {
    const body: ILoginData = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    await connectDB();

    //fetching the cookies to check
    const cookieStore = await cookies();
    const existingRefreshToken = cookieStore.get("refreshToken")?.value;

    // Checks user already loggedIn or not ?
    if (existingRefreshToken) {
      try {
        const decoded = jwt.verify(
          existingRefreshToken,
          process.env.REFRESH_SECRET!,
        ) as JwtPayload;

        const existUser = await User.findById(decoded.id);
        if (existUser && existUser.email == email) {
          return Response.json(
            { message: "User already logged In" },
            { status: 409 },
          );
        }
      } catch (error) {
        console.log("Invalid or expired token", error);
      }
    }

    const user = await User.findOne({ email });
    if (!user) {
      return Response.json({ message: "User not exist" }, { status: 404 });
    }
    if (!user.password) {
      return Response.json(
        { message: "This account uses google login" },
        { status: 404 },
      );
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return Response.json({ message: "Invalid Credentials" }, { status: 400 });
    }

    const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_SECRET!, {
      expiresIn: "15m",
    });

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    const res = NextResponse.json(
      {
        message: "User logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        accessToken,
      },
      { status: 201 },
    );
    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 7,
    });

    return res;
  } catch (error) {
    return Response.json(
      { message: "User login failed", error },
      { status: 500 },
    );
  }
}
