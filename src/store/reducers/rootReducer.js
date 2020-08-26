import { combineReducers } from "redux";
import mapReducer from './map';
import userReducer from "./auth";

export default combineReducers({
    map: mapReducer,
    user: userReducer
})