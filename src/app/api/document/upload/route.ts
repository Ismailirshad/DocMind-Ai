import { protectRoute } from "@/lib/auth";
import cloudinary from "@/lib/cloudinary";
import connectDB from "@/lib/db";
import Document from "@/models/Document";
import pdfParse from "pdf-parse/lib/pdf-parse";

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const user = await protectRoute();
    console.log("jhje", formData);

    const title = formData.get("title");
    const category = formData.get("category");
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
    console.log(data);
    const extractedData = data.text;
    const pageCount = data.numpages;

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            resource_type: "raw",
            folder: "Docmind-Ai",
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          },
        )
        .end(buffer);
    });

    console.log("url is", result);

    const document = await Document.create({
      user: user._id,
      title: title,
      category: category,
      pdfUrl: result.secure_url,
      extractedText: extractedData,
      pageCount: pageCount,
    });

    return Response.json({
      success: true,
      message: "Document added successfully",
    });
  } catch (error) {
    console.log(error);
    return Response.json(
      {
        message: "Failed to add document ",
        error,
      },
      {
        status: 500,
      },
    );
  }
}
