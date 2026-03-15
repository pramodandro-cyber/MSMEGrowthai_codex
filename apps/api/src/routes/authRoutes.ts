import { Router } from "express";
import { oauthLogin } from "../controllers/authController";
import { validateBody } from "../middleware/validate";
import { oauthLoginSchema } from "../types/schemas";

const router = Router();
router.post("/google", validateBody(oauthLoginSchema), oauthLogin);

export default router;
