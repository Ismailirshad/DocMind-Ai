export default function HistorySkeleton() {
  return (
    <main className="min-h-screen bg-black text-white px-6 lg:px-8 py-6">

      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="h-9 w-44 rounded-lg bg-zinc-800 animate-pulse" />
        <div className="h-4 w-72 rounded bg-zinc-900 animate-pulse" />
      </div>

      {/* Search */}
      <div className="mb-8">
        <div className="h-14 w-full rounded-xl bg-zinc-900 animate-pulse" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 sm:p-5"
          >
            <div className="h-4 w-24 rounded bg-zinc-800 animate-pulse" />

            <div className="h-8 w-16 rounded bg-zinc-800 animate-pulse mt-3" />
          </div>
        ))}
      </div>

      {/* History List */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">

        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
          >
            {/* Document title */}
            <div className="flex items-start gap-2">
              <div className="h-5 w-5 rounded bg-zinc-800 animate-pulse" />

              <div className="h-5 w-40 rounded bg-zinc-800 animate-pulse" />
            </div>

            {/* Chat info */}
            <div className="flex gap-4 py-3">
              <div className="h-4 w-24 rounded bg-zinc-800 animate-pulse" />

              <div className="h-4 w-20 rounded bg-zinc-800 animate-pulse" />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <div className="h-10 flex-1 rounded-lg bg-zinc-800 animate-pulse" />

              <div className="h-10 flex-1 rounded-lg bg-zinc-800 animate-pulse" />
            </div>
          </div>
        ))}

      </div>
    </main>
  );
}