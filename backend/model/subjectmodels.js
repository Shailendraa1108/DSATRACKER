import mongoose from "mongoose";

const subjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

const subjectModels = mongoose.model("Subject", subjectSchema);
export default subjectModels