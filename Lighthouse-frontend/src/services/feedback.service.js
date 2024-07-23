import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const getFeedback = async () => {
  try {
    const response = await axios.get(`${URL}/feedback/all`);
    return response.data.feedback;
  } catch (error) {
    return error;
  }
}

export const createFeedback = async (feedback) => {
  try {
    const response = await axios.post(`${URL}/feedback`, feedback);
    return response.data;
  } catch (error) {
    return error;
  }
}

export const deleteFeedback = async (id) => {
  try {
    const response = await axios.delete(`${URL}/feedback`, { data: { id } });
    return response.data;
  } catch (error) {
    return error;
  }
}