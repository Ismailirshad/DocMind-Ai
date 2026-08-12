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

  useEffect(() => {
    const checkUser = async () => {
      try {
        await refresh();
        await profile();
      } catch (error) {
        console.error("Please login", error);
      }
    };
    checkUser();
  }, [refresh, profile]);

  const pathname = usePathname();

  useEffect(() => {
    if (checkingAuth) return;
    if (!user && pathname !== "/auth") {
      router.replace("/auth");
    }

    if (user && pathname === "/auth") {
      router.replace("/");
    }
  }, [user, checkingAuth, pathname, router]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MainLayoutSkeleton />
      </div>
    );
  }

  return children;
}
