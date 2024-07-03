import * as PostAPI from "../api/postRequest";

export const createPost = async (formData) => {
  try {
    const response = await PostAPI.createPost(formData);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getAllPost = async (pageNumber) => {
  try {
    const response = await PostAPI.getAllPost(pageNumber);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getPostByUser = async (userId, pageNumber) => {
  try {
    const response = await PostAPI.getPostByUser(userId, pageNumber);
    return response;
  } catch (error) {
    throw error;
  }
};

export const votePost = async (data) => {
  try {
    const response = await PostAPI.votePost(data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const updateVote = async (data) => {
  try {
    const response = await PostAPI.updateVote(data);
    return response;
  } catch (error) {
    throw error;
  }
};
export const deleteVote = async (userId, postId) => {
  try {
    const response = await PostAPI.deleteVote(userId, postId);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getAllVote = async (postId) => {
  try {
    const response = await PostAPI.getAllVote(postId);
    return response;
  } catch (error) {
    throw error;
  }
};
export const getVoteById = async (userId, postId) => {
  try {
    const response = await PostAPI.getVoteById(userId, postId);
    return response;
  } catch (error) {
    throw error;
  }
};
