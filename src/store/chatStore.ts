import api from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const chatStore = create((set) => ({
  loading: false,
  messages: [],

  askAi: async (question, documentId) => {
    set({ loading: true });
    try {
      const res = await api.post(
        "/api/chat/chat",
        { question, documentId },
        { withCredentials: true },
      );
      set((state) => ({
        loading: false,
        messages: [...state.messages, res.data.chat],
      }));
      console.log(res.data, "jkkkkkk");

      return res.data;
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
  getChats: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/api/chat/getchat", { withCredentials: true });
      set({ loading: false, messages: res.data.messages });
      console.log(res.data.messages, "messge fteched array");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
}));
