import connectDB from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body: { name: string; email: string; password: string } = await req.json();
    const { name, email, password } = body;
   
    await connectDB()
    
    if(!name || !email || !password){
      return Response.json({message: "All fields are required"},{status: 400})
    }
    if (password.length < 6) {
      return Response.json(
        { message: "Password must be at least 6 characters" },
        { status: 400 },
      );
    }

    if (!name || name.trim().length < 3) {
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

    const userExists = await User.findOne({ email });
    if (userExists)
      return Response.json({ message: "User already exists" }, { status: 409 });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await User.create({ name, email, password: hashedPassword });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ message: "User created successfully", user: {_id: user._id, name: user.name, email: user.email, role: user.role} }, { status: 201 })
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return response;

  } catch (error: unknown) {
    return Response.json({ message: error instanceof Error ? error.message: "Error in User registration" }, { status: 500 });
  }
}
