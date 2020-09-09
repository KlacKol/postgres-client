import {AUTH_SUCCESS, AUTH_ERROR, AUTH_START_LOAD, AUTH_LOGOUT, AUTH_CLEAR_ERROR} from "../actions/actionTypes";
import {getIsAdmin, getToken} from "../../services/LocalStorageService";


let user = getToken();
let isAdmin = getIsAdmin();
const initialState = user ? {
    loggedIn: true,
    user,
    isAdmin,
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
                isAdmin: action.isAdmin
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
        case AUTH_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case AUTH_LOGOUT:
            return {
                ...state,
                loggedIn: false,
                user: {},
                isAdmin: null
            };
        default:
            return state;
    }
};
