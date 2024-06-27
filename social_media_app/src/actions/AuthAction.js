import * as AuthAPI from "../api/authRequest";

export const signIn = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthAPI.signIn(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};

export const signUp = (formData, navigate) => async (dispatch) => {
  dispatch({ type: "AUTH_START" });
  try {
    const { data } = await AuthAPI.signUp(formData);
    dispatch({ type: "AUTH_SUCCESS", data: data });
    navigate("/");
  } catch (error) {
    console.log(error);
    dispatch({ type: "AUTH_FAILED" });
  }
};
