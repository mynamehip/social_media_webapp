import * as ChatAPI from "../api/chatRequest";

export const getMessage = async (userId, friendId) => {
  try {
    const response = await ChatAPI.getMessage(userId, friendId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getUnReaded = async (userId) => {
  try {
    const response = await ChatAPI.getUnReaded(userId);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getChatHistory = async (userId) => {
  try {
    const response = await ChatAPI.getChatHistory(userId);
    return response;
  } catch (error) {
    throw error;
  }
};
