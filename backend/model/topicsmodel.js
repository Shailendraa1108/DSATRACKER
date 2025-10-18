import mongoose from "mongoose";

const topicSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  name: { type: String, required: true },
  leetcode: String,
  youtube: String,
  article: String,
  level: { type: String, enum: ["EASY", "MEDIUM", "HARD"] },
  status: { type: String, enum: ["Done", "Pending"], default: "Pending" },
});

const topicModel =mongoose.model("Topic", topicSchema);
export default topicModel