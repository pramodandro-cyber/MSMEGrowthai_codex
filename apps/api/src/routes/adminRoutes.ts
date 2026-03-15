import { Router } from "express";
import { getAdminAnalytics } from "../controllers/adminController";
import { authenticate, requireAdmin } from "../middleware/auth";

const router = Router();
router.get("/analytics", authenticate, requireAdmin, getAdminAnalytics);

export default router;
