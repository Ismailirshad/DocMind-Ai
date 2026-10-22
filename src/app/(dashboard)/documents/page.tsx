"use client";
import Documents from "@/components/Documents";
import DocumentsSkeleton from "@/components/skeltones/DocumentsSkeleton";
import { chatStore } from "@/store/chatStore";
import { documentStore } from "@/store/documentStore";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { LuFileUp } from "react-icons/lu";

interface IDocumentData {
  title: string;
  category: string;
  file: File | null;
}

export default function DocumentsPage() {
  const [documentData, setDocumentData] = useState<IDocumentData>({
    title: "",
    category: "",
    file: null,
  });
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [searchDoc, setSearchDoc] = useState("");

  const {
    uploadDocument,
    loading,
    uploading,
    documentCount,
    fetchDocuments,
    documents,
    indexedPages,
    categories,
  } = documentStore();

  const { chatCount } = chatStore();
  const { user, loading: userLoading } = userStore();

  const router = useRouter();

  useEffect(() => {
    if (!userLoading && user) {
      fetchDocuments();
    }
  }, [userLoading, user, fetchDocuments]);

  const handleUpload = async () => {
    if (!documentData.title || !documentData.category || !documentData.file) {
      toast.error("Please fill all the fileds");
      return;
    }

    const formData = new FormData();
    formData.append("title", documentData.title);
    formData.append("category", documentData.category);
    formData.append("file", documentData.file);
    const document = await uploadDocument(formData);

    if (!document) {
      toast.error("Failed to upload document");
      return;
    }

    setDocumentData({
      title: "",
      category: "",
      file: null,
    });

    router.push(`/?documentId=${document._id}`);
  };

  const searchDocument = documents.filter((doc) => {
    return doc.title.toLowerCase().includes(searchDoc.toLowerCase());
  });

  const displayDocuments = searchDoc ? searchDocument : documents;

  if (loading) return <DocumentsSkeleton />;
  return (
    <main className="min-h-screen w-full max-w-7xl px-6 py-6 mx-auto text-white text-sm bg-black md:text-base lg:px-8">
      {/* Header */}
      <div className="mb-10 px-10 sm:px-18 lg:px-0">
        <h1 className="text-2xl font-bold sm:text-4xl">Documents</h1>
        <p className="mt-2 text-sm text-zinc-400 sm:text-base">
          Upload, organize, and explore your documents with AI
        </p>
      </div>

      {/* Search */}
      <div className="w-full max-w-2xl mb-8 relative">
        <span className="text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2">
          🔍
        </span>

        <input
          type="text"
          value={searchDoc}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchDoc(e.target.value)
          }
          placeholder="Search documents..."
          className="w-full pl-12 pr-4 py-3 text-sm bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500 sm:py-4 md:text-base"
        />
      </div>

      {!searchDoc && (
        <>
          <div className="p-4 mb-10 bg-zinc-950 border-2 border-dashed border-zinc-700 rounded-3xl hover:border-blue-500 transition sm:p-6 lg:p-8">
            <input
              id="pdf-upload"
              type="file"
              accept=".pdf"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDocumentData({
                  ...documentData,
                  file: e.target.files?.[0] ?? null,
                })
              }
              className="hidden"
            />

            <label
              htmlFor="pdf-upload"
              className="flex flex-col mt-8 px-4 py-10 bg-zinc-900/60 rounded-2xl border-2 border-dashed border-zinc-700 cursor-pointer items-center justify-center transition hover:border-blue-500 hover:bg-zinc-900"
            >
              <div className="flex h-16 w-16 text-blue-500 bg-blue-600/15 rounded-2xl items-center justify-center">
                <LuFileUp size={34} />
              </div>

              <h3 className="mt-4 text-lg font-semibold">
                Click to upload PDF
              </h3>

              <p className="mt-1 text-sm text-zinc-400">
                Drag & drop or browse your files
              </p>

              <span className="mt-3 px-4 py-1 text-xs text-zinc-400 bg-zinc-800 rounded-full">
                PDF only
              </span>
            </label>

            {/* Selected File */}
            {documentData.file && (
              <div className="flex mt-4 items-center justify-center gap-3">
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
            <div className="grid grid-cols-1 max-w-2xl py-4 mx-auto gap-4 lg:grid-cols-2 xl:grid-cols-3">
              <input
                type="text"
                placeholder="Document Title"
                value={documentData.title}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setDocumentData({
                    ...documentData,
                    title: e.target.value,
                  })
                }
                className="w-64 mx-auto px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl outline-none focus:border-blue-500 lg:w-auto"
              />

              {!showNewCategory && (
                <select
                  value={documentData.category}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    if (e.target.value === "custom") {
                      setShowNewCategory(true);

                      setDocumentData({
                        ...documentData,
                        category: "",
                      });
                      return;
                    }
                    setDocumentData({
                      ...documentData,
                      category: e.target.value,
                    });
                  }}
                  className="w-64 mx-auto px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl outline-none focus:border-blue-500 lg:w-auto"
                >
                  <option value="">Category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}

                  <option value="custom">+ New Category</option>
                </select>
              )}
              {showNewCategory && (
                <input
                  value={documentData.category}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setDocumentData({
                      ...documentData,
                      category: e.target.value,
                    })
                  }
                  placeholder="Category Name"
                  className="w-64 mx-auto px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-xl outline-none focus:border-blue-500"
                />
              )}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-64 mx-auto px-6 py-3 font-medium bg-blue-600 rounded-xl hover:bg-blue-700 disabled:bg-zinc-700 transition md:col-span-2 lg:w-auto xl:col-span-1"
              >
                {uploading ? "⏳ Uploading..." : "Upload"}
              </button>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-2 mx-auto mb-10 gap-4 sm:grid-cols-3 lg:grid-cols-3">
            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Documents</p>
                  <h2 className="text-3xl font-bold">{documentCount}</h2>
                </div>

                <div className="text-3xl">📄</div>
              </div>
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">Pages Indexed</p>
                  <h2 className="text-3xl font-bold">{indexedPages}</h2>
                </div>

                <div className="text-3xl">📚</div>
              </div>
            </div>

            <div className="p-4 bg-zinc-900 border border-zinc-800 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-zinc-400">AI Chats</p>
                  <h2 className="text-3xl font-bold">{chatCount}</h2>
                </div>

                <div className="text-3xl">💬</div>
              </div>
            </div>
          </div> */}
          <div
            className="
    grid
    grid-cols-1
    sm:grid-cols-3
    gap-4
    sm:gap-5
    lg:gap-6
    mx-auto
    mb-10
  "
          >
            {/* Documents */}
            <div
              className="
      group relative overflow-hidden
      rounded-2xl
      border border-zinc-800/80
      bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
      p-5 sm:p-6
      shadow-lg shadow-black/10
      transition-all duration-300
      hover:-translate-y-1
      hover:border-blue-500/40
      hover:shadow-xl hover:shadow-blue-500/5
    "
            >
              {/* Glow */}
              <div
                className="
        pointer-events-none absolute
        -right-10 -top-10
        h-28 w-28
        rounded-full
        bg-blue-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-blue-500/20
      "
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-400">Documents</p>

                  <h2
                    className="
            mt-2
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-zinc-100
          "
                  >
                    {documentCount}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    Uploaded documents
                  </p>
                </div>

                {/* Icon */}
                <div
                  className="
          flex h-12 w-12 sm:h-14 sm:w-14
          items-center justify-center
          rounded-xl
          border border-blue-500/20
          bg-blue-500/10
          text-blue-400
          transition-transform duration-300
          group-hover:scale-105
        "
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                      d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                      d="M14 2v6h6M8 13h8M8 17h5"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
            </div>

            {/* Pages Indexed */}
            <div
              className="
      group relative overflow-hidden
      rounded-2xl
      border border-zinc-800/80
      bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
      p-5 sm:p-6
      shadow-lg shadow-black/10
      transition-all duration-300
      hover:-translate-y-1
      hover:border-emerald-500/40
      hover:shadow-xl hover:shadow-emerald-500/5
    "
            >
              {/* Glow */}
              <div
                className="
        pointer-events-none absolute
        -right-10 -top-10
        h-28 w-28
        rounded-full
        bg-emerald-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-emerald-500/20
      "
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-400">
                    Pages Indexed
                  </p>

                  <h2
                    className="
            mt-2
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-zinc-100
          "
                  >
                    {indexedPages}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    Pages processed by AI
                  </p>
                </div>

                {/* Icon */}
                <div
                  className="
          flex h-12 w-12 sm:h-14 sm:w-14
          items-center justify-center
          rounded-xl
          border border-emerald-500/20
          bg-emerald-500/10
          text-emerald-400
          transition-transform duration-300
          group-hover:scale-105
        "
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                      d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                      d="M8 8h8M8 12h8M8 16h5"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
            </div>

            {/* AI Chats */}
            <div
              className="
      group relative overflow-hidden
      rounded-2xl
      border border-zinc-800/80
      bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
      p-5 sm:p-6
      shadow-lg shadow-black/10
      transition-all duration-300
      hover:-translate-y-1
      hover:border-violet-500/40
      hover:shadow-xl hover:shadow-violet-500/5
    "
            >
              {/* Glow */}
              <div
                className="
        pointer-events-none absolute
        -right-10 -top-10
        h-28 w-28
        rounded-full
        bg-violet-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-violet-500/20
      "
              />

              <div className="relative flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-zinc-400">AI Chats</p>

                  <h2
                    className="
            mt-2
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-zinc-100
          "
                  >
                    {chatCount}
                  </h2>

                  <p className="mt-1 text-xs text-zinc-500">
                    Conversations with AI
                  </p>
                </div>

                {/* Icon */}
                <div
                  className="
          flex h-12 w-12 sm:h-14 sm:w-14
          items-center justify-center
          rounded-xl
          border border-violet-500/20
          bg-violet-500/10
          text-violet-400
          transition-transform duration-300
          group-hover:scale-105
        "
                >
                  <svg
                    className="h-6 w-6 sm:h-7 sm:w-7"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.7"
                      d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeWidth="1.7"
                      d="M8 11h.01M12 11h.01M16 11h.01"
                    />
                  </svg>
                </div>
              </div>

              {/* Bottom accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-500 group-hover:w-full" />
            </div>
          </div>
        </>
      )}

      {/* Documents */}
      <div>
        <div className="flex mb-5 items-center justify-between">
          <h2 className="text-2xl font-semibold">Recent Documents</h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
          {!loading && displayDocuments.length === 0 ? (
            <div className="flex flex-col py-16 bg-zinc-900 border border-zinc-800 rounded-2xl col-span-full items-center justify-center">
              <div className="mb-4 text-6xl">🔍</div>

              <h2 className="text-2xl font-semibold">
                {searchDoc ? "No documents found" : "No documents yet"}
              </h2>

              <p className="mt-2 text-zinc-400 text-center">
                {searchDoc
                  ? `No documents match "${searchDoc}".`
                  : "Upload your first PDF document to get started."}
              </p>
            </div>
          ) : (
            displayDocuments.map((doc) => <Documents key={doc._id} doc={doc} />)
          )}
        </div>
      </div>
    </main>
  );
}
