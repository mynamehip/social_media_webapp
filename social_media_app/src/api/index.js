import axios from "axios";

export const token = () => {
  let tokenData = localStorage.getItem("userData");
  if (!tokenData) {
    throw new Error("Don't have permission");
  }
  return JSON.parse(tokenData).result;
};

const defaultApiUrl =
  process.env.NODE_ENV === "development"
    ? "https://localhost:7293"
    : "https://scmwaAPI.somee.com";

export const hostURL = process.env.REACT_APP_API_URL || defaultApiUrl;
export const hostAPI = axios.create({ baseURL: hostURL });
