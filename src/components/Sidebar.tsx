"use client";

import { userStore } from "@/store/userStore";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  LuFiles,
  LuHistory,
  LuMessageSquare,
  LuSettings,
  LuLogOut,
  LuShieldCheck,
  LuX,
  LuMenu,
} from "react-icons/lu";

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = userStore();
  const [open, setOpen] = useState(false);

  const navLinks = [
    {
      name: "Documents",
      path: "/documents",
      icon: LuFiles,
    },
    {
      name: "AI Chats",
      path: "/",
      icon: LuMessageSquare,
    },
    {
      name: "History",
      path: "/history",
      icon: LuHistory,
    },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 rounded-xl border border-zinc-700 bg-zinc-900 p-2 text-white shadow-lg hover:bg-zinc-800 transition lg:hidden"
        >
          <LuMenu size={28} />
        </button>
      )}

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
        />
      )}

      <aside
        className={`
          fixed left-0 top-0 z-50
          h-screen w-72
          bg-[#0a0a0a]
          border-r border-zinc-800
          flex flex-col
          text-sm md:text-base
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setOpen(false)}
          className="absolute right-4 top-4 text-white lg:hidden"
        >
          <LuX size={26} />
        </button>

        {/* Logo */}
        <div className="px-6 py-6 border-b border-zinc-800">
          <div className="flex items-center">
            <Image
              src="/docmind-ai_logo.png"
              alt="DocMind AI logo"
              width={90}
              height={90}
              loading="eager"
            />

            <div>
              <h1 className="text-sm md:text-lg font-bold text-white">
                DocMind AI
              </h1>
              <p className="text-xs text-zinc-500">AI Document Assistant</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <p className="text-xs uppercase tracking-wider text-zinc-500 px-3 mb-3">
            Workspace
          </p>

          <div className="space-y-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.path;

              return (
                <Link
                  key={link.path}
                  href={link.path}
                  onClick={() => setOpen(false)}
                  className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    active
                      ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white"
                      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      active
                        ? "bg-pink-500/20"
                        : "bg-zinc-800 group-hover:bg-zinc-700"
                    }`}
                  >
                    <Icon size={18} />
                  </div>

                  <span className="font-medium">{link.name}</span>
                </Link>
              );
            })}
          </div>

          {/* System */}
          <div className="mt-8">
            <p className="text-xs uppercase tracking-wider text-zinc-500 px-3 mb-3">
              System
            </p>

            <Link
              href="/settings"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:bg-zinc-900 hover:text-white transition-all"
            >
              <div className="p-2 rounded-lg bg-zinc-800">
                <LuSettings size={18} />
              </div>
              Settings
            </Link>

            {user?.role === "admin" && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className={`group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                  pathname.startsWith("/admin")
                    ? "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-white"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <div
                  className={`p-2 rounded-lg ${
                    pathname.startsWith("/admin")
                      ? "bg-blue-500/20"
                      : "bg-zinc-800 group-hover:bg-zinc-700"
                  }`}
                >
                  <LuShieldCheck size={18} />
                </div>

                <span className="font-medium">Admin</span>
              </Link>
            )}
          </div>
        </nav>

        {/* User */}
        <div className="p-4 border-t border-zinc-800">
          <div className="bg-zinc-900 rounded-2xl p-4 border border-zinc-800">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0)}
              </div>

              <div className="overflow-hidden">
                <p className="text-white font-medium truncate">{user?.name}</p>
              </div>
            </div>

            <button
              onClick={logout}
              className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              <LuLogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
