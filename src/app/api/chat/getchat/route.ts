import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat from "@/models/chat";
import mongoose from "mongoose";

interface GetChatsResponse {
  messages: ChatMessage[];
  messageCount: number;
  hasMore: boolean;
  currentPage: number;
}

interface PopulatedDocument {
  _id: mongoose.Types.ObjectId;
  title: string;
}
interface ChatMessage {
  _id: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  document?: PopulatedDocument | null
  question: string;
  answer: string;
  createdAt: Date;
  updatedAt: Date;
}
export async function GET(req: Request): Promise<Response> {
  try {
    await connectDB();
    const user = await protectRoute(req);

    const { searchParams } = new URL(req.url);
    const documentId = searchParams.get("documentId");
    const page = parseInt(searchParams.get("page") || "1")
    const limit = 5;
    const skip = (page - 1) * limit
    const filter = documentId
      ? { user: user._id, document: documentId }
      : { user: user._id };

    const [messages, messageCount] = await Promise.all([
      Chat.find(filter).populate<{ document: PopulatedDocument | null }>("document", "_id title").sort({ createdAt: -1, _id: -1 }).skip(skip).limit(limit),

      Chat.countDocuments(filter)
    ])

    const response: GetChatsResponse = {
      messages: messages.reverse(),
      messageCount,
      hasMore: skip + messages.length < messageCount,
      currentPage: page,
    }
    return Response.json(response, { status: 200 });
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
