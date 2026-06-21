import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "@/models/User";

export async function protectRoute() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw Error("Unauthorized, No token found");
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
  const user = await User.findById(decoded.id).select("-password");

  if (!user) {
    throw new Error("User not found");
  }

  return user;
}
