import { Router } from "express";
import { generatePlan, getCurrentPlan } from "../controllers/planController.js";
import { authMiddleware } from "../middleware/auth.js";

export const planRouter = Router();

planRouter.use(authMiddleware);

planRouter.post("/generate", generatePlan);
planRouter.get("/current", getCurrentPlan);
