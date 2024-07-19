import axios from "axios";

export const token = () => {
  let tokenData = localStorage.getItem("userData");
  if (!tokenData) {
    throw new Error("Don't have permission");
  }
  return JSON.parse(tokenData).result;
};

export const hostURL = "https://scmwaAPI.somee.com";
export const hostAPI = axios.create({ baseURL: "https://scmwaAPI.somee.com" });
