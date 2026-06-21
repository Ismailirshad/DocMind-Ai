"use client"
import { userStore } from "@/store/userStore";

export default function Sidebar() {
  const {user, logout} = userStore()


  return (
    <aside className="w-64 h-screen bg-zinc-950 border-r border-zinc-800 flex flex-col fixed left-0 top-0">
      
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <h1 className="text-2xl font-bold text-white">
          DocMind AI
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        
        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300">
          🏠 Dashboard
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300">
          📤 Upload Document
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300">
          📚 History
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300">
          💬 AI Chats
        </button>

        <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-zinc-900 text-zinc-300">
          ⚙️ Settings
        </button>

      </nav>

      {/* User */}
      <div className="p-4 border-t border-zinc-800">
        <div className="bg-zinc-900 rounded-lg p-3">
          <p className="text-white font-medium">
            {user?.name}
          </p>
          <p className="text-zinc-400 text-sm">
            {user?.email}
          </p>
        </div>

        <button onClick={() => logout()} className="w-full mt-3 bg-red-500 hover:bg-red-600 py-2 rounded-lg text-white">
          Logout
        </button>
      </div>

    </aside>
  );
}