import {MAP_ERROR, MAP_SUCCESS_GET, MAP_START_LOAD, MAP_END_LOAD, MAP_CLEAR_MARKER} from "../actions/actionTypes";

const initialState = {
    markers: [],
    loading: false,
    error: null,
};

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case MAP_SUCCESS_GET:
            return {
                ...state,
                loading: false,
                markers: action.markers
            };
        case MAP_START_LOAD:
            return {
                ...state,
                loading: true,
            };
        case MAP_END_LOAD:
            return {
                ...state,
                loading: false
            };
        case MAP_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        case MAP_CLEAR_MARKER:
            return {
                ...state,
                markers: []
            }
        default:
            return state;
    }
};
