import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";
import { runCompanyResearch } from "../services/aiService";
import { calculateFundingReadiness, evaluateRisk } from "../services/fundingEngine";
import { matchSchemes } from "../services/schemeService";

export async function generateFundingReport(req: AuthRequest, res: Response): Promise<void> {
  const { businessId } = req.params;
  const business = await prisma.business.findFirst({ where: { id: businessId, userId: req.user!.id } });
  if (!business) {
    res.status(404).json({ message: "Business not found" });
    return;
  }

  const aiResearch = await runCompanyResearch(business.companyName);
  const fundingScore = calculateFundingReadiness(business);
  const riskLevel = evaluateRisk(fundingScore);

  const schemes = await prisma.scheme.findMany();
  const eligibleSchemes = matchSchemes({ industry: business.industry, annualTurnover: business.annualTurnover }, schemes);

  const report = await prisma.report.create({
    data: {
      businessId: business.id,
      companyOverview: aiResearch.companyOverview ?? "Overview unavailable",
      fundingScore,
      riskLevel,
      loanEligibilityEstimate: fundingScore > 70 ? "Likely Eligible" : "Needs Improvement",
      governmentSchemes: eligibleSchemes,
      subsidyOpportunities: eligibleSchemes.map((s) => ({ schemeName: s.schemeName, subsidyType: s.subsidyType })),
      creditRiskFlags: riskLevel === "HIGH" ? ["High debt exposure", "Low profitability"] : ["No major flags"],
      fundingRoadmap: [
        "Improve bookkeeping and GST compliance",
        "Reduce debt ratio and improve margins",
        "Apply to top matching schemes"
      ],
      aiResearch
    }
  });

  res.json(report);
}

export async function listReports(req: AuthRequest, res: Response): Promise<void> {
  const reports = await prisma.report.findMany({
    where: { business: { userId: req.user!.id } },
    include: { business: true },
    orderBy: { createdAt: "desc" }
  });
  res.json(reports);
}
