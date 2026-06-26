"use client";
import { documentStore } from "@/store/documentStore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function DocumentsPage() {
  const documents = [
    {
      id: 1,
      name: "ERP Agreement.pdf",
      pages: 24,
      uploaded: "2 hours ago",
    },
    {
      id: 2,
      name: "Company Policy.pdf",
      pages: 56,
      uploaded: "Yesterday",
    },
    {
      id: 3,
      name: "Invoice Report.pdf",
      pages: 12,
      uploaded: "3 days ago",
    },
  ];
  const [documentData, setDocumentData] = useState({
    title: "",
    category: "",
    file: null,
  });
  const { uploadDocument, loading } = documentStore();
 const router = useRouter()
  const handleUpload = () => {
    console.log("Component Rendered");
    if (!documentData.title || !documentData.category || !documentData.file) {
      toast.error("Please fill all the fileds");
      return;
    }

    const formData = new FormData();
    formData.append("title", documentData.title);
    formData.append("category", documentData.category);
    formData.append("file", documentData.file);
    uploadDocument(formData);

    setDocumentData({
      title: "",
      category: "",
      file: null,
    });

    router.push('/')
  };

  return (

    <main className="min-h-screen bg-black text-white p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-4xl font-bold">Documents</h1>
        <p className="text-zinc-400 mt-2">
          Upload, organize and chat with your AI knowledge base
        </p>
      </div>

      {/* Search */}
      <div className="relative mb-10 max-w-2xl">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search documents..."
          className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500"
        />
      </div>

      <div className="border-2 border-dashed border-zinc-700 rounded-3xl p-10 mb-10 hover:border-blue-500 transition bg-zinc-950">
        <div className="text-center">
          <div className="text-6xl mb-4">📄</div>

          <h2 className="text-3xl font-bold">Upload Knowledge Base</h2>

          <p className="text-zinc-400 mt-2">
            Upload PDF documents and chat with them using AI
          </p>
        </div>

        {/* File Input */}
        <div className="mt-8 flex justify-center">
          <input
            type="file"
            accept=".pdf"
            onChange={(e) =>
              setDocumentData({
                ...documentData,
                file: e.target.files[0],
              })
            }
            className="bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 w-96"
          />
        </div>

        {/* Selected File */}
        {documentData.file && (
          <div className="mt-4 flex items-center justify-center gap-3">
            <span className="text-2xl">📄</span>

            <div>
              <p className="font-medium">{documentData.file.name}</p>

              <p className="text-xs text-zinc-500">
                {(documentData.file.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        )}

        {/* Form Row */}
        <div className="mt-8 flex items-center gap-4 justify-center">
          <input
            type="text"
            placeholder="Document Title"
            value={documentData.title}
            onChange={(e) =>
              setDocumentData({
                ...documentData,
                title: e.target.value,
              })
            }
            className="w-72 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          />

          <select
            value={documentData.category}
            onChange={(e) =>
              setDocumentData({
                ...documentData,
                category: e.target.value,
              })
            }
            className="w-52 bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-3 outline-none focus:border-blue-500"
          >
            <option value="">Category</option>
            <option value="insurance">Insurance</option>
            <option value="health">Health</option>
            <option value="vehicle">Vehicle</option>
            <option value="billing">Billing</option>
            <option value="custom">+ Create New Category</option>
          </select>

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-700 font-medium transition"
          >
            {loading ? "⏳ Uploading..." : "🚀 Upload"}
          </button>
        </div>
      </div>


    </main>
  );
}
