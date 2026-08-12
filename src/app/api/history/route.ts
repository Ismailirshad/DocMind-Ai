import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat from "@/models/chat";
import Document, { IDocument } from "@/models/Document";

interface IHistory {
  _id: IDocument | null;
  chatCount: number;
  lastChat: Date;
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);

    const documents = await Document.find({ user: user._id });

    const history: IHistory[] = [];

    for (const document of documents) {
      const chats = await Chat.find({
        user: user._id,
        document: document._id,
      }).sort({ createdAt: -1 });

      history.push({
        _id: document,
        chatCount: chats.length,
        lastChat: chats[0]?.createdAt,
      });
    }

    const chatCounts = await Chat.countDocuments({ user: user._id });

    const documentCounts = await Document.countDocuments({ user: user._id });

    return Response.json(
      { history, chatCounts, documentCounts },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in history fetching route:", error);
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
        message: "Failed to fetch history",
      },
      {
        status: 500,
      },
    );
  }
}
