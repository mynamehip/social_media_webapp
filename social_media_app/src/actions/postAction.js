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
