import { hostAPI } from ".";

export const signIn = (formData) => hostAPI.post("/api/Auth/SignIn", formData);
export const signUp = (formData) => hostAPI.post("/api/Auth/SignUp", formData);
