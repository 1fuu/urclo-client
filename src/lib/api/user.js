import axios from 'axios';

export const initialSettingAPI = ({username, nickname, location, height, weight, isFirstLogin}) => axios.put('/api/user/initialsetting', {username, nickname, location, height, weight, isFirstLogin});

