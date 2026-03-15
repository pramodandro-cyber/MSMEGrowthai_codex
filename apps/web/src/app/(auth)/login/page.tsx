"use client";

import { signIn } from "next-auth/react";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-deepBlue to-aiTeal p-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <h1 className="text-2xl font-bold text-deepBlue">MSMEGrowth AI</h1>
        <p className="mt-2 text-sm text-slate-600">India’s AI-Powered Funding & Subsidy Intelligence Platform for MSMEs</p>
        <button onClick={() => signIn("google", { callbackUrl: "/pricing" })} className="mt-6 w-full rounded-lg bg-aiTeal px-4 py-3 font-medium text-white">
          Continue with Google
        </button>
      </motion.div>
    </div>
  );
}
