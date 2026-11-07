
import mongoose, { Model } from "mongoose";

export interface IDocumentChunk {
  document: mongoose.Types.ObjectId;
  user: mongoose.Types.ObjectId;
  content: string;
  embedding: number[];
  chunkIndex: number;
  pageNumber?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

const documentChunkSchema = new mongoose.Schema<IDocumentChunk>(
  {
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    content: {
      type: String,
      required: true,
    },

    embedding: {
      type: [Number],
      required: true,
      validate: {
        validator: (value: number[]) => value.length === 768,
        message: "Embedding must contain exactly 768 dimensions.",
      },
    },

    chunkIndex: {
      type: Number,
      required: true,
    },

    pageNumber: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

documentChunkSchema.index(
  { document: 1, chunkIndex: 1 },
  { unique: true }
);

const DocumentChunk =
  (mongoose.models.DocumentChunk as Model<IDocumentChunk>) ||
  mongoose.model<IDocumentChunk>("DocumentChunk", documentChunkSchema);

export default DocumentChunk;
