const authReducer = (
  state = { data: null, loading: false, error: false },
  action
) => {
  switch (action.type) {
    case "AUTH_START":
      return {
        ...state,
        loading: true,
        error: false,
      };
    case "AUTH_SUCCESS":
      localStorage.setItem("userData", JSON.stringify(action?.data));
      console.log(action.data);
      return {
        ...state,
        data: action.data,
        loading: false,
        error: false,
      };
    case "AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
