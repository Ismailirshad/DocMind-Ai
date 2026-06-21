import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if(!email || !password){
      return Response.json({message: "All fields are required"},{status: 400})
    }
    await connectDB()

    //fetching the cookies to check
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    // Checks user already loggedIn or not ?
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
        const existUser = await User.findById(decoded.id);
        if (existUser && existUser.email == email) {
          return Response.json(
            { message: "User already logged In" },
            { status: 200 },
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

    const newtoken = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    const res = NextResponse.json(
      { message: "User logged in successfully", user: {_id: user._id, name: user.name, email: user.email, role: user.role} },
      { status: 201 },
    );
    res.cookies.set("token", newtoken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      sameSite: process.env.NODE_ENV == "production" ? "none" : "strict",
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
