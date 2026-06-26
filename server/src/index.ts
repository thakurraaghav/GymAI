import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import { planRouter } from './routes/plan.js';
import { profileRouter } from './routes/profile.js';
import { authRouter } from './routes/auth.js';

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

//API routes

app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/plan", planRouter);

// Global Error Handler
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.error("Unhandled Error:", err);
    res.status(500).json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port: ${PORT}`);
});