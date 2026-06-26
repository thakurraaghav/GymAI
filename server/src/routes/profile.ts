import { Router } from "express";
import { saveProfile } from "../controllers/profileController.js";
import { authMiddleware } from "../middleware/auth.js";

export const profileRouter = Router();

profileRouter.use(authMiddleware);

profileRouter.post("/", saveProfile);