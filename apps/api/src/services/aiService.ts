import OpenAI from "openai";
import { env } from "../config/env";

const openai = new OpenAI({ apiKey: env.openAiApiKey });

export async function runCompanyResearch(companyName: string) {
  if (!env.openAiApiKey) {
    return {
      companyOverview: `${companyName} appears to be an MSME operating in India with growth potential.`,
      industryClassification: "General MSME",
      businessActivities: ["Manufacturing/Services"],
      operationalMaturity: "Emerging",
      estimatedScale: "Small"
    };
  }

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: `Analyze ${companyName} for funding insights. Return strict JSON object with keys: companyOverview, industryClassification, businessActivities (array), operationalMaturity, estimatedScale.`
      }
    ],
    response_format: { type: "json_object" }
  });

  const content = completion.choices[0]?.message?.content ?? "{}";
  return JSON.parse(content);
}
