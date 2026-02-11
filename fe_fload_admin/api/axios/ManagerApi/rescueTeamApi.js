// src/api/rescueTeamApi.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getAllRescueTeams = () => {
  return axios.get(`${API_URL}/api/RescueTeams`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

// API mới: Lấy danh sách thành viên của một đội cứu hộ
export const getRescueTeamMembers = (teamId) => {
  return axios.get(`${API_URL}/api/rescueteams/${teamId}/members`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};
export const deleteTeamMember = (teamId, userId) => {
    return axios.delete(`${API_URL}/api/rescueteams/${teamId}/members/${userId}`, {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/json",
      },
    });
  };