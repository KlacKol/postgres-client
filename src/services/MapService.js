import axios from 'axios';
import {getRefreshToken, getToken, setRefreshToken, setToken} from "./LocalStorageService";
import jwtDecode from "jwt-decode";
import {updateTokens} from "./AuthService";

const api = process.env.REACT_APP_APP_API_URL + '/map';

export const createMarker = async (res) => {
    return await helper(res, 'create', 'post');
};

export const generateRandomMarker = async () => {
    return await helper(null, 'generate/random', 'get')
};

export const deleteMarker = async (id) => {
    return await helper(null, null, 'delete', id)
};

export const searchOnDate = async (res) => {
    return await helper(res, 'search', 'post');
};

export const getAllMarkersById = async (id) => {
    return await helper( null,null, 'get', id);
};

const helper = async (res, path, method, id) => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    let date = Date.now() + 10;
    const user = jwtDecode(token);
    if (user && date >= user.exp * 1000) {
        console.log('refresh work')
        return await updateTokens({token, refreshToken}).then(async({data}) => {
            setToken(data.token);
            setRefreshToken(data.refreshToken);
            if (id) {
                return await axios[method](`${api}/${id}`)
            }
            return await axios[method](`${api}/${path}`, res)
        })
    }
    if (id) {
        return await axios[method](`${api}/${id}`)
    }
    return await axios[method](`${api}/${path}`, res)
};

axios.interceptors.request.use(
    config => {
        const token = getToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    }
);
