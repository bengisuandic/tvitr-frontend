import { SET_TOKEN, SET_USER } from './types';
//token reducer

const default_state_token = "";
export const tokenReducer  = (state = default_state_token, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return state = action.payload;
        default:
            return state;
    }
}

const default_state_user = {};
export const userReducer  = (state = default_state_user, action) => {
    switch (action.type) {
        case SET_USER:
            return state = action.payload;
        default:
            return state;
    }
}