"use client"
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const {user, checkingAuth, profile} = userStore()
  const router = useRouter()

  useEffect(() => {
    profile()
  }, [])

  useEffect(() => {
    if(!checkingAuth && !user){
      router.push("/auth")
    }

  },[checkingAuth,user])
  return (
    <main className="min-h-screen bg-black text-white">

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-32 text-center">

        <div className="inline-flex border border-zinc-700 rounded-full px-4 py-2 text-sm text-zinc-400 mb-8">
          AI-Powered Document Intelligence
        </div>

        <h1 className="text-6xl md:text-7xl font-bold leading-tight">
          Upload Any Document.
          <br />
          <span className="text-blue-500">
            Understand Everything.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto mt-8 text-lg text-zinc-400">
          Chat with PDFs, research papers, reports,
          contracts, notes, and more. Get instant
          summaries, answers, and insights powered by AI.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10">
          <button className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-medium">
            Upload Document
          </button>

          <button className="border border-zinc-700 hover:bg-zinc-900 px-8 py-4 rounded-xl">
            Watch Demo
          </button>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-3 gap-6">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              📄 Upload Anything
            </h3>
            <p className="text-zinc-400">
              PDFs, DOCX, TXT, reports, contracts,
              research papers and more.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              🤖 AI Analysis
            </h3>
            <p className="text-zinc-400">
              Generate summaries, key insights,
              action items and explanations instantly.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-3">
              💬 Chat With Documents
            </h3>
            <p className="text-zinc-400">
              Ask questions naturally and get answers
              directly from your uploaded files.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-zinc-800 py-24 text-center">
        <h2 className="text-4xl font-bold">
          Stop Reading.
          Start Understanding.
        </h2>

        <p className="mt-4 text-zinc-400">
          Let AI do the heavy lifting.
        </p>

        <button className="mt-8 bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-xl font-medium">
          Start Free
        </button>
      </section>

    </main>
  );
}