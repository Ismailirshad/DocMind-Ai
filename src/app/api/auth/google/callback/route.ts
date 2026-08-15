import { NextRequest, NextResponse } from "next/server";
import { google } from "googleapis";
import User from "@/models/User";
import jwt from "jsonwebtoken";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID!,
  process.env.GOOGLE_CLIENT_SECRET!,
  process.env.GOOGLE_REDIRECT_URI!,
);

export async function GET(req: NextRequest) {
  try {
    const code = req.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { message: "Google authorization code missing" },
        { status: 400 },
      );
    }

    // 1. Exchange Google code for tokens
    const { tokens } = await oauth2Client.getToken(code);

    oauth2Client.setCredentials(tokens);

    // 2. Get Google user information
    const oauth2 = google.oauth2({
      version: "v2",
      auth: oauth2Client,
    });

    const { data } = await oauth2.userinfo.get();

    // 3. Find user by Google ID
    let user = await User.findOne({
      googleId: data.id,
    });

    // 4. If Google ID doesn't exist, try email
    if (!user) {
      user = await User.findOne({
        email: data.email,
      });
    }
    // Before creating the user, check that email exists and provide a fallback for name:
    if (!data.email) {
      return NextResponse.json(
        { message: "Google email not available" },
        { status: 400 },
      );
    }

    const name = data.name ?? "Google User";

    // 5. Create user if doesn't exist
    if (!user) {
      user = await User.create({
        name,
        email: data.email,
        googleId: data.id,
      });
    } else if (!user.googleId) {
      // Existing email account → connect Google account
      user.googleId = data.id;
      await user.save();
    }

    // 7. Create refresh token
    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_SECRET!,
      {
        expiresIn: "7d",
      },
    );

    // 8. Create response
    const response = NextResponse.redirect(
      new URL("/", process.env.NEXT_PUBLIC_API_URL!),
    );

    response.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Google OAuth error:", error);

    return NextResponse.json(
      { message: "Google authentication failed" },
      { status: 500 },
    );
  }
}
