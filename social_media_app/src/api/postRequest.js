import axios from "axios";

const API = axios.create({ baseURL: "https://localhost:7293" });

export const createPost = async (formData) => {
  let token = localStorage.getItem("userData");
  if (!token) {
    throw new Error("Don't have permission");
  }
  token = JSON.parse(token).result;

  try {
    const response = await API.post("/api/Post/CreatePost", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
