import axios from 'axios';

export const newPostAPI = ({title, context, writer}) => axios.post('/api/post/newpost', {title, context, writer});
export const newCommentAPI = ({pID, writer, text}) => axios.post('/api/post/newcomment', {pID, writer, text});
export const loadPostsAPI = () => axios.get('/api/post/loadposts');
export const loadPostAPI = ({pID}) => axios.post('/api/post/loadpost', {pID});
export const delPostAPI = ({pID}) => axios.post('/api/post/delpost', {pID});