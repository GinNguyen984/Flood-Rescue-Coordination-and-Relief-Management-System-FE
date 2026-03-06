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