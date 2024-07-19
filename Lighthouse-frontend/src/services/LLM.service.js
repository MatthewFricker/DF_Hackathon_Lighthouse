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