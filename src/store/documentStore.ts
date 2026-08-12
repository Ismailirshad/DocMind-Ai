import api from "@/lib/axios";
import { IDocument } from "@/models/Document";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface DocumentStore {
  document: Document | null;
  loading: boolean;
  documents: Document[];
  documentCount: number;
  indexedPages: number;
  categories: string[];

  uploadDocument: (FormData: FormData) => Promise<void>;
  fetchDocuments: () => Promise<void>;
}

interface Document {
  _id: string;
  title: string;
  category: string;
  pdfUrl: string;
  pageCount: number;
  createdAt: string;
}

interface IUploadDocumentRes {
  document: Document;
}
interface IFetchDocumentsRes {
  documents: Document[];
  docCounts: number;
  indexedPages: number;
  categories: string[];
}

export const documentStore = create<DocumentStore>((set, get) => ({
  document: null,
  loading: true,
  documents: [],
  documentCount: 0,
  indexedPages: 0,
  categories: [],

  uploadDocument: async (formData) => {
    set({ loading: true });
    try {
      const res = await api.post<IUploadDocumentRes>(
        "api/document/upload",
        formData,
        {
          withCredentials: true,
        },
      );
      set((state) => ({
        documents: [...state.documents, res.data.document],
      }));
      set({ loading: false });
      toast.success("Document uploaded successfully");
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message);
        console.log(
          error.response?.data?.message,
          "error in uploading documents",
        );
      } else {
        console.error("Failed to uploading documents", error);
      }
    }
  },
  fetchDocuments: async () => {
    set({ loading: true });
    try {
      const res = await api.get<IFetchDocumentsRes>(
        "api/document/fetchdocuments",
        {
          withCredentials: true,
        },
      );
      set({
        loading: false,
        documents: res.data.documents,
        documentCount: res.data.docCounts,
        indexedPages: res.data.indexedPages,
        categories: res.data.categories,
      });
    } catch (error) {
      set({ loading: false });
      if (axios.isAxiosError(error)) {
        console.log(
          error.response?.data?.message,
          "error in fetching documents",
        );
      } else {
        console.error("Failed to fetch documents", error);
      }
    }
  },
}));
