import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ProtectedShell } from "@/components/protected-shell";

export default async function ProtectedLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  return <ProtectedShell>{children}</ProtectedShell>;
}
