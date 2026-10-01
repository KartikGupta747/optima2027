import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; // Access environment variable

export const submitQuery = async (queryData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/admin/query`, queryData);
    return response.data;
  } catch (error) {
    console.error("Error submitting query:", error);
    throw error;
  }
};







