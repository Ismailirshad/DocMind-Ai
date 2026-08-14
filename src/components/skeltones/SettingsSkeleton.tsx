export default function SettingsSkeleton() {
  return (
    <main className="min-h-screen bg-black text-white px-6 lg:px-8 py-6">
      {/* Header */}
      <div className="mb-8 space-y-3">
        <div className="h-9 w-56 rounded-lg bg-zinc-800 animate-pulse" />

        <div className="h-5 w-80 max-w-full rounded bg-zinc-900 animate-pulse" />
      </div>

      {/* Profile Card */}
      <div className="relative">
        <div className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950">
          {/* Gradient Header */}
          <div className="p-5 md:p-10 bg-zinc-900">
            <div className="flex justify-between items-start gap-4">
              {/* User */}
              <div className="flex items-center gap-6">
                {/* Avatar */}
                <div className="h-12 w-12 md:h-28 md:w-28 shrink-0 rounded-full bg-zinc-800 animate-pulse" />

                <div className="space-y-3">
                  {/* Name */}
                  <div className="h-6 md:h-9 w-32 md:w-48 rounded bg-zinc-800 animate-pulse" />

                  {/* Email */}
                  <div className="h-4 w-40 md:w-60 rounded bg-zinc-800 animate-pulse" />

                  {/* Active workspace */}
                  <div className="h-7 w-28 md:w-36 rounded-full bg-zinc-800 animate-pulse" />
                </div>
              </div>

              {/* Right side */}
              <div className="hidden sm:block space-y-2 text-right">
                <div className="h-4 w-20 ml-auto rounded bg-zinc-800 animate-pulse" />
                <div className="h-7 w-28 ml-auto rounded bg-zinc-800 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="p-8">
            {/* Heading */}
            <div className="h-6 w-40 rounded bg-zinc-800 animate-pulse mb-6" />

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6"
                >
                  {/* Icon */}
                  <div className="h-9 w-9 rounded bg-zinc-800 animate-pulse" />

                  {/* Label */}
                  <div className="mt-4 h-4 w-24 rounded bg-zinc-800 animate-pulse" />

                  {/* Number */}
                  <div className="mt-3 h-8 w-16 rounded bg-zinc-800 animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
