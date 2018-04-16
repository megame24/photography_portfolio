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

export const registered = () => ({
  type: types.REGISTERED
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
  api.user.register(credentials).then(() => {
    dispatch(registered());
  });
