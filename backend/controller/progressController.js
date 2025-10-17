import UserProgress from "../model/UserProgressModel.js";



export const getUserProgress = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await UserProgress.findOne({ userId });
    res.json(progress || { topics: [] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const updateTopicStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const { topicName, level, status } = req.body;

    let userProgress = await UserProgress.findOne({ userId });

    if (!userProgress) {
      userProgress = new UserProgress({ userId, topics: [] });
    }

    const topicIndex = userProgress.topics.findIndex(t => t.name === topicName);

    if (topicIndex !== -1) {
      userProgress.topics[topicIndex].status = status;
    } else {
      userProgress.topics.push({ name: topicName, level, status });
    }

    await userProgress.save();
    res.json({ success: true, progress: userProgress });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const getUserScore = async (req, res) => {
  try {
    const { userId } = req.params;
    const progress = await UserProgress.findOne({ userId });

    if (!progress) return res.json({ EASY: 0, MEDIUM: 0, HARD: 0 });

    const scores = { EASY: 0, MEDIUM: 0, HARD: 0 };
    const counts = { EASY: 0, MEDIUM: 0, HARD: 0 };

    progress.topics.forEach(topic => {
      counts[topic.level] = (counts[topic.level] || 0) + 1;
      if (topic.status === "Done") scores[topic.level] += 1;
    });

    const percent = {
      EASY: counts.EASY ? Math.round((scores.EASY / counts.EASY) * 100) : 0,
      MEDIUM: counts.MEDIUM ? Math.round((scores.MEDIUM / counts.MEDIUM) * 100) : 0,
      HARD: counts.HARD ? Math.round((scores.HARD / counts.HARD) * 100) : 0,
    };

    res.json(percent);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
