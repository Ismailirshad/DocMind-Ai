import { protectRoute } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import Document from "@/models/Document";
import { UploadApiResponse } from "cloudinary";
// @ts-expect-error pdf-parse/lib/pdf-parse does not provide TypeScript declarations
import pdfParse from "pdf-parse/lib/pdf-parse";

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const user = await protectRoute(req);

    const title = formData.get("title") as string;
    const category = formData.get("category") as string;
    const file = formData.get("file") as File;

    if (!title || !category || !file) {
      return Response.json(
        { message: "Required fields are missing" },
        { status: 400 },
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const data = await pdfParse(buffer);
    const extractedData: string = data.text;
    const pageCount: number = data.numpages;

    const result = await new Promise<UploadApiResponse>((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: "Docmind-Ai",
            public_id: file.name.replace(".pdf", ""),
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
      title: title,
      category: category,
      pdfUrl: result.secure_url,
      extractedText: extractedData,
      pageCount: pageCount,
    });

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
