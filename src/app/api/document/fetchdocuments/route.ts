import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import Document from "@/models/Document";

export async function GET(req: Request) {
  await connectDB();
  const user = await protectRoute();

  try {
    const documents = await Document.find({ user }).select("_id title");
    const docCounts = documents.length;
    console.log("Documents fetched:", documents);
    console.log("Document count:", docCounts);
    if (docCounts === 0) {
      return Response.json({ message: "No documents found" }, { status: 404 });
    }

    return Response.json(
      { documents, docCounts},
      { status: 200 },
    );
  } catch (error) {
    return Response.json(
      { message: "Error fetching documents" },
      { status: 500 },
    );
  }
}
