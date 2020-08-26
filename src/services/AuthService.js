import axios from 'axios';

const api = process.env.REACT_APP_APP_API_URL + '/auth';

export const loginUser = async (data) => {
    return axios.post(`${api}/login`, data)
};

export const registerUser = async (data) => {
    return axios.post(`${api}/registration`, data)
};

export const updateTokens = async (data) => {
    return axios.post(`${api}/refresh`, data)
};

export const deleteRefreshToken = async (id) => {
    await axios.delete(`${api}/refresh/${id}`)
};
