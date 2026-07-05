import { protectRoute } from "@/lib/auth";
import connectDB from "@/lib/db";
import ai from "@/lib/gemini";
import Chat from "@/models/chat";
import Document from "@/models/Document";

export async function POST(req: Request) {
    await connectDB();
    const user = await protectRoute();
    const { documentId, question } = await req.json();
    let document = null;
    let prompt;

    try {
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
            document = await Document.findById(documentId);

            if (!document) {
                return Response.json(
                    { message: "Document not found" },
                    { status: 404 },
                );
            }

            prompt = `
You are an AI document assistant.

Answer ONLY using the information in the document below.

If the answer is not present, reply:
"I couldn't find that information in the document."

Document:
${document.extractedText}

Question:
${question}
`;
        } else {
            //This case works when user asked question without selecting document
            const documents = await Document.find({ user: user._id });

            const allUploadedDocuments = documents
                .map(
                    (doc) => `
           Document: ${doc.title} ${doc.extractedText}`,
                )
                .join("\n\n--------------------\n\n");

            prompt = `
You are an AI document assistant.

Answer ONLY using the uploaded documents below.

If the answer is not found in any uploaded document, reply:
"I couldn't find that information in your uploaded documents."

Uploaded Documents: ${allUploadedDocuments}

Question:
${question}
`;
        }

        console.log(prompt);

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        console.log(response.text);

        const chat =await Chat.create({
            user: user._id,
            document: documentId,
            question,
            answer: response.text,
        });

        return Response.json({ chat }, { status: 200 });
    } catch (error) {
        return Response.json(
            {
                message: "Failed to reply your chat ",
                error,
            },
            {
                status: 500,
            },
        );
    }
}
