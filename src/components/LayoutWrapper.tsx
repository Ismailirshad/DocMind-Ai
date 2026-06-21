"use client";

import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isAuthPage = pathname === "/auth"

  return (
    <>
      {!isAuthPage && <Sidebar />}
     <main className={`${isAuthPage ? "ml-0" : "ml-64"}`}>{children}</main>
    </>
  );
}
