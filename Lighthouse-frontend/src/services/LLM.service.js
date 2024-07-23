import axios from 'axios';

const URL = import.meta.env.VITE_API_URL;

export const getModels = async () => {
  try {
    const response = await axios.get(`${URL}/`);
    return response.data.models;
  } catch (error) {
    return error;
  }
};

export const createModel = async (model) => {
  try {
    console.log(model);
    const response = await axios.post(`${URL}/`, model);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteModel = async (id) => {
  try {
    const response = await axios.delete(`${URL}/`, id);
    return response.data;
  } catch (error) {
    return error;
  }
}