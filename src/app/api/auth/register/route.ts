import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

interface RegisterBody {
  name: string;
  email: string;
  password: string;
}
export async function POST(req: Request) {
  try {
    const body: RegisterBody = await req.json();
    const { name, email, password } = body;

    
    if (!name || !email || !password) {
      return Response.json(
        { message: "All fields are required" },
        { status: 400 },
      );
    }
    
    await connectDB();

    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (name.trim().length < 3) {
      return Response.json(
        { message: "Name must be at least 3 characters long" },
        { status: 400 },
      );
    }

    //check if emails are valid: regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Response.json(
        { message: "Invalid email format" },
        { status: 400 },
      );
    }

    // password validation : 1 uppercase, 1 lowercase, 1 number, 1 special character
    if (!/[A-Z]/.test(password)) {
      return Response.json(
        { message: "Password must contain at least 1 uppercase letter" },
        { status: 400 },
      );
    }
    if (!/[a-z]/.test(password)) {
      return Response.json(
        { message: "Password must contain at least 1 lowercase letter" },
        { status: 400 },
      );
    }
    if (!/[0-9]/.test(password)) {
      return Response.json(
        { message: "Password must contain at least 1 number" },
        { status: 400 },
      );
    }
    if (!/[!@#$%^&*(),.?":{}|<>_\-\\[\]\/+=~`]/.test(password)) {
      return Response.json(
        { message: "Password must contain at least 1 special character" },
        { status: 400 },
      );
    }

    const userExists = await User.findOne({ email });
    if (userExists)
      return Response.json({ message: "User already exists" }, { status: 409 });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

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

    const response = NextResponse.json(
      {
        message: "User created successfully",
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

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error: unknown) {
    console.log("Error in User registration:", error);
    return Response.json(
      {
        message:
          error instanceof Error ? error.message : "Error in User registration",
      },
      { status: 500 },
    );
  }
}
