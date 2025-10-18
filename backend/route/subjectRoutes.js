// routes/authRoutes.js
import express from "express";
import authMiddleware from "../authMiddleware/authMiddleware.js";


import { createSubject, deleteSubject, getSubjectsWithTopics } from "../controller/subjectcontroller.js";

const subjectRoutes = express.Router();

subjectRoutes.post("/create", createSubject);
subjectRoutes.get("/get", getSubjectsWithTopics);
subjectRoutes.delete("/delete/:id", deleteSubject);


export default subjectRoutes;
