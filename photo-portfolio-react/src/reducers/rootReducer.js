import { combineReducers } from "redux";
import user from "./userReducer";
import resetPassword from "./resetPasswordReducer";
import admins from "./adminsReducer";

export default combineReducers({
  user,
  resetPassword,
  admins
});
