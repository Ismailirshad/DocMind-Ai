import mongoose, { Model } from "mongoose";
import { IUser } from "./User";

export interface IDocument {
  user: mongoose.Types.ObjectId | IUser;
  title: string;
  category: string;
  pdfUrl: string;
  extractedText?: string;
  pageCount: number;
  createdAt: Date;
  updatedAt: Date;
}

const documentSchema = new mongoose.Schema<IDocument>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      default: "other",
    },

    pdfUrl: {
      type: String,
      required: true,
    },

    extractedText: {
      type: String,
      default: "",
    },
    pageCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);
const Document =
  (mongoose.models.Document as Model<IDocument>) || mongoose.model<IDocument>("Document", documentSchema);
export default Document;
