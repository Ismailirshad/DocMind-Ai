"use client";

import { useEffect } from "react";
import { userStore } from "@/store/userStore";
import { useRouter } from "next/navigation";

export default function FetchProfile() {
  const { profile, user, checkingAuth } = userStore();
  const router = useRouter();

  useEffect(() => {
    profile();
  }, []);

  useEffect(() => {
    if (!checkingAuth && user) {
      router.push("/");
    }
    if (!checkingAuth && !user) {
      router.push("/auth");
    }
  }, [user, checkingAuth]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-white">Loading</p>
      </div>
    );
  }

  return null;
}
