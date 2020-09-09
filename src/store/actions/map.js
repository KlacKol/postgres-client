import {
    MAP_ERROR,
    MAP_SUCCESS_GET,
    MAP_START_LOAD,
    MAP_END_LOAD,
    MAP_CLEAR_MARKER,
    MAP_CLEAR_ERROR, MAP_ADD_CENTER
} from "./actionTypes";
import {createMarker, searchOnDate} from "../../services/MapService";
import {logoutUser} from "./auth";
import {history} from "../../helpers/history";
import {PATH_HOME} from "../../routeList";

export function getFilterMarker(parameters) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            searchOnDate(parameters)
                .then(data => {
                    dispatch(mapsSuccessGet(data));
                })
                .catch(e => {
                    if (e.response) {
                        helperError(dispatch, e)
                    } else {
                        dispatch(mapError('INTERNAL ERROR'))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR'))
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
                        dispatch(mapError('INTERNAL ERROR'))
                    }
                });
        } catch (e) {
            if (e.response) {
                helperError(dispatch, e)
            } else {
                dispatch(mapError('INTERNAL ERROR'))
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