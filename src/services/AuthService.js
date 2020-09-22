import axios from 'axios';

const api = process.env.REACT_APP_APP_API_URL + '/auth';

export const loginUser = async (data) => {
    return axios.post(`${api}/login`, data)
};

export const registerUser = async (data) => {
    const config = {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }
    return axios.post(`${api}/registration`, data, config)
};

export const updateTokens = async (data) => {
    return axios.post(`${api}/refresh`, data)
};

export const deleteRefreshToken = async (id) => {
    await axios.delete(`${api}/refresh/${id}`)
};
