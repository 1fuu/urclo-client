import axios from 'axios';

export const newItemAPI = ({title, details, sellerID, sellerNick, location, type, price, height, weight, imgname}) => axios.post('/api/item/newitem', {title, details, sellerID, sellerNick, location, type, price, height, weight, imgname});
export const delItemAPI = ({iID}) => axios.post('/api/item/delitem', {iID});
export const loadItemsAPI = () => axios.get('/api/item/loaditems');
export const loadItemAPI = ({iID}) => axios.post('/api/item/loaditem', {iID});
export const loadItemsByBMI = ({height, weight}) => axios.post('/api/item/loaditemsbybmi', {height, weight});

