export const setToken = (token) => {
    localStorage.setItem('access_token', token);
};

export const getToken = () => {
    return  localStorage.getItem('access_token');
};

export const clearToken = () => {
    localStorage.removeItem('access_token');
};

export const setRefreshToken = (token) => {
    localStorage.setItem('refresh_token', token);
};

export const getRefreshToken = () => {
    return  localStorage.getItem('refresh_token');
};

export const clearRefreshToken = () => {
    localStorage.removeItem('refresh_token');
};

export const setUserId = (id) => {
    localStorage.setItem('user_id', id);
};

export const getUserId = () => {
    return  localStorage.getItem('user_id');
};

export const clearUserId = () => {
    localStorage.removeItem('user_id');
};

