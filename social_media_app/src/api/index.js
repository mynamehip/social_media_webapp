import axios from "axios";

export const hostURL = "https://localhost:7293";
export const hostAPI = axios.create({ baseURL: "https://localhost:7293" });
