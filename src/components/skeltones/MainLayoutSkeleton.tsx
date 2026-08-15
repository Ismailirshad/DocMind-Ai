import Image from "next/image";

export default function MainLayoutSkeleton() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <div className="flex items-center gap-1 animate-pulse">
        {/* Logo */}
        <Image
          src="/docmind-ai_logo.png"
          alt="DocMind AI logo"
          width={110}
          height={110}
          loading="eager"
        />
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
