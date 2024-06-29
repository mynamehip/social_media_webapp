// import axios from "axios";
import { hostAPI } from ".";

// const API = axios.create({ baseURL: "https://localhost:7293" });

export const createPost = async (formData) => {
  let token = localStorage.getItem("userData");
  if (!token) {
    throw new Error("Don't have permission");
  }
  token = JSON.parse(token).result;

  return await hostAPI.post("/api/Post/CreatePost", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
export const getAllPost = async (pageNumber) =>
  hostAPI.get(`/api/Post/GetAllPost?pageNumber=${pageNumber}&pageSize=10`);
