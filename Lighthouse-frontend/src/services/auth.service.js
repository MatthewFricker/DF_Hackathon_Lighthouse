import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const login = async (username, password) => {
  try {
    console.log(`${URL}/auth/login`);
    const response = await axios.post(`${URL}/auth/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
}
  export const register = async (email, username, password) => {
    try {
      const response = await axios.post(`${URL}/auth/register`, {
        email,
        username,
        password,
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
}
  
// export const updateUser = async (data) => {
//   try {
//     const response = await axios.put(`${URL}/auth/`, data);
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// }

// export const deleteUser = async (username) => {
//   try {
//     const response = await axios.delete(`${URL}/auth/`, username);
//     return response.data;
//   } catch (error) {
//     throw new Error(error);
//   }
// }
