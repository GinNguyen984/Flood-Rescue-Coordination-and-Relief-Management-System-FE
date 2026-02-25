import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const loginApi = ({ phone, password }) => {
  return axios.post(
    `${API_URL}/api/User/login`,
    {
      phone: phone.trim(),
      password: password.trim(), // Loại bỏ khoảng trắng thừa nếu có
    },
    {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    }
  );
};
