import types from '../actions/actionTypes';

const user = (state={}, action={}) => {
    switch(action.type) {
        case types.LOGGED_IN:
            return action.user;
            
        case types.REGISTERED:
            return action.user;

        case types.LOGGED_OUT:
            return {};
        
        default:
            return state;
    }
}

export default user;