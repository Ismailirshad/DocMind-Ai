import { memo } from "react";

interface ChatMessageProps {
  message: {
    question: string;
    answer: string;
    document: {
      title: string;
    };
  };
}
const ChatMessage = memo(function ChatMessage({ message }: ChatMessageProps) {
  return (
    <div className="space-y-3">
      {/* User */}
      <div className="flex justify-end">
        <div className="flex max-w-2xl flex-col items-end">
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
        <div className="max-w-2xl rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4">
          {message.answer}
          000{" "}
        </div>
      </div>
    </div>
  );
});

export default ChatMessage;
