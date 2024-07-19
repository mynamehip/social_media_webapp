import { hostAPI } from ".";

export const searchUser = async (userName) =>
  await hostAPI.get(`/api/Search/SearchUser?userName=${userName}`);
