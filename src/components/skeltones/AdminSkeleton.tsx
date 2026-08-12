export default function AdminSkeleton() {
  return (
    <main className="min-h-screen bg-black text-white px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="h-9 w-48 rounded-lg bg-zinc-800 animate-pulse" />
        <div className="h-4 w-72 rounded bg-zinc-900 animate-pulse" />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
          >
            {/* Label */}
            <div className="h-4 w-28 rounded bg-zinc-800 animate-pulse" />

            {/* Number */}
            <div className="h-9 w-20 rounded bg-zinc-800 animate-pulse mt-3" />
          </div>
        ))}
      </div>

      {/* Users */}
      <div className="grid md:grid-cols-2 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6"
          >
            {/* User */}
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="h-16 w-16 rounded-full bg-zinc-800 animate-pulse shrink-0" />

              <div className="space-y-2">
                {/* Name */}
                <div className="h-5 w-32 rounded bg-zinc-800 animate-pulse" />

                {/* Email */}
                <div className="h-4 w-48 rounded bg-zinc-800 animate-pulse" />
              </div>
            </div>

            {/* User Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8">
              {Array.from({ length: 3 }).map((_, statIndex) => (
                <div
                  key={statIndex}
                  className="rounded-xl bg-zinc-800/50 p-4 text-center"
                >
                  {/* Label */}
                  <div className="h-3 w-16 mx-auto rounded bg-zinc-700 animate-pulse" />

                  {/* Number */}
                  <div className="h-8 w-12 mx-auto rounded bg-zinc-700 animate-pulse mt-3" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}