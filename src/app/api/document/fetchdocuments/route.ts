import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Document from "@/models/Document";
import mongoose from "mongoose";

interface DocumentItem {
  _id: mongoose.Types.ObjectId;
  title: string;
  pageCount: number;
  createdAt: Date;
  pdfUrl: string;
  category: string;
}

interface GetDocumentsResponse {
  documents: DocumentItem[];
  docCounts: number;
  indexedPages: number;
  categories: string[];
}

export async function GET(req: Request): Promise<Response> {
  try {
    await connectDB();
    const user = await protectRoute(req);

    const documents = await Document.find({ user: user._id })
      .select("_id title pageCount createdAt pdfUrl category")
      .sort({ createdAt: -1 })
      .lean();

    const docCounts = documents.length;

    const indexedPages = documents.reduce(
      (total, doc) => total + (doc.pageCount ?? 0),
      0
    );

    const categories = [
      ...new Set(
        documents
          .map((doc) => doc.category)
          .filter(Boolean)
      ),
    ];

    const response: GetDocumentsResponse = {
      documents,
      docCounts: docCounts,
      indexedPages: indexedPages,
      categories: categories,
    }

    return Response.json(
      response,
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in fetching document route", error);
    if (error instanceof Error) {
      if (
        error.message === "Unauthorized" ||
        error.message === "Access token expired" ||
        error.message === "Invalid access token"
      ) {
        return Response.json(
          {
            message: error.message,
          },
          {
            status: 401,
          },
        );
      }
    }

    return Response.json(
      {
        message: "Failed to fetch document",
      },
      {
        status: 500,
      },
    );
  }
}
