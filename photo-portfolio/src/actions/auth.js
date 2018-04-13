import * as types from './actionTypes';
import api from '../api';

// '({})' is equivalent to 'return'
const loggedIn = user => ({
    type: types.LOGGED_IN,
    user
});

export const login = credentials => dispatch => api.user.login(credentials).then(user => dispatch(loggedIn(user)));