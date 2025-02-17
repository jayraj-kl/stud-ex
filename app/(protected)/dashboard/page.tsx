import { getCurrentUser } from "@/lib/session";
import ExpandableCardDemo from "@/components/expandable-card-demo-grid";
import { DashboardHeader } from "@/components/dashboard/header";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text={`Welcome ${user?.name} to your dashboard`}
      />
      <ExpandableCardDemo />
    </>
  );
}
