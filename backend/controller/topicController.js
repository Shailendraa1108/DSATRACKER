
import subjectModels from "../model/subjectmodels.js";
import topicModel from "../model/topicsmodel.js";

// Create a new Topic
export const createTopic = async (req, res) => {
  try {
    const { subject_id, name, leetcode, youtube, article, level, status } = req.body;

    // Check if subject exists
    const subject = await subjectModels.findById(subject_id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Create topic
    const topic = new topicModel({
      subject: subject_id,
      name,
      leetcode,
      youtube,
      article,
      level,
      status,
    });

    await topic.save();

    return res.status(201).json({
      message: "Topic created successfully",
      topic,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTopic = async (req, res) => {
  try {
    const { id } = req.params;

    const topic = await topicModel.findById(id);
    if (!topic) {
      return res.status(404).json({ message: "Topic not found" });
    }

    await topicModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Topic deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};




