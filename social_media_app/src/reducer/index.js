import { combineReducers } from "redux";

import authReducer from "./authReducer";
import followingReducer from "./followReducer";

export const reducers = combineReducers({ authReducer, followingReducer });
