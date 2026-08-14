export default function ChatSkeleton() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="px-5 py-6 border-b border-zinc-800">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="h-7 w-64 rounded-lg bg-zinc-800 animate-pulse" />

          <div className="h-4 w-80 max-w-full rounded bg-zinc-900 animate-pulse" />
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 overflow-hidden px-5">
        <div className="max-w-4xl mx-auto py-8 space-y-8">
          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-2xl w-full flex flex-col items-end gap-2">
              <div className="h-3 w-24 rounded bg-zinc-800 animate-pulse" />

              <div className="h-16 w-3/4 rounded-2xl bg-zinc-800 animate-pulse" />
            </div>
          </div>

          {/* AI message */}
          <div className="flex justify-start">
            <div className="max-w-2xl w-full">
              <div className="h-24 w-full rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
            </div>
          </div>

          {/* User message */}
          <div className="flex justify-end">
            <div className="max-w-2xl w-full flex justify-end">
              <div className="h-14 w-1/2 rounded-2xl bg-zinc-800 animate-pulse" />
            </div>
          </div>

          {/* AI message */}
          <div className="flex justify-start">
            <div className="max-w-2xl w-full">
              <div className="h-32 w-full rounded-2xl bg-zinc-900 border border-zinc-800 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="p-5">
        <div className="max-w-4xl mx-auto bg-zinc-900 border border-zinc-800 rounded-2xl p-4">
          {/* Select */}
          <div className="h-11 w-full rounded-lg bg-zinc-800 animate-pulse" />

          {/* Textarea + button */}
          <div className="flex items-end gap-3 mt-3">
            <div className="flex-1 h-16 rounded-lg bg-zinc-800 animate-pulse" />

            <div className="h-12 w-24 rounded-xl bg-zinc-800 animate-pulse" />
          </div>

          {/* Footer */}
          <div className="mt-3 flex justify-between">
            <div className="h-3 w-44 rounded bg-zinc-800 animate-pulse" />
            <div className="h-3 w-20 rounded bg-zinc-800 animate-pulse" />
          </div>
        </div>
      </div>
    </main>
  );
}
