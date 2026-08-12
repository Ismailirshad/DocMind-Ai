import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Document from "@/models/Document";

export async function GET(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);
    const documents = await Document.find({ user })
      .select("_id title pageCount createdAt pdfUrl category")
      .sort({ createdAt: -1 });
      
    const docCounts = documents.length || 0;
    const indexedPages = documents.reduce((acc, doc) => acc + (doc.pageCount || 0), 0);

    let categories = documents.map((doc) => doc.category);
    categories = [...new Set(categories)];

    return Response.json(
      { documents, docCounts, indexedPages, categories },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in fetching document route", error);
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
        message: "Failed to fetch document",
      },
      {
        status: 500,
      },
    );
  }
}
