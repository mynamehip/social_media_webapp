import * as SearchAPI from "../api/searchRequest";

export const searchUser = async (userName) => {
  try {
    const response = await SearchAPI.searchUser(userName);
    return response;
  } catch (error) {
    throw error;
  }
};
