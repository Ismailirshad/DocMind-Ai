import { memo, useState } from "react";
import PdfViewerModal from "./PdfViewerModal";

export interface IDocumentCard {
  _id: string;
  title: string;
  category: string;
  pdfUrl: string;
  pageCount: number;
  createdAt: string;
}
interface DocumentProps {
  doc: IDocumentCard;
}

const Documents = memo(function Documents({ doc }: DocumentProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] =
    useState<IDocumentCard | null>(null);

  const handleView = (doc: IDocumentCard) => {
    setSelectedDocument(doc);
    setIsOpen(true);
  };

  return (
    <>
      <div
        className="
    group relative overflow-hidden
    rounded-2xl
    border border-zinc-800/80
    bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
    p-5
    shadow-lg shadow-black/10
    transition-all duration-300
    hover:-translate-y-1
    hover:border-blue-500/50
    hover:shadow-xl hover:shadow-blue-500/5
  "
      >
        {/* Subtle glow */}
        <div
          className="
      pointer-events-none absolute -right-16 -top-16
      h-32 w-32 rounded-full
      bg-blue-500/10 blur-3xl
      transition-all duration-500
      group-hover:bg-blue-500/20
    "
        />

        {/* Header */}
        <div className="relative flex items-start justify-between">
          {/* PDF Icon */}
          <div
            className="
        flex h-12 w-12 items-center justify-center
        rounded-xl
        border border-zinc-700/70
        bg-zinc-800/80
        shadow-inner
        transition-transform duration-300
        group-hover:scale-105
      "
          >
            <svg
              className="h-6 w-6 text-red-400"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z" />
              <path
                d="M14 2v6h6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <text x="6.5" y="18" fontSize="5" fontWeight="700" fill="white">
                PDF
              </text>
            </svg>
          </div>

          {/* File type */}
          <span
            className="
        rounded-full
        border border-blue-500/20
        bg-blue-500/10
        px-3 py-1
        text-[11px] font-medium
        tracking-wide text-blue-400
      "
          >
            PDF
          </span>
        </div>

        {/* Title */}
        <div className="relative mt-5">
          <h3
            className="
        truncate
        text-base font-semibold
        text-zinc-100
        transition-colors
        group-hover:text-white
      "
            title={doc.title}
          >
            {doc.title}
          </h3>

          <p className="mt-1 text-xs text-zinc-500">PDF Document</p>
        </div>

        {/* Metadata */}
        <div className="relative mt-5 flex flex-wrap gap-2">
          <div
            className="
        inline-flex items-center gap-1.5
        rounded-lg
        border border-zinc-800
        bg-zinc-800/50
        px-2.5 py-1.5
        text-xs text-zinc-400
      "
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V5a2 2 0 00-2-2z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7h8M8 11h8M8 15h5"
              />
            </svg>
            {doc.pageCount} {doc.pageCount === 1 ? "Page" : "Pages"}
          </div>

          <div
            className="
        inline-flex items-center gap-1.5
        rounded-lg
        border border-zinc-800
        bg-zinc-800/50
        px-2.5 py-1.5
        text-xs text-zinc-400
      "
          >
            <svg
              className="h-3.5 w-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>

            {new Date(doc.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-zinc-800/80" />
        {/* Action */}
        <button
          onClick={() => handleView(doc)}
          className="
      group/button
      relative flex w-full items-center justify-center gap-2
      overflow-hidden
      rounded-xl
      border border-zinc-700
      bg-zinc-800/80
      px-4 py-2.5
      text-sm font-medium text-zinc-200
      transition-all duration-300

      hover:border-blue-500/40
      hover:bg-blue-500/10
      hover:text-blue-400

      active:scale-[0.98]
    "
        >
          <span>View Document</span>

          <svg
            className="
        h-4 w-4
        transition-transform duration-300
        group-hover/button:translate-x-1
      "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <PdfViewerModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        document={selectedDocument}
      />
    </>
  );
});

export default Documents;
