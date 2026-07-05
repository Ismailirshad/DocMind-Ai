"use client";

import { chatStore } from "@/store/chatStore";
import { documentStore } from "@/store/documentStore";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChatPage() {
  const { askAi, loading, getChats, messages } = chatStore();
  const { fetchDocuments, documents } = documentStore();
  const [text, setText] = useState();
  const [selectDoc, setSelectDoc] = useState();

  const handleSendChat = async (e) => {
    e.preventDefault();
    if (!text) {
      return toast.error("Please enter the text");
    }
    const res = await askAi(text, selectDoc);
    setSelectDoc("");
    setText("");
    console.log(res);
  };

  useEffect(() => {
    getChats();
    fetchDocuments();
  }, [getChats]);

  console.log("documents are", documents);

  return (
    <main className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 px-6 py-4">
        <h1 className="text-2xl font-bold">AI Document Chat</h1>
        <p className="text-zinc-400 text-sm">
          Ask questions about your uploaded documents
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 overflow-y-auto">
        {messages?.length > 0 ? (
          <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
            {console.log("message now", messages)}

            {messages?.map((message) => (
              <div key={message._id} className="space-y-3">
                {/* User */}

                <div className="flex justify-end">
                  <div className="max-w-2xl flex flex-col items-end">
                    {message?.document?.title && (
                      <span className="mb-1 text-xs text-zinc-400">
                        📄 {message.document.title}
                      </span>
                    )}

                    <div className="rounded-2xl bg-blue-600 px-5 py-4 text-white">
                      {message.question}
                    </div>
                  </div>
                </div>

                {/* AI */}
                <div className="flex justify-start">
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl px-5 py-4 max-w-2xl">
                    {message.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-full flex items-center justify-center">
            <div className="text-center max-w-lg">
              <h2 className="text-3xl font-bold mb-3">
                👋 Let's chat with your documents
              </h2>

              <p className="text-zinc-400">
                Upload or select a document and ask questions about it.
              </p>

              <div className="mt-8 grid gap-3">
                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  📄 Summarize this document
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  🔍 Find important points
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                  ❓ Ask any question about the document
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 bg-black p-5">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          <form onSubmit={handleSendChat}>
            {/* Document Select */}
            <select
              value={selectDoc}
              onChange={(e) => setSelectDoc(e.target.value)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500"
            >
              <option>Select Document</option>
              {documents?.documents?.map((doc) => (
                <option key={doc._id} value={doc._id}>
                  {doc.title}
                </option>
              ))}
            </select>

            {/* Message */}
            <div className="flex items-end gap-3">
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={2}
                placeholder="Ask anything about your document..."
                className="flex-1 bg-transparent resize-none outline-none placeholder:text-zinc-500"
              />

              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 transition"
              >
                Send
              </button>
            </div>
          </form>

          <div className="mt-3 flex justify-between text-xs text-zinc-500">
            <span>AI responses may not always be accurate.</span>

            <span>Enter ↵ to send</span>
          </div>
        </div>
      </div>
    </main>
  );
}
