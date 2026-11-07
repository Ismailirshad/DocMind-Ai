import mongoose from "mongoose";
import { Model } from "mongoose";

export interface IChat {
  user: mongoose.Types.ObjectId ;
  document?: mongoose.Types.ObjectId ;
  question: string;
  answer: string;
  createdAt: Date; 
  updatedAt: Date;
}

const chatSchema = new mongoose.Schema<IChat>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Document",
    },

    question: {
      type: String,
      required: true,
    },

    answer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);
chatSchema.index({ user: 1 });
const Chat = (mongoose.models.Chat as Model<IChat>) || mongoose.model<IChat>("Chat", chatSchema);
export default Chat;
