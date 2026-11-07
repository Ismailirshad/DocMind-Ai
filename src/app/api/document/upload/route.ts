import { protectRoute } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import Document from "@/models/Document";
import { UploadApiResponse } from "cloudinary";
// @ts-expect-error pdf-parse/lib/pdf-parse does not provide TypeScript declarations
import pdfParse from "pdf-parse/lib/pdf-parse";
import DocumentChunk from "@/models/DocumentChunk";
import { splitTextIntoChunks } from "@/lib/chunking";
import { generateEmbedding } from "@/lib/embedding";

export async function POST(req: Request): Promise<Response> {
  try {
    await connectDB();
    const user = await protectRoute(req);
    const formData = await req.formData();

    const title = formData.get("title")
    const category = formData.get("category")
    const file = formData.get("file")

    if (typeof title !== "string" ||
      typeof category !== "string" ||
      !(file instanceof File)
    ) {
      return Response.json(
        { message: "Required fields are missing or invalid" },
        { status: 400 },
      );
    }

    if (!title || !category || !file || file.size === 0) {
      return Response.json(
        { message: "Title, category and a valid PDF are required" },
        { status: 400 },
      );
    }

    if (file.type !== "application/pdf") {
      return Response.json(
        { message: "Only PDF files are allowed" },
        { status: 400 },
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      return Response.json(
        { message: "PDF file size must be less than 10 MB" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let extractedData = "";
    let pageCount = 0;

    try {
      const data = await pdfParse(buffer);

      extractedData = data.text;
      pageCount = data.numpages;
    } catch (error) {
      console.error("PDF parsing failed:", error);

      return Response.json(
        {
          message:
            "Unable to process this PDF. The file may be corrupted or use an unsupported PDF structure.",
        },
        { status: 400 },
      );
    }

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "Docmind-Ai",
            public_id: crypto.randomUUID(),
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else if (!result) {
              reject(new Error("Cloudinary upload failed"));
            } else {
              resolve(result);
            }
          },
        )
        .end(buffer);
    });

    const document = await Document.create({
      user: user._id,
      title,
      category,
      pdfUrl: result.secure_url,
      extractedText: extractedData,
      pageCount,
    });

    if (extractedData.length > 0) {
      // 1. Split the extracted PDF text into chunks
      const chunks = splitTextIntoChunks(extractedData);

      // 2. Generate an embedding for each chunk
      const chunkDocuments = await Promise.all(
        chunks.map(async (chunk) => {
          const embedding = await generateEmbedding(
            chunk.content,
            "RETRIEVAL_DOCUMENT"
          );

          return {
            document: document._id,
            user: user._id,
            content: chunk.content,
            embedding,
            chunkIndex: chunk.chunkIndex,
          };

        })
      );
      if (!extractedData.trim()) {
        return Response.json(
          {
            message: "No readable text found in this PDF.",
          },
          { status: 400 },
        );
      }

      // 3. Save all chunks and embeddings in MongoDB
      if (chunkDocuments.length > 0) {
        await DocumentChunk.insertMany(chunkDocuments);
      }
    }

    return Response.json(
      {
        document,
        success: true,
        message: "Document added successfully",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error in uplaoding document route:", error);
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
        message: "Failed to upload document",
      },
      {
        status: 500,
      },
    );
  }
}
