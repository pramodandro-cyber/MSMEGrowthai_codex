"use client";

import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { ensureBackendToken } from "@/lib/backendAuth";

type Report = {
  id: string;
  fundingScore: number;
  riskLevel: string;
  fundingRoadmap: string[];
  governmentSchemes: Array<{ schemeName: string; subsidyType: string }>;
  createdAt: string;
};

export default function DashboardPage() {
  const [reports, setReports] = useState<Report[]>([]);

  useEffect(() => {
    (async () => {
      await ensureBackendToken();
      const res = await api.get("/analysis/reports");
      setReports(res.data);
    })();
  }, []);

  const latest = reports[0];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold text-deepBlue">Funding Intelligence Dashboard</h2>
      {latest && (
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow"><p className="text-sm text-slate-500">Funding Score</p><p className="text-3xl font-bold text-aiTeal">{latest.fundingScore}</p></div>
          <div className="rounded-xl bg-white p-5 shadow"><p className="text-sm text-slate-500">Credit Risk</p><p className="text-2xl font-semibold">{latest.riskLevel}</p></div>
          <div className="rounded-xl bg-white p-5 shadow"><p className="text-sm text-slate-500">Recent Reports</p><p className="text-2xl font-semibold">{reports.length}</p></div>
        </div>
      )}
      <div className="rounded-xl bg-white p-5 shadow">
        <h3 className="font-semibold">Funding Roadmap</h3>
        <ul className="mt-2 list-disc pl-6 text-sm">
          {latest?.fundingRoadmap?.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}
