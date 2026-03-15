"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ensureBackendToken } from "@/lib/backendAuth";

export default function AdminPage() {
  const [stats, setStats] = useState<Record<string, number>>({});

  useEffect(() => {
    (async () => {
      await ensureBackendToken();
      const res = await api.get("/admin/analytics");
      setStats(res.data);
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-deepBlue">Admin Panel</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {Object.entries(stats).map(([key, value]) => (
          <div key={key} className="rounded-xl bg-white p-5 shadow">
            <p className="text-sm uppercase text-slate-500">{key}</p>
            <p className="text-3xl font-bold text-aiTeal">{value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
