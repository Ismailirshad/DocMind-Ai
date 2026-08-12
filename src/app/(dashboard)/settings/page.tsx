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
                grid grid-cols-2
                gap-6
                sm:grid-cols-3
              "
            >
              {/* Card */}

              <div
                className="
                  p-6
                  bg-gradient-to-b from-zinc-900 to-zinc-950
                  rounded-2xl border border-zinc-800
                  hover:border-blue-500 transition
                "
              >
                <div
                  className="
                    text-xl
                    md:text-4xl
                  "
                >
                  📄
                </div>

                <p
                  className="
                    mt-4
                    text-zinc-400
                  "
                >
                  Documents
                </p>

                <h3
                  className="
                    mt-2
                    text-xl font-bold
                    md:text-3xl
                  "
                >
                  {documentCount}
                </h3>
              </div>

              <div
                className="
                  p-6
                  bg-gradient-to-b from-zinc-900 to-zinc-950
                  rounded-2xl border border-zinc-800
                  hover:border-cyan-500 transition
                "
              >
                <div
                  className="
                    text-xl
                    md:text-4xl
                  "
                >
                  📚
                </div>

                <p
                  className="
                    mt-4
                    text-zinc-400
                  "
                >
                  Indexed Pages
                </p>

                <h3
                  className="
                    mt-2
                    text-xl font-bold
                    md:text-3xl
                  "
                >
                  {indexedPages}
                </h3>
              </div>

              <div
                className="
                  p-6
                  bg-gradient-to-b from-zinc-900 to-zinc-950
                  rounded-2xl border border-zinc-800
                  hover:border-indigo-500 transition
                "
              >
                <div
                  className="
                    text-xl
                    md:text-4xl
                  "
                >
                  💬
                </div>

                <p
                  className="
                    mt-4
                    text-zinc-400
                  "
                >
                  AI Chats
                </p>

                <h3
                  className="
                    mt-2
                    text-xl font-bold
                    md:text-3xl
                  "
                >
                  {chatCount}
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
