import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1  lg:ml-72 min-h-screen bg-black text-white">
        {children}
      </main>
    </div>
  );
}
