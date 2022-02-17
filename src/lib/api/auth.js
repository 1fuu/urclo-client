import axios from 'axios';

export const registerAPI = ({ username, password}) => axios.post('/api/auth/register', {  username, password });
export const loginAPI = ({ username, password}) => axios.post('/api/auth/login', { username, password });

export const checkStatusAPI = () => axios.get('/api/auth/check');
export const logoutAPI = () => axios.post('/api/auth/logout');