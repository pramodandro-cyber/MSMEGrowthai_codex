import { Router } from "express";
import { selectPlan } from "../controllers/subscriptionController";
import { authenticate } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { planSelectionSchema } from "../types/schemas";

const router = Router();
router.use(authenticate);
router.post("/select-plan", validateBody(planSelectionSchema), selectPlan);

export default router;
