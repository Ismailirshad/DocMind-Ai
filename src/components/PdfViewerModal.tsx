"use client";

import { LuDownload, LuX } from "react-icons/lu";

interface IDocument {
  title: string;
  pageCount: number;
  createdAt: string;
  pdfUrl: string;
}

interface IPdfViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  document: IDocument | null;
}

export default function PdfViewerModal({
  isOpen,
  onClose,
  document,
}: IPdfViewerModalProps) {
  if (!isOpen || !document) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center">
      <div className="w-[95vw] h-[92vh] bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
          <div>
            <h2 className="text-lg font-semibold text-white">
              {document.title}
            </h2>

            <p className="text-sm text-zinc-400">
              {document.pageCount} Pages •{" "}
              {new Date(document.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <a
              href={document.pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-zinc-800 transition"
            >
              <LuDownload size={20} />
            </a>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-red-600 transition"
            >
              <LuX size={20} />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className={isOpen ? "block h-[80vh]" : "hidden"}>
          <iframe src={document.pdfUrl} className="w-full h-full border-0" />
        </div>
      </div>
    </div>
  );
}
