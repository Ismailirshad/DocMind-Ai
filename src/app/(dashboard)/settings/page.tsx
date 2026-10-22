"use client";

import SettingsSkeleton from "@/components/skeltones/SettingsSkeleton";
import { chatStore } from "@/store/chatStore";
import { documentStore } from "@/store/documentStore";
import { userStore } from "@/store/userStore";
import { useEffect } from "react";

export default function SettingsPage() {
  const { user, loading: UserLoading } = userStore();
  const {
    fetchDocuments,
    documentCount,
    indexedPages,
    loading: DocumentLoading,
  } = documentStore();
  const { getChats, chatCount, loading: ChatLoading } = chatStore();

  const loading = DocumentLoading || ChatLoading || UserLoading;

  useEffect(() => {
    if (!UserLoading && user) {
      fetchDocuments();
      getChats();
    }
  }, [UserLoading, user, fetchDocuments, getChats]);

  if (loading) return <SettingsSkeleton />;
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
          md:px-18
          lg:px-0
        "
      >
        <h1
          className="
            text-2xl font-bold text-white
            md:text-4xl
          "
        >
          Settings
        </h1>

        <p
          className="
            mt-2
            text-sm text-zinc-400
            md:text-base
          "
        >
          Detailed view of your DocMind AI workspace.
        </p>
      </div>

      {/* Profile Card */}
      <div
        className="
          relative
        "
      >
        {/* Background Glow */}
        <div
          className="
            bg-gradient-to-r from-blue-500/20 via-cyan-500/20 to-indigo-500/20
            rounded-3xl
            absolute -inset-1 blur-3xl
          "
        ></div>

        <div
          className="
            overflow-hidden
            bg-zinc-950
            rounded-3xl border border-zinc-800
            relative
          "
        >
          {/* Gradient Header */}
          <div
            className="
              p-5
              bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600
              md:p-10
            "
          >
            <div
              className="
                flex
                justify-between items-start
              "
            >
              <div
                className="
                  flex
                  items-center gap-6
                "
              >
                {/* Avatar */}
                <div
                  className="
                    flex
                    h-12 w-12
                    text-5xl font-bold text-white
                    bg-white/10
                    rounded-full
                    shadow-xl
                    backdrop-blur items-center justify-center ring-4 ring-white/20
                    md:h-28 md:w-28
                  "
                >
                  {user?.name?.[0]?.toUpperCase()}
                </div>

                <div>
                  <h2
                    className="
                      text-xl font-bold text-white
                      md:text-3xl
                    "
                  >
                    {user?.name}
                  </h2>

                  <p
                    className="
                      mt-2
                      text-xs text-white/80
                      md:text-base
                    "
                  >
                    {user?.email}
                  </p>

                  <span
                    className="
                      inline-flex
                      mt-5 px-2 py-1
                      text-xs text-white
                      bg-white/10
                      rounded-full
                      items-center gap-2 backdrop-blur
                      md:px-4 md:py-2 md:sm
                    "
                  >
                    <span
                      className="
                        h-2 w-2
                        bg-green-400
                        rounded-full
                        animate-pulse
                      "
                    ></span>
                    Active Workspace
                  </span>
                </div>
              </div>

              <div
                className="
                  text-right
                "
              >
                <p
                  className="
                    text-xs text-white/60
                    md:text-sm
                  "
                >
                  AI Powered
                </p>

                <h2
                  className="
                    text-xl font-bold text-white
                    md:text-2xl
                  "
                >
                  DocMind AI
                </h2>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div
            className="
              p-8
            "
          >
            <h2
              className="
                mb-6
                text-base font-semibold text-white
                md:text-xl
              "
            >
              Account Overview
            </h2>

            <div
              className="
    grid
    grid-cols-1
    sm:grid-cols-3
    gap-4
    sm:gap-5
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
        h-24 w-24
        rounded-full
        bg-blue-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-blue-500/20
      "
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-400">
                      Documents
                    </p>

                    <h3
                      className="
            mt-2
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-zinc-100
          "
                    >
                      {documentCount}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Uploaded documents
                    </p>
                  </div>

                  <div
                    className="
          flex h-11 w-11 sm:h-12 sm:w-12
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

                {/* Accent */}
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

              {/* Indexed Pages */}
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
      hover:border-cyan-500/40
      hover:shadow-xl hover:shadow-cyan-500/5
    "
              >
                {/* Glow */}
                <div
                  className="
        pointer-events-none absolute
        -right-10 -top-10
        h-24 w-24
        rounded-full
        bg-cyan-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-cyan-500/20
      "
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-400">
                      Indexed Pages
                    </p>

                    <h3
                      className="
            mt-2
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-zinc-100
          "
                    >
                      {indexedPages}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      Pages processed by AI
                    </p>
                  </div>

                  <div
                    className="
          flex h-11 w-11 sm:h-12 sm:w-12
          items-center justify-center
          rounded-xl
          border border-cyan-500/20
          bg-cyan-500/10
          text-cyan-400
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

                {/* Accent */}
                <div
                  className="
        absolute bottom-0 left-0
        h-[2px] w-0
        bg-cyan-500
        transition-all duration-500
        group-hover:w-full
      "
                />
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
      hover:border-indigo-500/40
      hover:shadow-xl hover:shadow-indigo-500/5
    "
              >
                {/* Glow */}
                <div
                  className="
        pointer-events-none absolute
        -right-10 -top-10
        h-24 w-24
        rounded-full
        bg-indigo-500/10
        blur-3xl
        transition-all duration-500
        group-hover:bg-indigo-500/20
      "
                />

                <div className="relative flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-400">
                      AI Chats
                    </p>

                    <h3
                      className="
            mt-2
            text-3xl sm:text-4xl
            font-bold
            tracking-tight
            text-zinc-100
          "
                    >
                      {chatCount}
                    </h3>

                    <p className="mt-1 text-xs text-zinc-500">
                      AI conversations
                    </p>
                  </div>

                  <div
                    className="
          flex h-11 w-11 sm:h-12 sm:w-12
          items-center justify-center
          rounded-xl
          border border-indigo-500/20
          bg-indigo-500/10
          text-indigo-400
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

                {/* Accent */}
                <div
                  className="
        absolute bottom-0 left-0
        h-[2px] w-0
        bg-indigo-500
        transition-all duration-500
        group-hover:w-full
      "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
