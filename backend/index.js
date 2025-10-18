// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import authRoutes from "./route/routes.js";
import connectDB from "./config/connectDb.js";
import userProgressRoutes from "./route/progressRoutes.js";
import topicsRoutes from "./route/topicsRoutes.js";
import subjectRoutes from "./route/subjectRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/user", authRoutes);
app.use("/api", userProgressRoutes);

app.use("/topic", topicsRoutes);
app.use("/subject", subjectRoutes);

app.get("/", (req, res) => {
  res.json({ message: `Server is running on port ${process.env.PORT || 4500}` });
});

const server = http.createServer(app);

const PORT = process.env.PORT || 4500;

connectDB()
  .then(() => {
    server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
    process.exit(1);
  });
