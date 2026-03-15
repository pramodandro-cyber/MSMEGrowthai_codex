import { Router } from "express";
import { createBusiness, listBusinesses } from "../controllers/businessController";
import { authenticate } from "../middleware/auth";
import { validateBody } from "../middleware/validate";
import { businessProfileSchema } from "../types/schemas";

const router = Router();
router.use(authenticate);
router.get("/", listBusinesses);
router.post("/", validateBody(businessProfileSchema), createBusiness);

export default router;
