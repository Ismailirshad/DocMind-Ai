import jwt from "jsonwebtoken";
import User from "@/models/User";

export interface JwtPayload {
  id: string;
}

export async function protectRoute(req: Request) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_SECRET!) as JwtPayload;

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    console.log("Access token expired", error);
    throw new Error("Access token expired");
  }
}
