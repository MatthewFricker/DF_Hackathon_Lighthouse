import { Router } from 'express';
import FeedbackController from '../controllers/Feedback.controller.js';

export default class FeedbackRoutes {
  #router;
  #controller;
  #routeStartPoint = "/feedback";

  constructor() {
    this.#router = new Router();
    this.#controller = new FeedbackController();
    this.#initialiseRoutes();
  }

  #initialiseRoutes = () => {
    this.#router.get("/all", this.#controller.getAllFeedback);
    this.#router.post("/", this.#controller.createFeedback);
    this.#router.delete("/", this.#controller.deleteFeedback);
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}