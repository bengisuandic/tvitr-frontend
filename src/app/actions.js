import {  SET_TOKEN, SET_USER } from "./types";

export const setToken = (token) => {
    return{
        type: SET_TOKEN,
        payload: token
    };
};

export const setUser = (user) => {
    return{
        type: SET_USER,
        payload: user
    };
};