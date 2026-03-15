import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export async function selectPlan(req: AuthRequest, res: Response): Promise<void> {
  const subscription = await prisma.subscription.create({
    data: {
      userId: req.user!.id,
      plan: req.body.plan,
      status: "ACTIVE"
    }
  });

  res.status(201).json(subscription);
}
