import * as types from '../actions/actionTypes';

const login = (state={}, action={}) => {
    switch(action.type) {
        case types.LOGGED_IN:
            return action.user;
        
        default:
            return state;
    }
}

export default login;