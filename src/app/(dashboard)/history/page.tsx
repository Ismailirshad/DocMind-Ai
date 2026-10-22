"use client";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import HistorySkeleton from "@/components/skeltones/HistorySkeleton";
import Link from "next/link";
import { chatStore } from "@/store/chatStore";

export default function HistoryPage() {
  const [searchChat, setSearchChat] = useState("");

  const { getHistory, history, documentsCount, loading, chatCount } =
    chatStore();

  useEffect(() => {
    getHistory();
  }, [getHistory]);

  const searchHistory = history.filter((chat) => {
    return chat?._id?.title.toLowerCase().includes(searchChat.toLowerCase());
  });

  const displayHistory = searchChat ? searchHistory : history;

  if (loading) return <HistorySkeleton />;
  return (
    <main className="min-h-screen w-full max-w-7xl px-6 py-6 mx-auto text-white text-sm bg-black md:text-base lg:px-8">
      {/* Header */}
      <div className="mb-10 px-10 sm:px-18 lg:px-0">
        <h1 className="text-2xl font-bold md:text-4xl">Chat History</h1>
        <p className="mt-2 text-zinc-400">
          View and continue conversations with your documents
        </p>
      </div>

      {/* Search */}
      <div className="mb-8">
        <input
          type="text"
          value={searchChat}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchChat(e.target.value)
          }
          placeholder="Search conversations..."
          className="w-full px-4 py-4 bg-zinc-900 border border-zinc-800 rounded-xl outline-none focus:border-blue-500"
        />
      </div>

      {/* Stats */}
      {!loading && !searchChat && (
        <div
          className="
    grid
    grid-cols-1
    sm:grid-cols-3
    gap-4
    sm:gap-5
    mb-8
  "
        >
          {/* Total Chats */}
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
      hover:border-blue-500/40
      hover:shadow-xl hover:shadow-blue-500/5
    "
          >
            <div
              className="
        pointer-events-none absolute
        -right-10 -top-10
        h-24 w-24
        rounded-full
        bg-blue-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-blue-500/20
      "
            />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-medium text-zinc-400">
                  Total Chats
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  {chatCount}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">AI conversations</p>
              </div>

              <div
                className="
          flex h-11 w-11 sm:h-12 sm:w-12 shrink-0
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
                  className="h-5 w-5 sm:h-6 sm:w-6"
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

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-blue-500 transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Total Documents */}
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
      hover:border-emerald-500/40
      hover:shadow-xl hover:shadow-emerald-500/5
    "
          >
            <div
              className="
        pointer-events-none absolute
        -right-10 -top-10
        h-24 w-24
        rounded-full
        bg-emerald-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-emerald-500/20
      "
            />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-medium text-zinc-400">
                  Total Documents
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  {documentsCount}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">Uploaded documents</p>
              </div>

              <div
                className="
          flex h-11 w-11 sm:h-12 sm:w-12 shrink-0
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
                  className="h-5 w-5 sm:h-6 sm:w-6"
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

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-emerald-500 transition-all duration-500 group-hover:w-full" />
          </div>

          {/* Messages */}
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
      hover:border-violet-500/40
      hover:shadow-xl hover:shadow-violet-500/5
    "
          >
            <div
              className="
        pointer-events-none absolute
        -right-10 -top-10
        h-24 w-24
        rounded-full
        bg-violet-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-violet-500/20
      "
            />

            <div className="relative flex items-center justify-between gap-4">
              <div>
                <p className="text-xs sm:text-sm font-medium text-zinc-400">
                  Messages
                </p>

                <h2 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
                  {chatCount * 2}
                </h2>

                <p className="mt-1 text-xs text-zinc-500">
                  Total messages exchanged
                </p>
              </div>

              <div
                className="
          flex h-11 w-11 sm:h-12 sm:w-12 shrink-0
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
                  className="h-5 w-5 sm:h-6 sm:w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M8 10h8M8 14h5"
                  />

                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.7"
                    d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"
                  />
                </svg>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-violet-500 transition-all duration-500 group-hover:w-full" />
          </div>
        </div>
      )}

      {/* History List */}
      <div className="space-y-4">
        {!loading && displayHistory.length === 0 ? (
          <div className="flex flex-col py-16 bg-zinc-900 border border-zinc-800 rounded-2xl items-center justify-center">
            <div className="mb-4 text-6xl">🔍</div>

            <h2 className="text-2xl font-semibold">No history found</h2>

            <p className="mt-2 text-zinc-400">
              No conversations match ""
              <span className="text-white">{searchChat}</span>
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
            {displayHistory?.map((chat, index) => (
              <div
                key={index}
                className="
    group relative overflow-hidden
    rounded-2xl
    border border-zinc-800/80
    bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
    p-5
    shadow-lg shadow-black/10
    transition-all duration-300
    hover:-translate-y-1
    hover:border-blue-500/40
    hover:shadow-xl hover:shadow-blue-500/5
  "
              >
                {/* Subtle background glow */}
                <div
                  className="
      pointer-events-none absolute
      -right-16 -top-16
      h-32 w-32
      rounded-full
      bg-blue-500/10
      blur-3xl
      transition-all duration-500
      group-hover:bg-blue-500/20
    "
                />

                {/* Header */}
                <div className="relative flex items-start justify-between gap-4">
                  {/* Document icon */}
                  <div
                    className="
        flex h-11 w-11 shrink-0
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
                      className="h-5 w-5"
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

                  {/* Chat indicator */}
                  <span
                    className="
        inline-flex items-center gap-1.5
        rounded-full
        border border-violet-500/20
        bg-violet-500/10
        px-2.5 py-1
        text-[11px] font-medium
        text-violet-400
      "
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                    AI Chat
                  </span>
                </div>

                {/* Document title */}
                <div className="relative mt-5">
                  <h2
                    className="
        line-clamp-2
        min-h-[3.5rem]
        text-lg font-semibold
        leading-7
        text-zinc-100
        transition-colors
        group-hover:text-white
      "
                    title={chat?._id?.title}
                  >
                    {chat?._id?.title}
                  </h2>
                </div>

                {/* Metadata */}
                <div className="relative mt-4 space-y-2.5">
                  {/* Messages */}
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <svg
                      className="h-4 w-4 text-zinc-500"
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
                    </svg>

                    <span>
                      {chat?.chatCount * 2}{" "}
                      {chat?.chatCount * 2 === 1 ? "message" : "messages"}
                    </span>
                  </div>

                  {/* Last activity */}
                  <div className="flex items-center gap-2 text-sm text-zinc-500">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M12 6v6l4 2"
                      />

                      <circle cx="12" cy="12" r="9" strokeWidth="1.7" />
                    </svg>

                    <span>
                      {chat.lastChat
                        ? formatDistanceToNow(new Date(chat.lastChat), {
                            addSuffix: true,
                          })
                        : "No activity yet"}
                    </span>
                  </div>
                </div>

                {/* Divider */}
                <div className="relative my-5 h-px bg-zinc-800/80" />

                {/* Continue button */}
                <Link
                  href={`/?documentId=${chat._id._id}`}
                  className="
      group/button
      relative flex w-full
      items-center justify-center gap-2
      overflow-hidden
      rounded-xl
      border border-blue-500/20
      bg-blue-600/90
      px-4 py-2.5
      text-sm font-medium
      text-white
      shadow-lg shadow-blue-500/10
      transition-all duration-300
      hover:bg-blue-500
      hover:shadow-xl hover:shadow-blue-500/20
      active:scale-[0.98]
    "
                >
                  <span>Continue Chat</span>

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
                </Link>

                {/* Bottom accent */}
                <div
                  className="
      absolute bottom-0 left-0
      h-[2px] w-0
      bg-blue-500
      transition-all duration-500
      group-hover:w-full
    "
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Empty State Example */}
      <div className="hidden flex-col py-32 items-center justify-center">
        <div className="mb-5 text-7xl">💬</div>

        <h2 className="text-2xl font-semibold">No conversations yet</h2>

        <p className="mt-3 text-zinc-400">
          Upload a document and start chatting with AI.
        </p>
      </div>
    </main>
  );
}
