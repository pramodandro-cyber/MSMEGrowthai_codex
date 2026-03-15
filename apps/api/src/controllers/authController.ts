import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../config/prisma";
import { env } from "../config/env";

export async function oauthLogin(req: Request, res: Response): Promise<void> {
  const { email, name, googleId } = req.body;
  const user = await prisma.user.upsert({
    where: { email },
    update: { name, googleId },
    create: { email, name, googleId }
  });

  const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, env.jwtSecret, {
    expiresIn: "7d"
  });

  res.json({ token, user });
}
