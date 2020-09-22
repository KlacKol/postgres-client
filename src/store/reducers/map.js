import {
    MAP_ERROR,
    MAP_SUCCESS_GET,
    MAP_START_LOAD,
    MAP_END_LOAD,
    MAP_CLEAR_MARKER,
    MAP_CLEAR_ERROR, MAP_ADD_CENTER, ADMIN_GET_USERS, MAP_DELETE_MARKER, ADMIN_DELETE_USER
} from "../actions/actionTypes";

const initialState = {
    markers: [],
    loading: false,
    error: null,
    mapLocation: null,
    users: []
};

export default function mapReducer(state = initialState, action) {
    switch (action.type) {
        case ADMIN_GET_USERS:
            return {
                ...state,
                users: action.users
            }
        case ADMIN_DELETE_USER:
            return {
                ...state,
                users: state.users.filter(user => user.id !== action.id)
            }
        case MAP_DELETE_MARKER:
            return  {
                ...state,
                markers: state.markers.filter(marker => marker.id !== action.id)
            }
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
        case MAP_CLEAR_ERROR:
            return {
                ...state,
                error: null
            }
        case MAP_CLEAR_MARKER:
            return {
                ...state,
                markers: []
            }
        case MAP_ADD_CENTER:
            return {
                ...state,
                mapLocation: action.mapLocation
            }
        default:
            return state;
    }
};
