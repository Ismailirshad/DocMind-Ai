export default function DocumentsSkeleton() {
  return (
    <main
      className="
        min-h-screen bg-black text-white
        px-6 lg:px-8 py-6
        text-sm md:text-base
        w-full max-w-7xl mx-auto
      "
    >
      {/* Header */}
      <div className="mb-10 px-10 sm:px-18 lg:px-0 space-y-3">
        <div className="h-10 w-48 rounded-lg bg-zinc-800 animate-pulse" />
        <div className="h-5 w-80 max-w-full rounded bg-zinc-900 animate-pulse" />
      </div>

      {/* Search */}
      <div className="relative mb-8 w-full max-w-2xl">
        <div className="h-12 sm:h-14 w-full rounded-xl bg-zinc-900 animate-pulse" />
      </div>

      {/* Upload section */}
      <div className="border-2 border-dashed border-zinc-800 rounded-3xl p-4 sm:p-6 lg:p-8 mb-10 bg-zinc-950">
        {/* Upload box */}
        <div className="mt-8 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-zinc-800 bg-zinc-900/60 px-4 py-10">
          {/* Upload icon */}
          <div className="h-16 w-16 rounded-2xl bg-zinc-800 animate-pulse" />

          {/* Title */}
          <div className="mt-4 h-6 w-40 rounded bg-zinc-800 animate-pulse" />

          {/* Description */}
          <div className="mt-2 h-4 w-56 rounded bg-zinc-800 animate-pulse" />

          {/* PDF badge */}
          <div className="mt-3 h-6 w-20 rounded-full bg-zinc-800 animate-pulse" />
        </div>

        {/* Form */}
        <div className="py-4 max-w-2xl mx-auto grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          <div className="h-12 w-full rounded-xl bg-zinc-900 animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-zinc-900 animate-pulse" />
          <div className="h-12 w-full rounded-xl bg-zinc-900 animate-pulse" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4 mb-10">
        {Array.from({ length: 3 }).map((_, index) => (
          <div
            key={index}
            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-4 h-28 animate-pulse"
          />
        ))}
      </div>

      {/* Recent Documents */}
      <div>
        {/* Heading */}
        <div className="flex items-center justify-between mb-5">
          <div className="h-7 w-52 rounded bg-zinc-800 animate-pulse" />
        </div>

        {/* Cards */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"
            >
              {/* Icon + badge */}
              <div className="flex items-center justify-between">
                <div className="h-10 w-10 rounded bg-zinc-800 animate-pulse" />
                <div className="h-6 w-12 rounded-full bg-zinc-800 animate-pulse" />
              </div>

              {/* Title */}
              <div className="h-5 w-3/4 rounded bg-zinc-800 animate-pulse mt-4" />

              {/* Details */}
              <div className="mt-4 space-y-2">
                <div className="h-3 w-20 rounded bg-zinc-800 animate-pulse" />
                <div className="h-3 w-28 rounded bg-zinc-800 animate-pulse" />
              </div>

              {/* Buttons */}
              <div className="flex gap-2 mt-5">
                <div className="flex-1 h-9 rounded-lg bg-zinc-800 animate-pulse" />
                <div className="flex-1 h-9 rounded-lg bg-zinc-800 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
