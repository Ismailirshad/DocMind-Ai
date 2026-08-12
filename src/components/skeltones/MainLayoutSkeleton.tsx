export default function MainLayoutSkeleton() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="flex items-center gap-3 animate-pulse">
        {/* Logo */}
        <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">
          D
        </div>
        {/* App name */}
        <div>
          <h1 className="text-sm md:text-lg font-bold text-white">
            DocMind AI
          </h1>
          <p className="text-xs text-zinc-500">AI Document Assistant</p>
        </div>
      </div>
    </div>
  );
}
