import types from "./actionTypes";
import api from "../api";

// '({})' is equivalent to 'return'
export const loggedIn = user => ({
  type: types.LOGGED_IN,
  user
});

export const loggedOut = () => ({
  type: types.LOGGED_OUT
});

export const registered = user => ({
  type: types.REGISTERED,
  user
});

export const resetPasswordVerified = resetData => ({
  type: types.RESET_PASSWORD_VERIFIED,
  resetData
});

export const passwordReset = () => ({
  type: types.RESET_PASSWORD
});

export const login = credentials => dispatch =>
  api.user.login(credentials).then(user => {
    localStorage.photoPortfolioJWT = user.token;
    dispatch(loggedIn(user));
  });

export const logout = () => dispatch => {
  localStorage.removeItem("photoPortfolioJWT");
  dispatch(loggedOut());
};

export const register = credentials => dispatch =>
  api.user.register(credentials).then(user => {
    localStorage.photoPortfolioJWT = user.token;
    dispatch(registered(user));
  });

export const verifyPassword = credentials => dispatch =>
  api.user.verifyPassword(credentials).then(resetData => {
    dispatch(resetPasswordVerified(resetData));
  });

export const resetPassword = credentials => dispatch =>
  api.user.resetPassword(credentials).then(() => {
    dispatch(passwordReset());
  });