import { notFound, redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { getCurrentUser } from "@/lib/session";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

export default async function Dashboard({ children }: ProtectedLayoutProps) {
  const user = await getCurrentUser();
  if (!user || user.role !== "ADMIN") redirect("/login");

  return (
    <>
      {children}
      <Toaster />
    </>
  );
}
