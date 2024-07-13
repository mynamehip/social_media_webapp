import * as ChatAPI from "../api/chatRequest";

export const getMessage = async (userId, friendId) => {
  try {
    const response = await ChatAPI.getMessage(userId, friendId);
    return response;
  } catch (error) {
    throw error;
  }
};
