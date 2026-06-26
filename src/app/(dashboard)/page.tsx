"use client";

export default function ChatPage() {
  const messages = [
    {
      id: 1,
      role: "user",
      text: "Summarize this document.",
    },
    {
      id: 2,
      role: "assistant",
      text: `This employment contract outlines the responsibilities of both the employer and employee.

• Contract Duration
• Salary & Benefits
• Working Hours
• Termination Clause
• Confidentiality Agreement`,
    },
  ];

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
        <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <div
                className={`max-w-2xl rounded-2xl px-5 py-4 ${
                  message.role === "user"
                    ? "bg-blue-600"
                    : "bg-zinc-900 border border-zinc-800"
                }`}
              >
                <p className="whitespace-pre-line">
                  {message.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-800 bg-black p-5">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-4">

          {/* Document Select */}
          <select className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500">
            <option>Select Document</option>
            <option>Employment Contract.pdf</option>
            <option>Invoice.pdf</option>
            <option>Project Proposal.pdf</option>
          </select>

          {/* Message */}
          <div className="flex items-end gap-3">
            <textarea
              rows={2}
              placeholder="Ask anything about your document..."
              className="flex-1 bg-transparent resize-none outline-none placeholder:text-zinc-500"
            />

            <button className="bg-blue-600 hover:bg-blue-700 rounded-xl px-6 py-3 transition">
              Send
            </button>
          </div>

          <div className="mt-3 flex justify-between text-xs text-zinc-500">
            <span>
              AI responses may not always be accurate.
            </span>

            <span>Enter ↵ to send</span>
          </div>
        </div>
      </div>
    </main>
  );
}