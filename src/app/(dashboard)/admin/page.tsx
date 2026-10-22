"use client";
import AdminSkeleton from "@/components/skeltones/AdminSkeleton";
import api from "@/lib/axios";
import { useEffect, useState } from "react";

interface IAdminUserData {
  _id: string;
  name: string;
  email: string;
  role: "admin" | "user";
  documentsCount: number;
  indexedPages: number;
  chatCount: number;
}
interface IAdminResponse {
  usersData: IAdminUserData[];
  totalUsers: number;
  totalDocuments: number;
  totalIndexedPages: number;
}

export default function Admin() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState<IAdminUserData[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalDocuments, setTotalDocuments] = useState(0);
  const [totalIndexedPages, setTotalIndexedPages] = useState(0);

  useEffect(() => {
    const fetchAdminData = async () => {
      setLoading(true);
      const res = await api.get<IAdminResponse>("/api/admin");
      setLoading(false);
      setUserData(res.data.usersData);
      setTotalUsers(res.data.totalUsers);
      setTotalDocuments(res.data.totalDocuments);
      setTotalIndexedPages(res.data.totalIndexedPages);
    };
    fetchAdminData();
  }, []);

  if (loading) return <AdminSkeleton />;
  return (
    <main className="min-h-screen bg-black text-white px-6 lg:px-8 py-6 text-sm md:text-base w-full max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-10 px-10 md:px-18 lg:px-0">
        <h1 className="text-2xl md:text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-sm md:text-base text-zinc-400 mt-2">
          Manage DocMind AI users and monitor document usage.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 mb-10">
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400">Total Users</p>
          <h2 className="text-2xl sm:text-4xl font-bold mt-2">{totalUsers}</h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400">Documents</p>
          <h2 className="text-2xl sm:text-4xl font-bold mt-2">
            {totalDocuments}
          </h2>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
          <p className="text-zinc-400">Indexed Pages</p>
          <h2 className="text-2xl sm:text-4xl font-bold mt-2">
            {totalIndexedPages}
          </h2>
        </div>
      </div>

      {/* Users */}
      <div className="grid md:grid-cols-2 gap-6">
        {userData?.map((user) =>
          user?.role === "user" ? (
            <div
              key={user._id}
              className="
    group relative overflow-hidden
    rounded-2xl
    border border-zinc-800/80
    bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-950
    p-5 sm:p-6
    shadow-lg shadow-black/10
    transition-all duration-300
    hover:-translate-y-1
    hover:border-blue-500/40
    hover:shadow-xl hover:shadow-blue-500/5
  "
            >
              {/* Background glow */}
              <div
                className="
      pointer-events-none absolute
      -right-16 -top-16
      h-32 w-32
      rounded-full
      bg-blue-500/10
      blur-3xl
      transition-all duration-500
      group-hover:bg-blue-500/20
    "
              />

              {/* User Header */}
              <div className="relative flex items-center gap-4">
                {/* Avatar */}
                <div
                  className="
        flex h-14 w-14 sm:h-16 sm:w-16
        shrink-0
        items-center justify-center
        rounded-2xl
        border border-white/10
        bg-gradient-to-br from-pink-500 via-fuchsia-500 to-violet-500
        text-xl sm:text-2xl
        font-bold
        text-white
        shadow-lg shadow-fuchsia-500/10
        transition-transform duration-300
        group-hover:scale-105
      "
                >
                  {user?.name?.[0]?.toUpperCase()}
                </div>

                {/* User Info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <h2
                      className="
            truncate
            text-base sm:text-lg
            font-semibold
            text-zinc-100
          "
                      title={user?.name}
                    >
                      {user?.name}
                    </h2>

                    <span
                      className="
            hidden sm:inline-flex
            shrink-0
            items-center gap-1
            rounded-full
            border border-emerald-500/20
            bg-emerald-500/10
            px-2 py-0.5
            text-[10px]
            font-medium
            text-emerald-400
          "
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                      User
                    </span>
                  </div>

                  <p
                    className="
          mt-1
          truncate
          text-xs sm:text-sm
          text-zinc-500
        "
                    title={user?.email}
                  >
                    {user?.email}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="relative my-5 h-px bg-zinc-800/80" />

              {/* User Statistics */}
              <div className="relative grid grid-cols-3 gap-2 sm:gap-3">
                {/* Documents */}
                <div
                  className="
        group/stat
        rounded-xl
        border border-zinc-800
        bg-zinc-800/40
        p-3 sm:p-4
        text-center
        transition-all duration-300
        hover:border-blue-500/30
        hover:bg-blue-500/5
      "
                >
                  <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M14 2v6h6"
                      />
                    </svg>
                  </div>

                  <p className="mt-2 text-[11px] sm:text-xs text-zinc-500">
                    Documents
                  </p>

                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                    {user?.documentsCount}
                  </h3>
                </div>

                {/* Pages */}
                <div
                  className="
        group/stat
        rounded-xl
        border border-zinc-800
        bg-zinc-800/40
        p-3 sm:p-4
        text-center
        transition-all duration-300
        hover:border-cyan-500/30
        hover:bg-cyan-500/5
      "
                >
                  <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M4 6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6Z"
                      />

                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M8 8h8M8 12h8M8 16h5"
                      />
                    </svg>
                  </div>

                  <p className="mt-2 text-[11px] sm:text-xs text-zinc-500">
                    Pages
                  </p>

                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                    {user?.indexedPages}
                  </h3>
                </div>

                {/* Chats */}
                <div
                  className="
        group/stat
        rounded-xl
        border border-zinc-800
        bg-zinc-800/40
        p-3 sm:p-4
        text-center
        transition-all duration-300
        hover:border-violet-500/30
        hover:bg-violet-500/5
      "
                >
                  <div className="mx-auto flex h-7 w-7 items-center justify-center rounded-lg bg-violet-500/10 text-violet-400">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.7"
                        d="M21 11.5a8.38 8.38 0 0 1-9 8.5 9.6 9.6 0 0 1-4-.8L3 21l1.8-4.2A8.2 8.2 0 0 1 3 11.5 8.5 8.5 0 0 1 12 3a8.5 8.5 0 0 1 9 8.5Z"
                      />
                    </svg>
                  </div>

                  <p className="mt-2 text-[11px] sm:text-xs text-zinc-500">
                    Chats
                  </p>

                  <h3 className="mt-1 text-xl sm:text-2xl font-bold text-zinc-100">
                    {user?.chatCount}
                  </h3>
                </div>
              </div>

              {/* Bottom accent */}
              <div
                className="
      absolute bottom-0 left-0
      h-[2px] w-0
      bg-blue-500
      transition-all duration-500
      group-hover:w-full
    "
              />
            </div>
          ) : null,
        )}
      </div>
    </main>
  );
}
