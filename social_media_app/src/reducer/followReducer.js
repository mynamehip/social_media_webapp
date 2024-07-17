const initialState = [];

const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FOLLOWING":
      return action.payload;
    case "ADD_FOLLOWING":
      console.log(action.payload);
      return [...state, action.payload];
    case "REMOVE_FOLLOWING":
      return state.filter((follow) => follow.id !== action.payload);
    default:
      return state;
    case "SIGN_OUT":
      return [];
  }
};

export default followingReducer;
