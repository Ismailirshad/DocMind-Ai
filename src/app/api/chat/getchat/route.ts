import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat from "@/models/chat";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute();

    const messages = await Chat.find({ user: user._id }).populate("document").sort({ createdAt: 1 });
    return Response.json({ messages }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        message: "Failed to fetch messages chat ",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
