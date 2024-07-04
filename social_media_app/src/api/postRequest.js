// import axios from "axios";
import { hostAPI, token } from ".";

// const API = axios.create({ baseURL: "https://localhost:7293" });

export const createPost = async (formData) => {
  return await hostAPI.post("/api/Post/CreatePost", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token()}`,
    },
  });
};
export const getAllPost = async (pageNumber) =>
  await hostAPI.get(
    `/api/Post/GetAllPost?pageNumber=${pageNumber}&pageSize=10`
  );
export const getPostByUser = async (userId, pageNumber) =>
  await hostAPI.get(
    `/api/Post/GetPostByUser?userId=${userId}&pageNumber=${pageNumber}&pageSize=10`
  );

export const votePost = async (data) => {
  return await hostAPI.post("/api/Post/VotePost", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  });
};

export const updateVote = async (data) => {
  return await hostAPI.put("/api/Post/UpdateVote", data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token()}`,
    },
  });
};
export const deleteVote = async (userId, postId) => {
  return await hostAPI.delete(
    `/api/Post/DeleteVote?userId=${userId}&postId=${postId}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
};
export const getAllVote = async (postId) =>
  hostAPI.get(`/api/Post/GetAllVote?postId=${postId}`);
export const getVoteById = async (userId, postId) => {
  return await hostAPI.get(
    `/api/Post/GetVoteById?postId=${postId}&userId=${userId}`,
    {
      headers: {
        Authorization: `Bearer ${token()}`,
      },
    }
  );
};
