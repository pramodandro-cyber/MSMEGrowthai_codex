import dotenv from "dotenv";

dotenv.config();

export const env = {
  port: Number(process.env.PORT ?? 8080),
  jwtSecret: process.env.JWT_SECRET ?? "change-me",
  openAiApiKey: process.env.OPENAI_API_KEY ?? "",
  razorpayKeyId: process.env.RAZORPAY_KEY_ID ?? "",
  razorpayKeySecret: process.env.RAZORPAY_KEY_SECRET ?? ""
};
