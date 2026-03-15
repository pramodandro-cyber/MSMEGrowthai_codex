import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function getAdminAnalytics(_: Request, res: Response): Promise<void> {
  const [users, reports, subscriptions, schemes] = await Promise.all([
    prisma.user.count(),
    prisma.report.count(),
    prisma.subscription.count(),
    prisma.scheme.count()
  ]);

  res.json({ users, reports, subscriptions, schemes });
}
