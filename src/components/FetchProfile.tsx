
"use client";

import { useEffect } from "react";
import { userStore } from "@/store/userStore";
import { usePathname, useRouter } from "next/navigation";
import MainLayoutSkeleton from "./skeltones/MainLayoutSkeleton";

interface FetchProfileProps {
  children: React.ReactNode;
}

export default function FetchProfile({ children }: FetchProfileProps) {
  const { profile, refresh, user, checkingAuth } = userStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // if (pathname === "/auth") return;

    const checkUser = async () => {
      try {
        // Check whether an access token already exists.
        const { accessToken } = userStore.getState();

        // Only refresh when there is no access token.
        if (!accessToken) {
          const refreshed = await refresh();

          if (!refreshed) {
            return;
          }
        }

        // Verify the user using the access token.
        await profile();

      } catch (error) {
        console.error("Please login", error);
      }
    };

    checkUser();
  }, [ refresh, profile]);

  useEffect(() => {
    if (pathname === "/auth") return;
    if (checkingAuth) return;

    if (!user) {
      router.replace("/auth");
    }
  }, [user, checkingAuth, pathname, router]);

  if (pathname === "/auth") {
    return children;
  }

  if (checkingAuth || !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <MainLayoutSkeleton />
      </div>
    );
  }

  return children;
}
