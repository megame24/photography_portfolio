import { combineReducers } from "redux";
import user from "./userReducer";
import resetPassword from "./resetPasswordReducer";

export default combineReducers({
  user,
  resetPassword
});
