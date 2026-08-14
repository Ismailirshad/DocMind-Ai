import api from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ChatStore {
  loading: boolean;
  messages: Message[];
  chatCount: number;
  askAi: (question: string, documentId: string | null) => Promise<void>;
  getChats: (documentId?: string | null) => Promise<void>;
}
export interface Message {
  _id: string;
  user: string;
  question: string;
  answer: string;
  document: DocumentInfo;
  createdAt: string;
  updatedAt: string;
}
interface DocumentInfo {
  _id: string;
  title: string;
}
interface IAskAiResponse{
  chat: Message;
}
interface IGetChatsResponse{
 messages: Message[];
 messageCount: number
}

export const chatStore = create<ChatStore>((set) => ({
  loading: true,
  messages: [],
  chatCount: 0,

  askAi: async (question, documentId) => {
    set({ loading: true });
    try {
      const res = await api.post<IAskAiResponse>(
        "api/chat/chat",
        { question, documentId },
        { withCredentials: true },
      );
      set((state) => ({
        loading: false,
        messages: [...state.messages, res.data.chat],
      }));
    } catch (error) {
      set({ loading: false });

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
      } else {
        console.log("Error in askAi:", error);
      }
    }
  },
  getChats: async (documentId) => {
    set({ loading: true });
    try {
      const res = await api.get<IGetChatsResponse>("api/chat/getchat", {
        params: documentId ? { documentId } : {},
        withCredentials: true,
      });
      set({
        loading: false,
        messages: res.data.messages,
        chatCount: res.data.messageCount,
      });
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data?.message, "error in fetching chats");
      } else {
        console.error("Failed to fetch chats", error);
      }
    }
  },
}));
