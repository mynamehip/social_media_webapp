import { hostAPI } from ".";

export const getMessage = async (userId, friendId) =>
  await hostAPI.get(
    `/api/Message/GetMessage?userId=${userId}&friendId=${friendId}`
  );

export const getUnReaded = async (userId) =>
  await hostAPI.get(`/api/Message/UnReadMessage?userId=${userId}`);

export const getChatHistory = async (userId) =>
  await hostAPI.get(`/api/Message/ChatHistory?userId=${userId}`);
