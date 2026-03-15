import { Router } from "express";
import { generateFundingReport, listReports } from "../controllers/analysisController";
import { authenticate } from "../middleware/auth";

const router = Router();
router.use(authenticate);
router.get("/reports", listReports);
router.post("/reports/:businessId", generateFundingReport);

export default router;
