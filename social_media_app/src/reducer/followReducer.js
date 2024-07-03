const initialState = [];

const followingReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_FOLLOWING":
      return action.payload;
    case "ADD_FOLLOWING":
      return [...state, action.payload];
    case "REMOVE_FOLLOWING":
      return state.filter((follow) => follow.id !== action.payload);
    default:
      return state;
  }
};

export default followingReducer;