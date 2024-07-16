import { Router } from 'express';
import AuthController from '../controllers/Auth.controller.js';
import AuthMiddleware from '../middleware/Auth.middleware.js';

export default class AuthRoutes {
  #router;
  #controller;
  #routeStartPoint = "/auth";
  #authMiddleware;

  constructor() {
    this.#router = new Router();
    this.#controller = new AuthController();
    this.#authMiddleware = new AuthMiddleware();
    this.#initialiseRoutes();
  }

  #initialiseRoutes = () => {
    this.#router.post("/register", this.#controller.register);
    this.#router.post("/login", this.#controller.login);
    this.#router.get("/:user", this.#controller.getUser);
    // this.#router.put("/", this.#controller.updateUser);
    // this.#router.delete("/", this.#controller.deleteUser);
    // this.#router.put("/:user", this.#authMiddleware.verify, this.#controller.updateUser);
  };

  getRouter = () => {
    return this.#router;
  };

  getRouteStartPoint = () => {
    return this.#routeStartPoint;
  };
}