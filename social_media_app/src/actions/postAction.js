import * as UpLoadAPI from "../api/uploadRequest";

export const createPost = (formData) => async (dispatch) => {
  dispatch({ type: "CREATE_START" });
  try {
    await UpLoadAPI.createPost(formData);
    dispatch({ type: "CREATE_SUCCESS" });
  } catch (error) {
    dispatch({ type: "CREATE_FAILED" });
  }
};
