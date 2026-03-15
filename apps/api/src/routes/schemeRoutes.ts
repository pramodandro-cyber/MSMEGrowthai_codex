import { Router } from "express";
import { createScheme, listSchemes } from "../controllers/schemeController";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();
router.get("/", authenticate, listSchemes);
router.post("/", authenticate, requireAdmin, createScheme);

export default router;
