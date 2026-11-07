import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat from "@/models/chat";
import Document from "@/models/Document";
import User from "@/models/User";
import mongoose from "mongoose";

interface IUsersData {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: "user" | "admin";
  documentsCount: number;
  indexedPages: number;
  chatCount: number;
}
interface IDocumentStats {
  _id: mongoose.Types.ObjectId;
  documentCounts: number;
  indexedPages: number;
}
interface IChatStats {
  _id: mongoose.Types.ObjectId;
  chatCount: number;
}
interface IUser {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
  role: "user" | "admin";
}
export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);

    const admin = user.role === "admin";

    if (!admin)
      return Response.json(
        { message: "Only admin route accessed" },
        { status: 500 },
      );

    const [users, documentStats, chatStats]: [IUser[], IDocumentStats[], IChatStats[]] = await Promise.all([
      User.find()
        .select("name email role")
        .sort({ createdAt: -1 })
        .lean(),

      Document.aggregate([
        {
          $group: {
            _id: "$user",
            documentCounts: { $sum: 1 },
            indexedPages: {
              $sum: { $ifNull: ["$pageCount", 0] },
            },
          }
        }
      ]),

      Chat.aggregate([
        {
          $group: {
            _id: "$user",
            chatCount: { $sum: 1 },
          },
        },
      ])
    ])

    // Convert aggregation results into Maps for fast lookup.
    const documentMap = new Map(
      documentStats.map((item) => [item._id.toString(), item]),
    );

    const chatMap = new Map(
      chatStats.map((item) => [item._id.toString(), item]),
    );


    // Combine user data with their statistics.
    const usersData: IUsersData[] = users.map((user) => {
      const userId = user._id.toString();

      const documentData = documentMap.get(userId);
      const chatData = chatMap.get(userId);

      return {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        documentsCount: documentData?.documentCounts || 0,
        indexedPages: documentData?.indexedPages || 0,
        chatCount: chatData?.chatCount || 0,
      };
    });

    const totalUsers = users.length;
    const totalDocuments = documentStats.reduce(
      (total, item) => total + item.documentCounts,
      0,
    );

    const totalIndexedPages = documentStats.reduce(
      (total, item) => total + item.indexedPages,
      0,
    );

    return Response.json(
      {
        usersData,
        totalUsers,
        totalDocuments,
        totalIndexedPages,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in fetching admin dashboard data:", error);
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
        message: "Failed to fetch admin dashboard data",
      },
      {
        status: 500,
      },
    );
  }
}
