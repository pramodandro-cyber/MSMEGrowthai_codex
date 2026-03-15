"use client";

import { FormEvent } from "react";
import { api } from "@/lib/api";
import { ensureBackendToken } from "@/lib/backendAuth";

export default function OnboardingPage() {
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    await ensureBackendToken();
    const formData = new FormData(e.currentTarget);
    const payload = {
      companyName: String(formData.get("companyName")),
      industry: String(formData.get("industry")),
      location: String(formData.get("location")),
      yearsInOperation: Number(formData.get("yearsInOperation")),
      annualTurnover: Number(formData.get("annualTurnover")),
      netProfitMargin: Number(formData.get("netProfitMargin")),
      fundingRequirement: Number(formData.get("fundingRequirement")),
      collateralAvailability: formData.get("collateralAvailability") === "yes",
      gstStatus: formData.get("gstStatus") === "yes",
      debtExposure: Number(formData.get("debtExposure"))
    };

    const { data } = await api.post("/businesses", payload);
    await api.post(`/analysis/reports/${data.id}`);
    window.location.href = "/dashboard";
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-xl bg-white p-6 shadow">
      <h2 className="text-2xl font-semibold text-deepBlue">Business Profile</h2>
      <div className="grid gap-4 md:grid-cols-2">
        <input required name="companyName" placeholder="Company Name" className="rounded border p-2" />
        <input required name="industry" placeholder="Industry" className="rounded border p-2" />
        <input required name="location" placeholder="Location" className="rounded border p-2" />
        <input required name="yearsInOperation" type="number" placeholder="Years in operation" className="rounded border p-2" />
        <input required name="annualTurnover" type="number" placeholder="Annual turnover" className="rounded border p-2" />
        <input required name="netProfitMargin" type="number" placeholder="Net profit margin" className="rounded border p-2" />
        <input required name="fundingRequirement" type="number" placeholder="Funding requirement" className="rounded border p-2" />
        <input required name="debtExposure" type="number" min="0" max="1" step="0.01" placeholder="Debt exposure (0-1)" className="rounded border p-2" />
        <select name="collateralAvailability" className="rounded border p-2"><option value="yes">Collateral Available</option><option value="no">No Collateral</option></select>
        <select name="gstStatus" className="rounded border p-2"><option value="yes">GST Compliant</option><option value="no">Not GST Compliant</option></select>
      </div>
      <button className="rounded bg-aiTeal px-4 py-2 font-medium text-white">Run AI Analysis</button>
    </form>
  );
}
