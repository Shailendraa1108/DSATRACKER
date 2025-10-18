
import axios from "axios";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:4500";

export const fetchDataFromApi = async (url) => {
  try {
    const token = localStorage.getItem("token") || ""; 
    const res = await axios.get(`${API_URL}${url}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return res.data;
  } catch (err) {
    console.error("API fetch error:", err.response?.data || err.message || err);
    return null;
  }
};

export const postData = async (url, formData, token) => {
  
  try {
    const response = await axios.post(`${API_URL}${url}`, formData, {
      headers: {
        Authorization: `Bearer ${token || localStorage.getItem("token") || ""}`,
        "Content-Type": "application/json",
      },
    });
    return { success: true, ...response.data };
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "Something went wrong",
    };
  }
};


export const deleteData = async (url, image) => {
  const params = {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem("accesstoken")}`,
      'Content-Type': 'application/json',
    },
  
  };

  try {
    const res = await axios.delete(`${API_URL}${url}`, params);
    console.log(res);
    return res;
  } catch (err) {
    console.error("Delete error:", err.response?.data || err.message);
    throw err;
  }
};