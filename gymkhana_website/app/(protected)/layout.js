import Sidebar from "@/components/Sidebar"; 
import { redirect } from "next/navigation";
import { auth } from "@/auth"; 

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      
      {/* Sidebar handles its own responsive width/positioning */}
      <Sidebar userRole={session.user.role} />

      {/* Main Content Area */}
      {/* Removed 'ml-64' because the Sidebar is now flex-static on desktop */}
      <main className="flex-1 w-full p-4 md:p-8 overflow-y-auto h-full text-white relative bg-gray-950">
        {children}
      </main>
      
    </div>
  );
}