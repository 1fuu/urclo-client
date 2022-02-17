import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HomeUI from '../components/HomeUI';
import { AddClothesToggle, WritePostToggle, ClothesToggle, ForumToggle, PostToggle, ChatToggle, MessageToggle, SetCurrentItem, SetCurrentPost, SetPostList, SetChatList, SetCurrentChat, SetItemList, LoadingStateChange, SetAlarmText, AlarmToggle } from '../redux/modules/home';

function HomeUIContainer() {
    const { username, height, weight, logged, aVisible, wVisible, mVisible, itemList, postList, chatList, cVisible, fVisible, pVisible, crVisible, alVisible, success, loading, error } = useSelector(state => ({
        username: state.user.loggedInfo.username,
        height: state.user.loggedInfo.height,
        weight: state.user.loggedInfo.weight,
        logged: state.user.logged,
        aVisible: state.home.aVisible,
        wVisible: state.home.aVisible,
        mVisible: state.home.mVisible,
        itemList: state.home.itemList,
        postList: state.home.postList,
        chatList: state.home.chatList,
        cVisible: state.home.cVisible,
        fVisible: state.home.fVisible,
        pVisible: state.home.pVisible,
        crVisible: state.home.crVisible,
        alVisible: state.home.alVisible,
        loading: state.home.loadingState.loading,
        success: state.home.loadingState.success,
        error: state.home.loadingState.error
    }));
    const dispatch = useDispatch();

    const addClothesToggle = (aVisible) => dispatch(AddClothesToggle(aVisible));
    const writePostToggle = (wVisible) => dispatch(WritePostToggle(wVisible));
    const clothesToggle = (cVisible) => dispatch(ClothesToggle(cVisible));
    const forumToggle = (fVisible) => dispatch(ForumToggle(fVisible));
    const postToggle = (pVisible) => dispatch(PostToggle(pVisible));
    const chatToggle = (crVisible) => dispatch(ChatToggle(crVisible));
    const messageToggle = (mVisible) => dispatch(MessageToggle(mVisible));
    const setCurrentItem = (iID, title, details, sellerID, sellerNick, location, type, price, imgname) => dispatch(SetCurrentItem(iID, title, details, sellerID, sellerNick, location, type, price, imgname));
    const setCurrentPost = (title, context, writer, comment, createdAt) => dispatch(SetCurrentPost(title, context, writer, comment, createdAt));
    const setCurrentChat = (cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt) => dispatch(SetCurrentChat(cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt));
    const setPostList = (postList) => dispatch(SetPostList(postList));
    const setChatList = (chatList) => dispatch(SetChatList(chatList));
    const setItemList = (itemList) => dispatch(SetItemList(itemList));
    const loadingStateChange = (loading, success, error) => dispatch(LoadingStateChange(loading, success, error));
    const setAlarmText = (text) => dispatch(SetAlarmText(text));
    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));

    return (
        <HomeUI username = {username} height = {height} weight = {weight} logged = {logged} aVisible = {aVisible} wVisible = {wVisible} success = {success} loading = {loading} error = {error} loadingStateChange = {loadingStateChange} addClothesToggle = {addClothesToggle} writePostToggle = {writePostToggle} itemList = {itemList} postList = {postList} chatList = {chatList} clothesToggle = {clothesToggle} forumToggle = {forumToggle} postToggle = {postToggle} chatToggle = {chatToggle} messageToggle = {messageToggle} mVisible = {mVisible} cVisible = {cVisible} fVisible = {fVisible} pVisible = {pVisible} crVisible = {crVisible} alVisible = {alVisible} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle} setCurrentItem = {setCurrentItem} setCurrentPost = {setCurrentPost} setPostList = {setPostList} setChatList = {setChatList} setItemList = {setItemList} setCurrentChat = {setCurrentChat}/>
    );
}

export default HomeUIContainer;