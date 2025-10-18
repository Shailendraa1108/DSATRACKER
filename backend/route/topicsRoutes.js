// routes/authRoutes.js
import express from "express";
import authMiddleware from "../authMiddleware/authMiddleware.js";

import { createTopic, deleteTopic } from "../controller/topicController.js";

const topicsRoutes = express.Router();

topicsRoutes.post("/create", createTopic);
topicsRoutes.delete("/:id", deleteTopic);


export default topicsRoutes;
