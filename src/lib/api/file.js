import axios from 'axios';

export const uploadAPI = (formData) => axios.post('/api/file/upload', formData);
export const addItemAPI = ({username, filename, type}) => axios.post('/api/file/additem', {username, filename, type});
export const loadItems = ({username}) => axios.post('/api/file/loaditems', {username});

