import Sidebar from "@/components/Sidebar"; 
import { redirect } from "next/navigation";
import { auth } from "@/auth"; // <--- IMPORT THIS directly from your root auth.js

export default async function DashboardLayout({ children }) {
  // In NextAuth v5, you just call auth() to get the session
  const session = await auth();

  // Security Check
  if (!session) {
    redirect("/login");
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      <Sidebar userRole={session.user.role} />

      <main className="flex-1 ml-64 p-8 overflow-y-auto h-full text-white">
        {children}
      </main>
    </div>
  );
}