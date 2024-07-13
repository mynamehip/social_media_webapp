import { hostAPI } from ".";

export const getMessage = async (userId, friendId) =>
  await hostAPI.get(
    `/api/Message/GetMessage?userId=${userId}&friendId=${friendId}`
  );
