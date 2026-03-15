import { ReactNode } from "react";
import Link from "next/link";

export function ProtectedShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <h1 className="text-xl font-semibold text-deepBlue">MSMEGrowth AI</h1>
          <nav className="space-x-4 text-sm">
            <Link href="/pricing">Pricing</Link>
            <Link href="/onboarding">Business Profile</Link>
            <Link href="/dashboard">Dashboard</Link>
            <Link href="/admin">Admin</Link>
          </nav>
        </div>
      </header>
      <section className="mx-auto max-w-6xl p-6">{children}</section>
    </main>
  );
}
