import axios from 'axios';

export const detectAPI = (formData) => axios.post('/keras/detect', formData);