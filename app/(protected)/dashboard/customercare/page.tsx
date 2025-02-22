import { getCurrentUser } from "@/lib/session";
import { DashboardHeader } from "@/components/dashboard/header";
import { CustomerCareForm } from "@/components/dashboard/customer-care-form";
import { SubmissionsTable } from "@/components/dashboard/submission-table";
import { Separator } from "@/components/ui/separator";

export default async function DashboardPage() {
  const user = await getCurrentUser();

  return (
    <div className="flex flex-col gap-8">
      <DashboardHeader
        heading="Customer Care"
        text={`Welcome ${user?.name} to your customer care we are here to help you`}
      />
      <Separator />
      <CustomerCareForm />
      <Separator />
      <SubmissionsTable />
    </div>
  );
}
