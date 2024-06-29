// import axios from "axios";

import { hostAPI } from ".";

// const API = axios.create({ baseURL: "https://localhost:7293" });

export const signIn = (formData) => hostAPI.post("/api/Auth/SignIn", formData);
export const signUp = (formData) => hostAPI.post("/api/Auth/SignUp", formData);
