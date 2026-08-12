"use client";
import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import HistorySkeleton from "@/components/skeltones/HistorySkeleton";

interface IHistoryRes {
  chatCounts: number;
  history: History[];
  documentCounts: number;
}
interface History {
  chatCount: number;
  lastChat: string;
  _id: Document;
}
interface Document {
  _id: string;
  user: string;
  title: string;
  category: string;
  pdfUrl: string;
  pageCount: number;
  extractedText: string;
  createdAt: string;
  updatedAt: string;
}

export default function HistoryPage() {
  const [history, setHistory] = useState<History[]>([]);
  const [chatCount, setChatCount] = useState(0);
  const [documentsCount, setDocumentsCount] = useState(0);
  const [searchChat, setSearchChat] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true);
      const res = await api.get<IHistoryRes>("api/history", {
        withCredentials: true,
      });
      setHistory(res.data.history);
      setChatCount(res.data.chatCounts);
      setDocumentsCount(res.data.documentCounts);
      setLoading(false);
    };
    fetchHistory();
  }, []);

  const searchHistory = history.filter((chat) => {
    return chat?._id?.title.toLowerCase().includes(searchChat.toLowerCase());
  });

  const displayHistory = searchChat ? searchHistory : history;

  if (loading) return <HistorySkeleton />;
  return (
    <main
      className="
        min-h-screen w-full max-w-7xl
        px-6 py-6 mx-auto
        text-white text-sm
        bg-black
        md:text-base
        lg:px-8
      "
    >
      {/* Header */}
      <div
        className="
          mb-10 px-10
          sm:px-18
          lg:px-0
        "
      >
        <h1
          className="
            text-2xl font-bold
            md:text-4xl
          "
        >
          Chat History
        </h1>
        <p
          className="
            mt-2
            text-zinc-400
          "
        >
          View and continue conversations with your documents
        </p>
      </div>

      {/* Search */}
      <div
        className="
          mb-8
        "
      >
        <input
          type="text"
          value={searchChat}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchChat(e.target.value)
          }
          placeholder="Search conversations..."
          className="
            w-full
            px-4 py-4
            bg-zinc-900
            border border-zinc-800 rounded-xl
            outline-none focus:border-blue-500
          "
        />
      </div>

      {/* Stats */}
      {!loading && !searchChat && (
        <div
          className="
            grid grid-cols-2
            mb-8
            gap-3
            sm:grid-cols-3
          "
        >
          <div
            className="
              p-3
              bg-zinc-900
              border border-zinc-800 rounded-xl
              sm:p-5
            "
          >
            <p
              className="
                text-zinc-400 text-xs
                sm:text-sm
              "
            >
              Total Chats
            </p>
            <h2
              className="
                mt-2
                text-xl font-bold
                sm:text-3xl
              "
            >
              {chatCount}
            </h2>
          </div>

          <div
            className="
              p-3
              bg-zinc-900
              border border-zinc-800 rounded-xl
              sm:p-5
            "
          >
            <p
              className="
                text-zinc-400 text-xs
                sm:text-sm
              "
            >
              Total Documents
            </p>
            <h2
              className="
                mt-2
                text-xl font-bold
                sm:text-3xl
              "
            >
              {documentsCount}
            </h2>
          </div>

          <div
            className="
              p-3
              bg-zinc-900
              border border-zinc-800 rounded-xl
              sm:p-5
            "
          >
            <p
              className="
                text-zinc-400 text-xs
                sm:text-sm
              "
            >
              Messages
            </p>
            <h2
              className="
                mt-2
                text-xl font-bold
                sm:text-3xl
              "
            >
              {chatCount * 2}
            </h2>
          </div>
        </div>
      )}

      {/* History List */}
      <div
        className="
          space-y-4
        "
      >
        {!loading && displayHistory.length === 0 ? (
          <div
            className="
              flex flex-col
              py-16
              bg-zinc-900
              border border-zinc-800 rounded-2xl
              items-center justify-center
            "
          >
            <div
              className="
                mb-4
                text-6xl
              "
            >
              🔍
            </div>

            <h2
              className="
                text-2xl font-semibold
              "
            >
              No history found
            </h2>

            <p
              className="
                mt-2
                text-zinc-400
              "
            >
              No conversations match ""
              <span
                className="
                  text-white
                "
              >
                {searchChat}
              </span>
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              gap-5
              sm:grid-cols-2
              md:grid-cols-3
            "
          >
            {displayHistory?.map((chat, index) => (
              <div
                key={index}
                className="
                  p-5
                  bg-zinc-900
                  border border-zinc-800 rounded-2xl
                  hover:border-blue-500 transition
                "
              >
                <div
                  className="
                    mt-3 p-4
                    gap-4 justify-between items-center
                  "
                >
                  <div
                    className="
                      flex
                      items-start
                    "
                  >
                    <p
                      className="
                        mt-1
                        text-zinc-400
                      "
                    >
                      📄
                    </p>
                    <h2
                      className="
                        font-semibold text-lg
                      "
                    >
                      {chat?._id?.title}
                    </h2>
                  </div>

                  <div
                    className="
                      flex
                      py-3
                      text-sm text-zinc-500
                      gap-4
                    "
                  >
                    <span>{chat?.chatCount * 2} messages</span>
                    <span>
                      {chat.lastChat
                        ? formatDistanceToNow(new Date(chat.lastChat), {
                            addSuffix: true,
                          })
                        : "00-00-0000"}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      gap-3
                    "
                  >
                    <button
                      className="
                        px-4 py-2
                        bg-blue-600
                        rounded-lg
                        hover:bg-blue-700
                      "
                    >
                      Continue
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State Example */}
      <div
        className="
          hidden flex-col
          py-32
          items-center justify-center
        "
      >
        <div
          className="
            mb-5
            text-7xl
          "
        >
          💬
        </div>

        <h2
          className="
            text-2xl font-semibold
          "
        >
          No conversations yet
        </h2>

        <p
          className="
            mt-3
            text-zinc-400
          "
        >
          Upload a document and start chatting with AI.
        </p>
      </div>
    </main>
  );
}
