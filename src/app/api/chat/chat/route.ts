import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import ai from "@/lib/gemini";
import Chat from "@/models/chat";
import Document from "@/models/Document";

interface ChatBody {
  documentId: string | null;
  question: string;
}
export async function POST(req: Request) {
  try {
    await connectDB();
    const user = await protectRoute(req);
    const body: ChatBody = await req.json();
    const { documentId, question } = body;

    let prompt: string;

    //First checking does the user have any uploaded documents
    const documents = await Document.find({ user: user._id });
    if (!documents.length) {
      return Response.json(
        { message: "No uploaded documents found." },
        { status: 404 },
      );
    }

    //Here it checks does user selected specific document
    if (documentId) {
      const document = await Document.findById(documentId);

      if (!document) {
        return Response.json(
          { message: "Document not found" },
          { status: 404 },
        );
      }

      prompt = `
You are an AI document assistant.

Instructions:
1. Search the uploaded document(s) for the answer.
2. If the answer is found, answer ONLY using the document(s). Do not add outside information.
3. If the answer is NOT found, first say:
   "This information is not available in your uploaded document(s). The following answer is based on my general knowledge."
4. Then answer the question using your general knowledge.
5. If the question requires both document information and general knowledge, clearly separate them.

Document:
${document.extractedText}

Question:
${question}
`;
    } else {
      //This case works when user asked question without selecting document

      const allUploadedDocuments = documents
        .map(
          (doc) => `
           Document: ${doc.title} ${doc.extractedText}`,
        )
        .join("\n\n--------------------\n\n");

      prompt = `
You are an AI document assistant.

Instructions:
1. Search the uploaded document(s) for the answer.
2. If the answer is found, answer ONLY using the document(s). Do not add outside information.
3. If the answer is NOT found, first say:
   "This information is not available in your uploaded document(s). The following answer is based on my general knowledge."
4. Then answer the question using your general knowledge.
5. If the question requires both document information and general knowledge, clearly separate them.

Uploaded Documents: ${allUploadedDocuments}

Question:
${question}
`;
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    const chat = await Chat.create({
      user: user._id,
      ...(documentId ? { document: documentId } : {}),
      question,
      answer: response.text,
    });

    return Response.json({ chat }, { status: 200 });
  } catch (error) {
    console.error("Error in chat route:", error);
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
        message: "Failed to send chat",
      },
      {
        status: 500,
      },
    );
  }
}
