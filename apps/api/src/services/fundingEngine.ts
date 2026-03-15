export interface FundingInput {
  yearsInOperation: number;
  annualTurnover: number;
  netProfitMargin: number;
  gstStatus: boolean;
  collateralAvailability: boolean;
  debtExposure: number;
}

export function calculateFundingReadiness(input: FundingInput): number {
  let score = 0;
  score += Math.min(input.yearsInOperation * 4, 20);
  score += Math.min(input.annualTurnover / 5000000, 1) * 20;
  score += Math.max(Math.min(input.netProfitMargin, 30), 0) / 30 * 20;
  score += input.gstStatus ? 10 : 0;
  score += input.collateralAvailability ? 15 : 5;
  score += Math.max(0, 15 - input.debtExposure * 10);
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function evaluateRisk(score: number): "LOW" | "MEDIUM" | "HIGH" {
  if (score >= 75) return "LOW";
  if (score >= 50) return "MEDIUM";
  return "HIGH";
}
