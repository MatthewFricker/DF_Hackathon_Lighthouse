import AuthService from "../services/Auth.service.js";

export default class AuthController {
  #authService;

  constructor(authService = new AuthService()) {
    this.#authService = authService;
  }

  register = async (req, res) => {
    const {email, username, password } = req.body;
    try {
      const user = await this.#authService.register({email, username, password });
      res
        .header("X-Access-Token", user.accessToken)
        .status(200)
        .send({ message: `Registration successful`, user });
    } catch (error) {
      res.status(400).send({ message: error.message, user: null });
    }
  };

  login = async (req, res) => {
    const { username, password } = req.body;
    try {
      const user = await this.#authService.login({ username, password });
      res
        .header("X-Access-Token", user.accessToken)
        .status(200)
        .send({ message: `Login successful`, user });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  };

  getUser = async (req, res) => {
    try {
      const username = req.params.user;
      const user = await this.#authService.getUser(username);
      res.status(200).send({ user });
    } catch (error) {
      res.status(401).send({ message: error.message });
    }
  };

  // updateUser = async (req, res) => {
  //   try {
  //     const username = req.body.username;
  //     const data = req.body;
  //     const user = await this.#authService.updateUser(username, data);
  //     res.status(200).send({ user });
  //   } catch (error) {
  //     res.status(400).send({ message: error.message });
  //   }
  // };

  // deleteUser = async (req, res) => {
  //   try {
  //     const username = req.body.username;
  //     const user = await this.#authService.deleteUser(username);
  //     res.status(200).send({ message: `${user} deleted` });
  //   } catch (error) {
  //     res.status(400).send({ message: error.message });
  //   }
  // };
}
