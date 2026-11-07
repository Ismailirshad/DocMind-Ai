import api from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

interface DocumentStore {
  document: Document | null;
  loading: boolean;
  uploading: boolean;
  hasFetched: boolean;
  documents: Document[];
  documentCount: number;
  indexedPages: number;
  categories: string[];

  uploadDocument: (FormData: FormData) => Promise<Document | undefined>;
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
  uploading: false,
  hasFetched: false,
  documents: [],
  documentCount: 0,
  indexedPages: 0,
  categories: [],

  uploadDocument: async (formData) => {
    set({ uploading: true, hasFetched: false, });
    try {
      const res = await api.post<IUploadDocumentRes>(
        "/api/document/upload",
        formData,
        {
          withCredentials: true,
        },
      );
      set((state) => ({
        documents: [...state.documents, res.data.document],
      }));
      set({ uploading: false, hasFetched: true });
      toast.success("Document uploaded successfully");

      return res.data.document;
    } catch (error) {
      set({ uploading: false, hasFetched: true });
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
    const { hasFetched } = get();

    if (hasFetched) {
      set({ loading: false })
      return
    }
    try {
      const res = await api.get<IFetchDocumentsRes>(
        "/api/document/fetchdocuments",
        {
          withCredentials: true,
        },
      );
      set({
        loading: false,
        hasFetched: true,
        documents: res.data.documents,
        documentCount: res.data.docCounts,
        indexedPages: res.data.indexedPages,
        categories: res.data.categories,
      });
    } catch (error) {
      set({ loading: false, hasFetched: true, });
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
