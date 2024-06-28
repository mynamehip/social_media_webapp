const postReducer = (state = { loadind: false, error: false }, action) => {
  switch (action.type) {
    case "CREATE_START":
      return { ...state, loadind: true, error: false };
    case "CREATE_SUCCESS":
      return { ...state, loading: false, error: false };
    case "CREATE_FAILED":
      return { ...state, loading: false, error: true };
    default:
      return state;
  }
};

export default postReducer;
