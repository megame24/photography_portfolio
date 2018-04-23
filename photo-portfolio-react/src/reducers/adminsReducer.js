import types from "../actions/actionTypes";

const admins = (state = [], action = {}) => {
  switch (action.type) {
    case types.LIST_OF_ADMINS:
      return action.admins;

    default:
      return state;
  }
};

export default admins;
