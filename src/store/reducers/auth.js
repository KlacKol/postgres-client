import {AUTH_SUCCESS, AUTH_ERROR, AUTH_START_LOAD, AUTH_LOGOUT} from "../actions/actionTypes";
import {getToken} from "../../services/LocalStorageService";


let user = getToken();
const initialState = user ? {
    loggedIn: true,
    user,
    loading: false,
    error: null
} : {
    loggedIn: false,
    user: {},
    loading: false,
    error: null
};

export default function userReducer(state = initialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state,
                loggedIn: true,
                loading: false,
                user: action.user,
                error: null
            };
        case AUTH_START_LOAD:
            return {
                ...state,
                loading: true,
            };
        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case AUTH_LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: {}
            };
        default:
            return state;
    }
};
