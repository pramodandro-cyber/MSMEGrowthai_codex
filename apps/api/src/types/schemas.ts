import { z } from "zod";

export const oauthLoginSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  googleId: z.string().min(4)
});

export const businessProfileSchema = z.object({
  companyName: z.string().min(2),
  industry: z.string().min(2),
  location: z.string().min(2),
  yearsInOperation: z.number().int().min(0),
  annualTurnover: z.number().min(0),
  netProfitMargin: z.number().min(0).max(100),
  fundingRequirement: z.number().min(0),
  collateralAvailability: z.boolean(),
  gstStatus: z.boolean(),
  debtExposure: z.number().min(0).max(1)
});

export const planSelectionSchema = z.object({
  plan: z.enum(["FREE", "STARTER", "PRO", "PREMIUM_ADVISORY"])
});
