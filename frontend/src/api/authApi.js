import axios from './axiosInstance';

export const register = (data) => axios.post('/api/auth/register', data).then(r => r.data);
export const login = (data) => axios.post('/api/auth/login', data).then(r => r.data);
export const logout = () => axios.post('/api/auth/logout').then(r => r.data);
export const getMe = () => axios.get('/api/auth/me').then(r => r.data);
