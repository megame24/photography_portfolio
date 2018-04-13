import * as types from './actionTypes';
import api from '../api';

const loggedIn = user => {
    return {
        type: types.LOGGED_IN,
        user
    };
}

export const login = data => {
    const user = api.login(data);
    return (dispatch) => 
        dispatch(loggedIn(user));
}