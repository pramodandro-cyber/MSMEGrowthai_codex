"use client";

import { useState } from "react";
import { api } from "@/lib/api";
import { ensureBackendToken } from "@/lib/backendAuth";

const plans = ["FREE", "STARTER", "PRO", "PREMIUM_ADVISORY"] as const;

export default function PricingPage() {
  const [selected, setSelected] = useState<string>("");

  async function choosePlan(plan: string) {
    setSelected(plan);
    await ensureBackendToken();
    await api.post("/subscriptions/select-plan", { plan });
    window.location.href = "/onboarding";
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-deepBlue">Choose a Plan</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {plans.map((plan) => (
          <button key={plan} onClick={() => choosePlan(plan)} className={`rounded-xl border p-5 text-left ${selected === plan ? "border-aiTeal" : "border-slate-200"}`}>
            <p className="font-semibold">{plan.replace("_", " ")}</p>
            <p className="mt-2 text-sm text-slate-600">Access AI funding insights and scheme matching.</p>
          </button>
        ))}
      </div>
    </div>
  );
}
