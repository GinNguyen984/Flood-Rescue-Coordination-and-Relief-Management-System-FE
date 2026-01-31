import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginApi = ({ phone, password }) => {
  return axios.post(`${API_URL}/api/auth/login`, {
    phone,
    password,
  });
};

