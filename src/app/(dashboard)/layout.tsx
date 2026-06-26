import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />

      <main
        className="ml-71
          min-h-screen
          w-[calc(100%-16rem)]
          bg-black
          text-white
           border border-red-500
           "
      >
        {children}
      </main>
    </div>
  );
}
