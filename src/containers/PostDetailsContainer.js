import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostDetails from '../components/PostDetails';
import { PostToggle, SetPostList, AlarmToggle, SetAlarmText, SetCurrentPost } from '../redux/modules/home';

export default function PostDetailsContainer() {
    const { loggedInfo, alVisible, pVisible, currentPost } = useSelector(state => ({
        loggedInfo: state.user.loggedInfo,
        alVisible: state.home.alVisible,
        pVisible: state.home.pVisible,
        currentPost: state.home.currentPost
    }));
    const dispatch = useDispatch();

    const postToggle = (pVisible) => dispatch(PostToggle(pVisible));
    const setPostList = (postList) => dispatch(SetPostList(postList));

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    const setCurrentPost = (title, context, writer, comment, createdAt) => dispatch(SetCurrentPost(title, context, writer, comment, createdAt));
    return (
        <PostDetails loggedInfo = {loggedInfo} alVisible = {alVisible} pVisible = {pVisible} postToggle = {postToggle} currentPost = {currentPost} setPostList = {setPostList} alarmToggle = {alarmToggle} setAlarmText = {setAlarmText} setCurrentPost = {setCurrentPost} />
    );
}