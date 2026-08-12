import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat, { IChat } from "@/models/chat";
import { HydratedDocument } from "mongoose";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);
    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");

    let messages: HydratedDocument<IChat>[] = [];

    if (documentId) {
      messages = await Chat.find({ user: user._id, document: documentId })
        .populate("document")
        .sort({ createdAt: 1 });
    } else {
      messages = await Chat.find({ user: user._id })
        .populate("document")
        .sort({ createdAt: 1 })
        .limit(20);
    }
    const messageCount = await Chat.countDocuments({ user: user._id });

    return Response.json({ messages, messageCount }, { status: 200 });
  } catch (error) {
    console.error("Error in fetching chats route:", error);
    if (error instanceof Error && error.message === "Access token expired") {
      return Response.json(
        {
          message: "Access token expired",
        },
        {
          status: 401,
        },
      );
    }

    return Response.json(
      {
        message: "Failed to fetching chats",
      },
      {
        status: 500,
      },
    );
  }
}
