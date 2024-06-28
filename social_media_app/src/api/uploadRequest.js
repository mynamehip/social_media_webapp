import axios from "axios";

const API = axios.create({ baseURL: "https://localhost:7293" });
const token = localStorage.getItem("userData");

export const createPost = (formData) =>
  API.post("/api/Post/CreatePost", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token.result}`,
    },
  });
