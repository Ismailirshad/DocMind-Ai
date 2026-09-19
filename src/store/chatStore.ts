import api from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface ChatStore {
  loading: boolean;
  sending: boolean;
  messages: Message[];
  chatCount: number;
  history: History[];
  documentsCount: number;
  askAi: (question: string, documentId: string | null) => Promise<void>;
  getChats: (documentId?: string | null) => Promise<void>;
  getHistory: () => Promise<void>;
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
interface IAskAiResponse {
  chat: Message;
}
interface IGetChatsResponse {
  messages: Message[];
  messageCount: number;
}
export interface HistoryDocument {
  _id: string;
  user: string;
  title: string;
  category: string;
  pdfUrl: string;
  pageCount: number;
  extractedText: string;
  createdAt: string;
  updatedAt: string;
}

export interface History {
  chatCount: number;
  lastChat: string;
  _id: HistoryDocument;
}

interface IHistoryRes {
  chatCounts: number;
  history: History[];
  documentCounts: number;
}

export const chatStore = create<ChatStore>((set) => ({
  loading: true,
  sending: false,
  messages: [],
  chatCount: 0,
  history: [],
  documentsCount: 0,
  askAi: async (question, documentId) => {
    set({ sending: true });
    try {
      const res = await api.post<IAskAiResponse>(
        "api/chat/chat",
        { question, documentId },
        { withCredentials: true },
      );
      set((state) => ({
        sending: false,
        messages: [...state.messages, res.data.chat],
      }));
    } catch (error) {
      set({ sending: false });

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
  getHistory: async () => {
    set({ loading: true });
    try {
      const res = await api.get<IHistoryRes>("api/history", {
        withCredentials: true,
      });
      set({
        loading: false,
        history: res.data.history,
        chatCount: res.data.chatCounts,
        documentsCount: res.data.documentCounts,
      });
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Failed to fetch history");
      } else {
        console.error("Failed to fetch history:", error);
      }
    }
  },
}));
