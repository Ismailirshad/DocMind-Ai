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
  loadingOlder: boolean;
  hasMore: boolean;
  currentPage: number;
  askAi: (question: string, documentId: string | null) => Promise<void>;
  getChats: (documentId?: string | null, page?: number,
    loadMore?: boolean,) => Promise<void>;
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
  isPending?: boolean;
  error?: string;
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
  hasMore: boolean;
  currentPage: number;
}
export interface HistoryDocument {
  _id: string;
  title: string;
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
  loadingOlder: false,
  hasMore: true,
  currentPage: 1,

  askAi: async (question, documentId) => {
    const tempId = crypto.randomUUID();

    // 1. Immediately display the user's question.
    const tempMessage: Message = {
      _id: tempId,
      user: "",
      question,
      answer: "",
      document: {
        _id: documentId || "",
        title: "",
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPending: true,
    };

    set((state) => ({
      sending: true,
      messages: [...state.messages, tempMessage],
    }));

    try {
      // 2. Send the question to the backend.
      const res = await api.post<IAskAiResponse>(
        "/api/chat/chat",
        { question, documentId },
        { withCredentials: true },
      );

      // 3. Replace temporary message with the actual saved message.
      set((state) => ({
        sending: false,
        messages: state.messages.map((message) =>
          message._id === tempId ? res.data.chat : message,
        ),
      }));
    } catch (error) {
      // 4. Keep the question and display an error.
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to generate response."
        : "Something went wrong. Please try again.";

      set((state) => ({
        sending: false,
        messages: state.messages.map((message) =>
          message._id === tempId
            ? {
              ...message,
              isPending: false,
              error: errorMessage,
            }
            : message,
        ),
      }));
    }
  },
  getChats: async (documentId, page = 1, loadMore = false) => {
    set({ loading: !loadMore, loadingOlder: loadMore });
    try {
      const res = await api.get<IGetChatsResponse>("/api/chat/getchat", {
        params: documentId ? { documentId, page } : { page },
        withCredentials: true,
      });
      set((state) => ({
        loading: false,
        loadingOlder: false,

        messages: loadMore
          ? [...res.data.messages, ...state.messages]
          : res.data.messages,

        chatCount: res.data.messageCount,
        hasMore: res.data.hasMore,
        currentPage: res.data.currentPage,
      }));
    } catch (error) {
      set({
        loading: false,
        loadingOlder: false,
      });
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
      const res = await api.get<IHistoryRes>("/api/history", {
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
