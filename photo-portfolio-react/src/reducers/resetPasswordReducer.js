import types from "../actions/actionTypes";

const resetPassword = (state = {}, action = {}) => {
  switch (action.type) {
    case types.RESET_PASSWORD_VERIFIED:
      return action.resetData;

    default:
      return state;
  }
};

export default resetPassword;
