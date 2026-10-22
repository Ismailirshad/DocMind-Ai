import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Chat from "@/models/chat";
import Document from "@/models/Document";
import User from "@/models/User";
import mongoose from "mongoose";

interface IUsersData {
  _id: mongoose.Types.ObjectId;
  role: "user" | "admin";
  name: string;
  email: string;
  documentsCount: number;
  indexedPages: number;
  chatCount: number;
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

    const users = await User.find()
      .select("name email _id role")
      .sort({ createdAt: -1 });

    const documents = await Document.find().select("user pageCount");
    const chats = await Chat.find().select("user");

    const usersData: IUsersData[] = users.map((user) => {
      const userDocuments = documents.filter(
        (doc) => doc.user.toString() === user._id.toString(),
      );

      const userChats = chats.filter(
        (chat) => chat.user.toString() === user._id.toString(),
      );

      const indexedPages = userDocuments.reduce(
        (acc, doc) => acc + doc.pageCount,
        0,
      );

      return {
        _id: user._id,
        role: user.role,
        name: user.name,
        email: user.email,
        documentsCount: userDocuments.length,
        indexedPages,
        chatCount: userChats.length * 2,
      };
    });

    const totalUsers = users.length;
    const totalDocuments = documents.length;

    const totalIndexedPages = documents.reduce(
      (acc, doc) => acc + doc.pageCount,
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
