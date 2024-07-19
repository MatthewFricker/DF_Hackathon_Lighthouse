import { Router } from 'express';
import LLMController from '../controllers/LLM.controller.js';


export default class LLMRoutes {
  #router;
  #controller;
  #routeStartPoint = "/";

  constructor() {
    this.#router = new Router();
    this.#controller = new LLMController();
    this.#initialiseRoutes();
  }

  #initialiseRoutes = () => {
    this.#router.get("/", this.#controller.getAllModels);
    this.#router.get("/:id", this.#controller.getModelById);
    this.#router.get("/:name", this.#controller.getModelByName);
    this.#router.post("/", this.#controller.createModel);
    // this.#router.put("/", this.#controller.updateModel);
    // this.#router.delete("/", this.#controller.deleteModel);
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}