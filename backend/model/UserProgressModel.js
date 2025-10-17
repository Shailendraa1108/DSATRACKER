// models/UserProgress.js
import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  name: String,
  level: String, // EASY / MEDIUM / HARD
  status: { type: String, default: "Pending" }, // Done / Pending
});

const userProgressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  topics: [topicSchema],
});

const UserProgress = mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
