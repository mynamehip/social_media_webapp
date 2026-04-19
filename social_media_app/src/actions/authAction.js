import * as AuthAPI from "../api/authRequest";
import { toast, Slide } from "react-toastify";

export const signIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthAPI.signIn(formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
    dispatch({ type: "AUTH_FAILED" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthAPI.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", payload: data });
    navigate("/");
  } catch (error) {
    console.log(error);
    toast.error(error.response.data, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
      transition: Slide,
    });
    dispatch({ type: "AUTH_FAILED" });
  }
};

export const signOut = (navigate) => (dispatch) => {
  dispatch({ type: "SIGN_OUT" });
  navigate("/");
};
