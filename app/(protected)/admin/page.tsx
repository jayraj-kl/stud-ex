import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { CreateBotCard } from "@/components/dashboard/create-bot-card";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text={`Access only for users with ADMIN role. Welcome back, ${user.name}!`}
      />
      <div className="flex flex-col gap-5">
        <div className="">
          <CreateBotCard />
        </div>
      </div>
    </>
  );
}
