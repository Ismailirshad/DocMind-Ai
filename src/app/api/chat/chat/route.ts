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
You are DocMind AI, an AI assistant that answers questions about uploaded documents.

Your task is to answer the user's question using the provided document.

DOCUMENT:
${document.extractedText}

USER QUESTION:
${question}

IMPORTANT INFORMATION RULES:

1. Use the document as the primary and authoritative source.
2. Do not invent facts that are not present in the document.
3. If the requested information is not present in the document, clearly state:
   "This information is not available in the uploaded document."
4. After that statement, you may provide relevant general knowledge if it helps answer the user's question.
5. Clearly distinguish document-based information from general knowledge.

MARKDOWN FORMATTING RULES:

You MUST return the answer using Markdown.

Use this structure whenever applicable:

## Main Heading

Short introductory sentence.

### Section Heading

- **Point:** Explanation
- **Point:** Explanation
- **Point:** Explanation

### Another Section

- **Point:** Explanation
- **Point:** Explanation

STRICT FORMATTING REQUIREMENTS:

- Use "## " for major sections.
- Use "### " for subsections.
- Use "- " for bullet points.
- Put EVERY bullet point on a separate line.
- Never combine multiple points into one paragraph.
- Use **bold** for important names, labels, technologies, and keywords.
- Use numbered lists when the user asks for steps, processes, or ordered information.
- Leave one blank line between paragraphs and sections.
- Keep paragraphs short.
- Do not create unnecessarily long paragraphs.
- Do not repeat the same information.
- Make the response easy to scan.
- If there are multiple items, ALWAYS use a bullet list.
- If there are categories, use headings and bullet points.

For example, if the document contains:

Name: Ismail Irshad
Location: Bengaluru, India
Skills: React.js, Next.js, JavaScript, ERPNext

and the user asks "Give me the important details", respond like this:

## Important Details

### Contact Information

- **Name:** Ismail Irshad
- **Location:** Bengaluru, India

### Skills

- **Frontend:** React.js, Next.js, JavaScript
- **ERP:** ERPNext

Do NOT respond like this:

Contact Information
Name: Ismail Irshad
Location: Bengaluru, India
Skills
React.js
Next.js
JavaScript

Always use proper Markdown headings and bullet points.

Now answer the user's question.
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
You are DocMind AI, an AI assistant that answers questions using the user's uploaded documents.

UPLOADED DOCUMENTS:

${allUploadedDocuments}

USER QUESTION:
${question}

INFORMATION RULES:

1. Search ALL uploaded documents for information relevant to the question.
2. If the answer is found in the documents, answer using ONLY the document information.
3. Do not invent or assume information.
4. If the answer cannot be found in any uploaded document, begin with:

   "This information is not available in your uploaded document(s)."

5. After that statement, you may answer using general knowledge.
6. Clearly separate document-based information from general knowledge when both are used.

MARKDOWN FORMATTING:

You MUST return clean Markdown.

Use:

## Main Section

### Subsection

- **Important point:** Explanation
- **Important point:** Explanation
- **Important point:** Explanation

FORMATTING RULES:

- Use "## " for major sections.
- Use "### " for subsections.
- Use "- " for bullet points.
- Every bullet MUST be on its own line.
- Use **bold** for important names, labels, technologies, and keywords.
- Use numbered lists for ordered steps.
- Leave a blank line between sections.
- Keep paragraphs short.
- Avoid large blocks of text.
- If there are multiple items, use bullet points.
- If there are different categories, use separate headings.
- Never put multiple list items into one paragraph.
- Do not repeat information.

Example:

## Skills

### Frontend

- **React.js**
- **Next.js**
- **JavaScript**

### Backend

- **Node.js**
- **Express.js**
- **MongoDB**

Now answer the user's question.
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
