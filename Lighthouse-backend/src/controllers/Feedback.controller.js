import FeedbackService from "../services/Feedback.service.js";

export default class FeedbackController {
  #feedbackService;

  constructor(feedbackService = new FeedbackService()) {
    this.#feedbackService = feedbackService;
  }

  createFeedback = async (req, res) => {
    try {
      const data = req.body;
      const feedback = await this.#feedbackService.createFeedback(data);
      res.status(200).send({ feedback });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getAllFeedback = async (req, res) => {
    try {
      const feedback = await this.#feedbackService.getAllFeedback();
      res.status(200).send({ feedback });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  deleteFeedback = async (req, res) => {
    try {
      const { id } = req.body.id;
      const feedback = await this.#feedbackService.deleteFeedback(id);
      res.status(200).send({ feedback });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

}