import axios from 'axios';

export const newChatAPI = ({iID, title, price, imgname, seller, buyer, sellerNick, buyerNick}) => axios.post('/api/chat/newchat', {iID, title, price, imgname, seller, buyer, sellerNick, buyerNick});
export const loadChatsAPI = ({username}) => axios.post('/api/chat/loadchats', {username});
export const addMessageAPI = ({cID, username, text}) => axios.post('/api/chat/addmessage', {cID, username, text});
export const loadChatAPI = ({cID}) => axios.post('/api/chat/loadchat', {cID});

