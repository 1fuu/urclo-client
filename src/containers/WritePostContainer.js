import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import WritePost from '../components/WritePost';
import { WritePostToggle, SetPostList } from '../redux/modules/home';

function WritePostContainer() {
    const { username, nickname, wVisible } = useSelector(state => ({
        username: state.user.loggedInfo.username,
        nickname: state.user.loggedInfo.nickname,
        wVisible: state.home.wVisible
    }));
    const dispatch = useDispatch();

    const writePostToggle = (wVisible) => dispatch(WritePostToggle(wVisible));
    const setPostList = (postList) => dispatch(SetPostList(postList));

    return (
        <WritePost username = {username} nickname = {nickname} wVisible = {wVisible} writePostToggle = {writePostToggle} setPostList = {setPostList}/>
    );
}

export default WritePostContainer;