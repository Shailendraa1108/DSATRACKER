// routes/authRoutes.js
import express from "express";
import authMiddleware from "../authMiddleware/authMiddleware.js";
import { login, logoutUser, register } from "../controller/controller.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.post("/logout",authMiddleware,logoutUser);

export default authRoutes;
