import {MAP_ERROR, MAP_SUCCESS_GET, MAP_START_LOAD, MAP_END_LOAD} from "./actionTypes";
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
                .catch(e =>{
                    helperError(dispatch, e)
                });
        } catch (e) {
            helperError(dispatch, e)
        }
    }
}

export function mapCreateMarker(parameters) {
    return (dispatch) => {
        dispatch(mapStartLoading());
        try {
            createMarker(parameters)
                .then(_ => {
                    dispatch(mapEndLoading());
                    history.push(PATH_HOME);
                })
                .catch(e =>{
                    helperError(dispatch, e)
                });
        } catch (e) {
            helperError(dispatch, e)
        }
    }
}

function helperError(dispatch, e) {
    if (e.response.status === 401) {
        dispatch(logoutUser());
    }
    else if (e.response.data.message) {
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