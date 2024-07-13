const userReducer = (state = {}, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return action.payload;
    case "SIGN_OUT":
      return null;
    default:
      return state;
  }
};

export default userReducer;
