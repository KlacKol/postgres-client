import {
    MAP_ERROR,
    MAP_SUCCESS_GET,
    MAP_START_LOAD,
    MAP_END_LOAD,
    MAP_CLEAR_MARKER,
    MAP_CLEAR_ERROR, MAP_ADD_CENTER, ADMIN_GET_USERS, MAP_DELETE_MARKER, ADMIN_DELETE_USER
} from "./actionTypes";
import {createMarker, getAllMarkersById, searchOnDate, deleteMarker} from "../../services/MapService";
import {logoutUser} from "./auth";
import {history} from "../../helpers/history";
import {PATH_HOME} from "../../routeList";
import {deleteUser, getAllUsers} from "../../services/AdminService";
// import {socket} from '../../services/socketService';

export function getFilterMarker(parameters) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            // searchOnDate(parameters);
            // socket.emit('param', parameters);
            // socket.off('get_data').on('get_data', data => {
            //     console.log(data);
            //     dispatch(mapsSuccessGet(data));
            // })
            searchOnDate(parameters)
                .then(({data}) => {
                    dispatch(mapsSuccessGet(data));
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function mapCreateMarker(parameters, centerMap) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            createMarker(parameters)
                .then(_ => {
                    dispatch(mapEndLoading());
                    dispatch(addHomeCenterMapAfterCreate(centerMap))
                    history.push(PATH_HOME);
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function mapGetAllUserMarkers(id) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            getAllMarkersById(id)
                .then(({data}) => {
                    dispatch(mapsSuccessGet(data));
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function mapDeleteMarkerById(id) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            deleteMarker(id)
                .then(_ => {
                    dispatch(mapDeleteMarker(id));
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function takeAllUsers() {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            getAllUsers()
                .then(({data})=> {
                    dispatch(addUsers(data));
                    dispatch(mapEndLoading());
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function removeUserProfile(id) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            deleteUser(id)
                .then(_ => {
                    dispatch(mapEndLoading());
                    dispatch(logoutUser());
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function removeUserInAdminPanel(id) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            deleteUser(id)
                .then(_ => {
                    dispatch(mapEndLoading());
                    dispatch(adminDeleteUser(id));
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR' + e))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR' + e))
            }
        }
    }
}

export function mapClearMarker() {
    return {
        type: MAP_CLEAR_MARKER
    }
}

export function mapClearError() {
    return {
        type: MAP_CLEAR_ERROR
    }
}

function adminDeleteUser(id) {
    return {
        id,
        type: ADMIN_DELETE_USER
    }
}

function mapDeleteMarker(id) {
    return {
        id,
        type: MAP_DELETE_MARKER
    }
}

function addUsers(users) {
    return {
        type: ADMIN_GET_USERS,
        users
    }
}

function addHomeCenterMapAfterCreate(mapLocation) {
    return {
        type: MAP_ADD_CENTER,
        mapLocation
    }
}

function helperError(dispatch, e) {
    if (e.response.status === 401) {
        dispatch(logoutUser());
    } else if (e.response.data.message) {
        dispatch(mapError(e.response.data.message));
    }
}

function mapsSuccessGet(markers) {
    return {
        type: MAP_SUCCESS_GET,
        markers,
    };
}

function mapEndLoading() {
    return {
        type: MAP_END_LOAD,
    };
}

function mapStartLoading() {
    return {
        type: MAP_START_LOAD,
    };
}

export function mapError(e) {
    return {
        type: MAP_ERROR,
        error: e,
    }
}