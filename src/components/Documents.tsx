import Link from "next/link";
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
    <div className="p-5 bg-zinc-900 border border-zinc-800 rounded-2xl hover:border-blue-500 transition">
      <div className="flex items-center justify-between">
        <span className="text-4xl">📄</span>

        <span className="px-3 py-1 text-xs text-blue-400 bg-blue-500/20 rounded-full">
          PDF
        </span>
      </div>

      <h3 className="mt-4 font-semibold text-lg truncate">{doc.title}</h3>

      <div className="mt-4 space-y-1 text-sm text-zinc-400">
        <p>{doc.pageCount} Pages</p>
        <p>{new Date(doc?.createdAt).toLocaleDateString()}</p>
      </div>

      <div className="flex mt-5 gap-2">
        <Link
          href={`/?documentId=${doc._id}`}
          className="flex-1 py-2 px-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          💬 Chat
        </Link>

        <button
          onClick={() => handleView(doc)}
          className="flex-1 py-2 bg-zinc-800 rounded-lg hover:bg-zinc-700"
        >
          👁 View
        </button>

        <PdfViewerModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          document={selectedDocument}
        />
      </div>
    </div>
  );
});

export default Documents;
