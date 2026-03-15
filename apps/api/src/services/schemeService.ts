import { Scheme } from "@prisma/client";

interface MatchInput {
  industry: string;
  annualTurnover: number;
}

export function matchSchemes(input: MatchInput, schemes: Scheme[]): Scheme[] {
  return schemes.filter((scheme) =>
    scheme.eligibleIndustry.toLowerCase() === input.industry.toLowerCase() &&
    input.annualTurnover <= scheme.eligibleTurnover
  );
}
