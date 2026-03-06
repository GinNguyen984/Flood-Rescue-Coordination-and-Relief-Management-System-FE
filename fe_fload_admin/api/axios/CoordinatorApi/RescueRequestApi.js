import axiosInstance from "../../axiosInstance";

/* ================= GET PENDING REQUEST ================= */

export const getPendingRescueRequests = async () => {

  try {

    const response = await axiosInstance.get(
      "/api/RescueRequest/PendingRequest"
    );

    return response.data;

  }
  catch (error) {

    console.error("Lỗi lấy danh sách yêu cầu:", error);

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Không thể tải danh sách yêu cầu cứu hộ"
    );

  }

};
export const getUrgencyLevels = async () => {

  try {

    const response = await axiosInstance.get(
      "/api/urgency-levels"
    );

    return response.data;

  }
  catch (error) {

    console.error("Lỗi lấy mức độ khẩn cấp:", error);

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Không thể tải danh sách mức độ khẩn cấp"
    );

  }

};
export const getDispatchingRescueRequests = async () => {

  try {

    const response = await axiosInstance.get(
      "/api/RescueRequest/DispatchingRequest"
    );

    return response.data;

  }
  catch (error) {

    console.error("Lỗi lấy danh sách đang điều phối:", error);

    throw new Error(
      error.response?.data?.message ||
      error.message ||
      "Không thể tải danh sách đang điều phối"
    );

  }

};