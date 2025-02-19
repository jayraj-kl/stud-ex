import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { getBotData } from "@/lib/bot";
import ExpandableBotCards from "@/components/dashboard/expandable-bot-card";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  const bots = await getBotData();

  return (
    <>
      <DashboardHeader
        heading="Admin Panel"
        text={`Welcome back, ${user.role}`}
      />
      <div className="flex flex-col gap-5 max-w-2xl">
        {bots && bots.length > 0 ? (
          <ExpandableBotCards bots={bots} />
        ) : (
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <p className="text-center text-muted-foreground">No bots found</p>
          </div>
        )}
      </div>
    </>
  );
}
