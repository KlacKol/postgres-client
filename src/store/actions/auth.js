import {AUTH_ERROR, AUTH_SUCCESS, AUTH_START_LOAD, AUTH_LOGOUT, AUTH_CLEAR_ERROR} from "./actionTypes";
import {deleteRefreshToken, loginUser, registerUser} from "../../services/AuthService";
import {
    clearAvatar,
    clearIsAdmin,
    clearRefreshToken,
    clearToken, clearUserId,
    getToken, setAvatar, setIsAdmin,
    setRefreshToken,
    setToken,
    setUserId
} from "../../services/LocalStorageService";
import {history} from "../../helpers/history";
import {PATH_AUTH_LOGIN, PATH_HOME} from "../../routeList";
import jwtDecode from "jwt-decode";

export function logUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            loginUser(parameters)
                .then(({data}) => {
                    setIsAdmin(data.isAdmin);
                    setUserId(data.userId);
                    setToken(data.token);
                    setRefreshToken(data.refreshToken);
                    setAvatar(data.avatar);
                    dispatch(authSuccess(data.token, data.isAdmin));
                    history.push(PATH_HOME)
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(userError('INTERNAL ERROR' + e))
                    }
                })
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(userError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function regUser(parameters) {
    return (dispatch) => {
        try {
            dispatch(userStartLoading());
            registerUser(parameters)
                .then(({data}) => {
                    setIsAdmin(data.isAdmin);
                    setUserId(data.userId);
                    setToken(data.token);
                    setRefreshToken(data.refreshToken);
                    setAvatar(data.avatar);
                    dispatch(authSuccess(data.token, data.isAdmin));
                    history.push(PATH_HOME)
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(userError('INTERNAL ERROR' + e))
                    }
                })
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(userError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function logoutUser() {
    return (dispatch) => {
        try {
            const token = getToken();
            const {userId} = jwtDecode(token);
            deleteRefreshToken(userId)
                .then(() => {
                    clearIsAdmin();
                    clearUserId();
                    clearToken();
                    clearRefreshToken();
                    clearAvatar();
                    dispatch(logout());
                    history.push(PATH_AUTH_LOGIN)
                })
                .catch(e => helperError(dispatch, e))
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(userError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function authClearError() {
    return {
        type: AUTH_CLEAR_ERROR
    }
}

function helperError(dispatch, e) {
    if (e.response.data.message) {
        dispatch(userError(e.response.data.message));
    } else dispatch(userError(e));
}

function logout() {
    return {
        type: AUTH_LOGOUT,
    }
}

function authSuccess(user, isAdmin) {
    return {
        type: AUTH_SUCCESS,
        user,
        isAdmin
    };
}

function userStartLoading() {
    return {
        type: AUTH_START_LOAD,
    };
}

function userError(e) {
    return {
        type: AUTH_ERROR,
        error: e,
    }
}