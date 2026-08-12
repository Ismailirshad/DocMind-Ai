"use client";

import ChatSkeleton from "@/components/skeltones/ChatSkeleton";
import { chatStore } from "@/store/chatStore";
import { documentStore } from "@/store/documentStore";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function ChatPage() {
  const { askAi, loading: ChatLoading, getChats, messages } = chatStore();
  const {
    fetchDocuments,
    documents,
    loading: DocumentLoading,
  } = documentStore();
  const [text, setText] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectDoc, setSelectDoc] = useState(
    () => searchParams.get("documentId") ?? "",
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendChat = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    SendChat(text);
  };

  const SendChat = async (question: string = text) => {
    if (!question) {
      return toast.error("Please enter the text");
    }
    await askAi(question, selectDoc);
    setText("");
  };

  useEffect(() => {
    getChats(selectDoc);
    fetchDocuments();
  }, [getChats, selectDoc, fetchDocuments]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      SendChat(text);
    }
  };

  const handleDefaultQuestion = async ({
    question,
    e,
  }: {
    question: string;
    e: React.MouseEvent<HTMLButtonElement>;
  }) => {
    e.preventDefault();
    await SendChat(question);
  };

  const loading = ChatLoading || DocumentLoading;
  if (loading) return <ChatSkeleton />;
  return (
    <main
      className="
        flex flex-col
        h-screen
        mx-auto
        text-white text-sm
        sm:px-6
        md:text-base
        lg:px-8
      "
    >
      {/* Header */}
      <div
        className="
          px-18 py-4
          border-b border-zinc-800
          lg:px-0
        "
      >
        <h1
          className="
            text-xl font-bold
            md:text-2xl
          "
        >
          AI Document Assistant
        </h1>
        <p
          className="
            text-zinc-400 text-xs
            md:text-sm
          "
        >
          Ask questions, summarize, and explore your documents.
        </p>
      </div>

      {/* Chat */}
      <div
        className="
          flex-1 overflow-y-auto
          px-5
        "
      >
        {documents.length === 0 && !loading ? (
          <div
            className="
              flex
              h-full
              items-center justify-center
            "
          >
            <div
              className="
                max-w-md
                text-center
              "
            >
              <div
                className="
                  mb-5
                  text-7xl
                "
              >
                📄
              </div>

              <h2
                className="
                  text-3xl font-bold
                "
              >
                No documents yet
              </h2>

              <p
                className="
                  mt-3
                  text-zinc-400
                "
              >
                Upload your first PDF document to start chatting with AI.
              </p>

              <button
                onClick={() => router.push("/documents")}
                className="
                  mt-8 px-6 py-3
                  bg-blue-600
                  rounded-xl
                  hover:bg-blue-700 transition
                "
              >
                Upload Document
              </button>
            </div>
          </div>
        ) : messages?.length > 0 ? (
          <div
            className="
              max-w-4xl
              mx-auto px-6 py-8 space-y-6
            "
          >
            {messages?.map((message) => (
              <div
                key={message._id}
                className="
                  space-y-3
                "
              >
                {/* User */}

                <div
                  className="
                    flex
                    justify-end
                  "
                >
                  <div
                    className="
                      flex flex-col
                      max-w-2xl
                      items-end
                    "
                  >
                    {message?.document?.title && (
                      <span
                        className="
                          mb-1
                          text-xs text-zinc-400
                        "
                      >
                        📄 {message.document.title}
                      </span>
                    )}

                    <div
                      className="
                        px-5 py-4
                        text-white
                        bg-blue-600
                        rounded-2xl
                      "
                    >
                      {message.question}
                    </div>
                  </div>
                </div>

                {/* AI */}
                <div
                  className="
                    flex
                    justify-start
                  "
                >
                  <div
                    className="
                      max-w-2xl
                      px-5 py-4
                      bg-zinc-900
                      border border-zinc-800 rounded-2xl
                    "
                  >
                    {message.answer}
                    000{" "}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              flex
              h-full
              items-center justify-center
            "
          >
            <div
              className="
                max-w-lg
                text-center
              "
            >
              <h2
                className="
                  mb-3
                  text-xl font-bold
                  md:text-3xl
                "
              >
                👋 Lets chat with your documents
              </h2>

              <p
                className="
                  text-zinc-400
                "
              >
                Upload or select a document and ask questions about it.
              </p>

              <div
                className="
                  grid
                  mt-8
                  gap-3
                "
              >
                <button
                  onClick={(e) =>
                    handleDefaultQuestion({
                      question: "Summarize this document",
                      e,
                    })
                  }
                  className="
                    p-4
                    bg-zinc-900
                    border border-zinc-800 rounded-xl
                  "
                >
                  📄 Summarize this document
                </button>

                <button
                  onClick={(e) =>
                    handleDefaultQuestion({
                      question: " Find important points",
                      e,
                    })
                  }
                  className="
                    p-4
                    bg-zinc-900
                    border border-zinc-800 rounded-xl
                  "
                >
                  🔍 Find important points
                </button>
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      {documents.length !== 0 && (
        <div
          className="
            p-5
            bg-transparent
            border-none
          "
        >
          <div
            className="
              max-w-4xl
              mx-auto p-4
              bg-zinc-900
              border border-zinc-800 rounded-2xl
            "
          >
            <form onSubmit={handleSendChat}>
              {/* Document Select */}
              <select
                value={selectDoc}
                onChange={(e) => setSelectDoc(e.target.value)}
                className="
                  w-full
                  px-3 py-2.5
                  text-sm
                  bg-zinc-800
                  border border-zinc-700 rounded-lg
                  outline-none focus:border-blue-500
                  sm:px-4 sm:py-3 sm:text-base
                "
              >
                <option value="">Select Document</option>
                {documents?.map((doc) => (
                  <option key={doc._id} value={doc._id}>
                    {doc.title}
                  </option>
                ))}
              </select>

              {/* Message */}
              <div
                className="
                  flex
                  mt-2
                  items-end gap-3
                "
              >
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Ask anything about your document..."
                  className="
                    flex-1
                    bg-transparent
                    resize-none
                    outline-none placeholder:text-zinc-500
                  "
                />

                <button
                  type="submit"
                  className="
                    px-6 py-3
                    bg-blue-600
                    rounded-xl
                    hover:bg-blue-700 transition
                  "
                >
                  Send
                </button>
              </div>
            </form>

            <div
              className="
                flex
                mt-3
                text-xs text-zinc-500
                justify-between
              "
            >
              <span>AI responses may not always be accurate.</span>

              <span>Enter ↵ to send</span>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
