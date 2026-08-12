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

  if(loading) return <AdminSkeleton />
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
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 hover:border-blue-500 transition"
            >
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-2xl font-bold">
                  {user?.name[0]}
                </div>

                <div>
                  <h2 className="text-base md:text-xl font-semibold">
                    {user?.name}
                  </h2>
                  <p className="text-zinc-400 text-xs md:text-base">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mt-8">
                <div className="rounded-xl bg-zinc-800/50 p-4 text-center">
                  <p className="text-zinc-400 text-sm">Documents</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                    {user?.documentsCount}
                  </h3>
                </div>

                <div className="rounded-xl bg-zinc-800/50 p-4 text-center">
                  <p className="text-zinc-400 text-sm">Pages</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                    {user?.indexedPages}
                  </h3>
                </div>

                <div className="rounded-xl bg-zinc-800/50 p-4 text-center">
                  <p className="text-zinc-400 text-sm">Chats</p>
                  <h3 className="text-2xl sm:text-3xl font-bold mt-2">
                    {user?.chatCount}
                  </h3>
                </div>
              </div>
            </div>
          ) : null,
        )}
      </div>
    </main>
  );
}
