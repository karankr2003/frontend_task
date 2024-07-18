// src/reducers/index.js
import { combineReducers } from "redux";
// Import other reducers here
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userState: userReducer, // Use your actual reducers here
});

export default rootReducer;
