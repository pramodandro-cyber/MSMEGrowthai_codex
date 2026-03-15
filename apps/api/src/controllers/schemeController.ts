import { Request, Response } from "express";
import { prisma } from "../config/prisma";

export async function listSchemes(_: Request, res: Response): Promise<void> {
  const schemes = await prisma.scheme.findMany({ orderBy: { schemeName: "asc" } });
  res.json(schemes);
}

export async function createScheme(req: Request, res: Response): Promise<void> {
  const scheme = await prisma.scheme.create({ data: req.body });
  res.status(201).json(scheme);
}
