"use client";

import { useEffect } from "react";
import { userStore } from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import MainLayoutSkeleton from "./skeltones/MainLayoutSkeleton";

interface FetchProfileProps {
  children: React.ReactNode;
}

export default function FetchProfile({ children }: FetchProfileProps) {
  const { profile, user, checkingAuth, refresh } = userStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/auth") return;

    const checkUser = async () => {
      try {
        await refresh();
        await profile();
      } catch (error) {
        console.error("Please login", error);
      }
    };

    checkUser();
  }, [pathname, refresh, profile]);

  useEffect(() => {
    if (pathname === "/auth") return;
    if (checkingAuth) return;

    if (!user) {
      router.replace("/auth");
    }
  }, [user, checkingAuth, pathname, router]);

  // Login page is public.
  // Do not wait for authentication before showing it.
  if (pathname === "/auth") {
    return children;
  }

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MainLayoutSkeleton />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MainLayoutSkeleton />
      </div>
    );
  }

  return children;
}
