import LLMService from "../services/LLM.service.js";

export default class LLMController {
  #LLMService;

  constructor(LLMServiceInstance = new LLMService()) {
    this.#LLMService = LLMServiceInstance;
  }

  getAllModels = async (req, res) => {
    try {
      const models = await this.#LLMService.getAllModels();
      res.status(200).send({ models });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getModelById = async (req, res) => {
    try {
      const id = req.params.id;
      const model = await this.#LLMService.getModelById(id);
      res.status(200).send({ model });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getModelByName = async (req, res) => {
    try {
      const name = req.params.name;
      const model = await this.#LLMService.getModelByName(name);
      res.status(200).send({ model });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  createModel = async (req, res) => {
    try {
      const data = req.body;
      const model = await this.#LLMService.createModel(data);
      res.status(200).send({ model });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  // updateModel = async (req, res) => {
  //   try {
  //     const id = req.params.id;
  //     const data = req.body;
  //     const model = await this.#LLMService.updateModel(id, data);
  //     res.status(200).send({ model });
  //   } catch (error) {
  //     res.status(400).send({ message: error.message });
  //   }
  // };

  deleteModel = async (req, res) => {
    try {
      const { id } = req.body.id;
      const model = await this.#LLMService.deleteModel(id);
      res.status(200).send({ model });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
}

