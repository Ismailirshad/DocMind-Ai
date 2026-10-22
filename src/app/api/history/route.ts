import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat from "@/models/chat";
import Document from "@/models/Document";
import { Types } from "mongoose";

interface IchatStats {
  _id:  Types.ObjectId;
  chatCount: number;
  lastChat?: Date;
}

interface Idocuments {
  _id:  Types.ObjectId;
  title: string;
}

interface IHistory {
  _id: Idocuments;
  chatCount: number;
  lastChat?: Date;
}

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);

    const [documents, chatStats, chatCounts, documentCounts]=
    await Promise.all([
      Document.find({ user: user._id }).select("_id title"),
  
      Chat.aggregate<IchatStats>([
        { $match: { user: user._id } },
        {
          $group: {
            _id: "$document",
            chatCount: { $sum: 1 },
            lastChat: { $max: "$createdAt" },
          },
        },
      ]),
  
      Chat.countDocuments({ user: user._id }),
  
      Document.countDocuments({ user: user._id }),
    ]);
  
  const statsByDocument = new Map<string, IchatStats>(
    chatStats.map((stat) => [String(stat._id), stat]),
  );
  
  const history: IHistory[] = documents.map((document) => {
    const stats = statsByDocument.get(String(document._id));
  
    return {
      _id: document,
      chatCount: stats?.chatCount ?? 0,
      lastChat: stats?.lastChat,
    };
  });


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
