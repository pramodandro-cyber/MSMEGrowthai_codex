import { prisma } from "../src/config/prisma";

async function main() {
  await prisma.scheme.createMany({
    data: [
      {
        schemeName: "CGTMSE",
        eligibleIndustry: "Manufacturing",
        eligibleTurnover: 500000000,
        subsidyType: "Credit Guarantee",
        benefits: "Collateral free loans with guarantee cover",
        applicationProcess: "Apply through scheduled banks/NBFCs"
      },
      {
        schemeName: "CLCSS",
        eligibleIndustry: "Manufacturing",
        eligibleTurnover: 100000000,
        subsidyType: "Capital Subsidy",
        benefits: "15% capital subsidy for tech upgrades",
        applicationProcess: "Apply via nodal agency"
      }
    ],
    skipDuplicates: true
  });
}

main().finally(async () => prisma.$disconnect());
