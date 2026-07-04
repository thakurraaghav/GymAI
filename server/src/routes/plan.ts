import { Router } from "express";
import { generatePlan, getCurrentPlan, getPlanHistory } from "../controllers/planController.js";
import { authMiddleware } from "../middleware/auth.js";

export const planRouter = Router();

planRouter.use(authMiddleware);

planRouter.post("/generate", generatePlan);
planRouter.get("/current", getCurrentPlan);
planRouter.get("/history", getPlanHistory);
