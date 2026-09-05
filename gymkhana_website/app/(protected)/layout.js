import Sidebar from "@/components/Sidebar"; 
import { redirect } from "next/navigation";
import { auth } from "@/auth"; 
import { headers } from "next/headers";

// Role-based route protection (moved from middleware to layout)
const ROLE_ROUTE_MAP = {
  "/dashboard/general_secretary": "gs_snt",
  "/dashboard/office": "office",
  "/dashboard/adosa": "adosa",
  "/dashboard/club_head": "club_head",
  "/dashboard/contingent_leader": "contingent_leader",
  "/dashboard/gs_cult": "gs_cult",
};

export default async function DashboardLayout({ children }) {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Role-based access control
  const headersList = await headers();
  const pathname = headersList.get("x-next-pathname") || headersList.get("x-invoke-path") || "";
  
  const role = session.user.role;
  for (const [routePrefix, requiredRole] of Object.entries(ROLE_ROUTE_MAP)) {
    if (pathname.startsWith(routePrefix) && role !== requiredRole) {
      redirect("/dashboard");
    }
  }

  return (
    <div className="flex h-screen bg-gray-950 overflow-hidden">
      
      {/* Sidebar handles its own responsive width/positioning */}
      <Sidebar userRole={session.user.role} />

      {/* Main Content Area */}
      <main className="flex-1 w-full p-4 md:p-8 overflow-y-auto h-full text-white relative bg-gray-950">
        {children}
      </main>
      
    </div>
  );
}