// routes/authRoutes.js
import express from "express";
import { getUserProgress, getUserScore, updateTopicStatus } from "../controller/progressController.js";
import authMiddleware from "../authMiddleware/authMiddleware.js";


const userProgressRoutes = express.Router();

userProgressRoutes.post("/update",authMiddleware, updateTopicStatus);
userProgressRoutes.post("/getscore",authMiddleware, getUserScore);
userProgressRoutes.post("/getprogress",authMiddleware, getUserProgress);

export default userProgressRoutes;
