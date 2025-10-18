import subjectModels from "../model/subjectmodels.js";
import topicModel from "../model/topicsmodel.js";

export const createSubject = async (req, res) => {
  try {
    const { name } = req.body;

    const subject = new subjectModels({ name });
    await subject.save();

    return res.status(201).json({
      message: "Subject created successfully",
      subject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


export const getSubjectsWithTopics = async (req, res) => {
  try {
    const subjects = await subjectModels.find();
    const subjectsWithTopics = await Promise.all(
      subjects.map(async (subject) => {
        const topics = await topicModel.find({ subject: subject._id });
        return {
          _id: subject._id,
          name: subject.name,
          topics,
        };
      })
    );

    return res.status(200).json(subjectsWithTopics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};
export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;

    const subject = await subjectModels.findById(id);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    // Delete all topics under this subject
    await topicModel.deleteMany({ subject: id });

    // Delete the subject itself
    await subjectModels.findByIdAndDelete(id);

    return res.status(200).json({ message: "Subject and related topics deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};


