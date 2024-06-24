import axios from "axios";

const API = axios.create({ baseURL: "https://localhost:7293" });

export const signIn = (formData) => API.post("/api/Auth/SignIn", formData);
export const signUp = (formData) => API.post("/api/Auth/SignUp", formData);
