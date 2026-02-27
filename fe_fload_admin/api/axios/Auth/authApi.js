// src/api/authApi.js

import axiosInstance from "../../axiosInstance";

export const loginApi = async ({ phone, password }) => {

  const response = await axiosInstance.post(
    "/api/User/login",
    {
      phone: phone.trim(),
      password: password.trim(),
    }
  );

  return response.data;
};