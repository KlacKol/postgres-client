import axios from 'axios';
import {getRefreshToken, getToken, setRefreshToken, setToken} from "./LocalStorageService";
import jwtDecode from "jwt-decode";
import {updateTokens} from "./AuthService";

const api = process.env.REACT_APP_APP_API_URL + '/admin';

export const getAllUsers = async () => {
    return await helper(null, 'users', 'get')
};

export const deleteUser = async (email) => {
    return await helper(null, 'users', 'delete', email)
};

export const takeAdmin = async (id, premiss) => {
    return await axios.put(`${api}/users/${id}`, premiss)
}

const helper = async (res, path, method, email) => {
    const token = getToken();
    const refreshToken = getRefreshToken();
    let date = Date.now() + 10;
    const user = jwtDecode(token);
    if (user && date >= user.exp * 1000) {
        console.log('refresh work')
        return await updateTokens({token, refreshToken}).then(async({data}) => {
            setToken(data.token);
            setRefreshToken(data.refreshToken);
            if (method === 'delete') {
                return await axios.delete(`${api}/users/${email}`)
            }
            return await axios[method](`${api}/${path}`, res)
        })
    }
    if (method === 'delete') {
        return await axios.delete(`${api}/users/${email}`)
    }
    return await axios[method](`${api}/${path}`, res)
};
