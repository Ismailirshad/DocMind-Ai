import api from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const documentStore = create((set) => ({
  document: null,
  loading: false,
  documents: [],

  uploadDocument: async (formData) => {
    set({ loading: true });
    try {
      await api.post("api/document/upload", formData, {
        withCredentials: true,
      });
      console.log("formatda", formData);
      set({ loading: false });
      toast.success("Document uploaded successfully");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
  fetchDocuments: async () => {
    set({ loading: true });
    try {
      const res = await api.get("api/document/fetchdocuments", {
        withCredentials: true,
      });
      console.log("Documents fetched:", res.data);
      set({ loading: false, documents: res.data });
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message);
    }
  },
}));
