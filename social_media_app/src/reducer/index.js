import { combineReducers } from "redux";

import authReducer from "./authReducer";
import followingReducer from "./followReducer";
import userReducer from "./userReducer";

export const reducers = combineReducers({
  authReducer,
  followingReducer,
  userReducer,
});
