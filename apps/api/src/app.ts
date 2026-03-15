import cors from "cors";
import express from "express";
import helmet from "helmet";
import multer from "multer";
import authRoutes from "./routes/authRoutes";
import businessRoutes from "./routes/businessRoutes";
import analysisRoutes from "./routes/analysisRoutes";
import schemeRoutes from "./routes/schemeRoutes";
import subscriptionRoutes from "./routes/subscriptionRoutes";
import adminRoutes from "./routes/adminRoutes";
import { apiLimiter } from "./middleware/rateLimiter";

const app = express();
const upload = multer({
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_, file, cb) => {
    if (["application/pdf", "image/png", "image/jpeg"].includes(file.mimetype)) {
      cb(null, true);
      return;
    }
    cb(new Error("Unsupported file type"));
  }
});

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

app.get("/health", (_, res) => res.json({ status: "ok" }));
app.post("/api/uploads", upload.single("document"), (_, res) => res.status(201).json({ message: "Uploaded" }));
app.use("/api/auth", authRoutes);
app.use("/api/businesses", businessRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/schemes", schemeRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/admin", adminRoutes);

export default app;
