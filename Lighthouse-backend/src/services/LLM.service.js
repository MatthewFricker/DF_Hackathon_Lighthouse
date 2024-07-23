import LLM from "../models/LLM.model.js";

export default class LLMService {
  getAllModels = async () => {
    try {
      return await LLM.find();
    } catch (e) {
      throw new Error(e);
    }
  };

  getModelById = async (id) => {
    try {
      const model = await LLM.findById({ id });
      return model;
    } catch (e) {
      throw new Error(e);
    }
  };

  getModelByName = async (name) => {
    try {
      const model = await LLM.findOne({ name });
      return model;
    } catch (e) {
      throw new Error(e);
    }
  }
  createModel = async (data) => {
    try {
      const model = new LLM(data);
      await model.save();
      return model;
    } catch (e) {
      throw new Error(e);
    }

  }
  // updateModel = async (id, data) => {
  //   return await LLM.findByIdAndUpdate(id, data, { new: true });
  // };

  deleteModel = async (id) => {
    try {
      return await LLM.findByIdAndDelete(id);
    } catch (e) {
      throw new Error(e);
    }
  };
}