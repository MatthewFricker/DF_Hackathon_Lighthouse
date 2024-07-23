import Feedback from "../models/Feedback.model.js";
import User from "../models/User.model.js";

export default class FeedbackService {
  createFeedback = async (feedbackData) => {
    try {
      const user = await User.findById(feedbackData.userId);
      console.log(user);
      if (!user) {
        throw new Error("User not found");
      }
      const feedback = new Feedback({
        ...feedbackData,
        username: user.username,
        email: user.email,
      });
      await feedback.save();
      return feedback;
    } catch (e) {
      throw new Error(e);
    }
  };

  getAllFeedback = async () => {
    try {
      return await Feedback.find();
    } catch (e) {
      throw new Error(e);
    }
  };

  deleteFeedback = async (id) => {
    try {
      console.log(id);
      return await Feedback.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e);
    }
  };
}
