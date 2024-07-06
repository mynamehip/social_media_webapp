const authReducer = (
  state = { data: { result: null, user: null }, loading: false, error: false },
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
      localStorage.setItem("userData", JSON.stringify(action?.payload));
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case "AUTH_FAILED":
      return {
        ...state,
        loading: false,
        error: true,
      };
    case "UPDATE_USER":
      return {
        ...state,
        data: {
          ...state.data,
          user: action.payload,
        },
        loading: false,
        error: false,
      };
    default:
      return { ...state };
  }
};

export default authReducer;
