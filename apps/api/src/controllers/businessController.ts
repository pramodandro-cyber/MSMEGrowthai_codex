import { Response } from "express";
import { prisma } from "../config/prisma";
import { AuthRequest } from "../middleware/auth";

export async function createBusiness(req: AuthRequest, res: Response): Promise<void> {
  const business = await prisma.business.create({
    data: {
      ...req.body,
      userId: req.user!.id
    }
  });
  res.status(201).json(business);
}

export async function listBusinesses(req: AuthRequest, res: Response): Promise<void> {
  const businesses = await prisma.business.findMany({ where: { userId: req.user!.id } });
  res.json(businesses);
}
