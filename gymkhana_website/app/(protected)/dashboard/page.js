import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardTrafficController() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  // Route them based on their role
  switch (session.user.role) {
    case "club_head":
      redirect("/dashboard/club_head");
    case "gs":
      redirect("/dashboard/general_secretary");
    case "office":
      redirect("/dashboard/office");
    case "adosa":
      redirect("/dashboard/adosa");
    case "dosa":
      redirect("/dashboard/dosa");
    default:
      // Fallback for users without a specific dashboard or unknown roles
      return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <h1 className="text-3xl font-bold text-yellow-500 mb-4">Welcome to your Dashboard!</h1>
          <p className="text-gray-300">You are logged in as <span className="font-semibold text-white">{session.user.name}</span>.</p>
          <p className="text-gray-400 mt-2">Your role ({session.user.role}) does not have a specific portal assigned yet.</p>
        </div>
      );
  }
}
