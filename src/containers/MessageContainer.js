import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Message from '../components/Message';
import { MessageToggle, AddChatMessage, SetCurrentChat, SetChatList, SetAlarmText, AlarmToggle } from '../redux/modules/home';

export default function MessageContainer() {
    const { mVisible, currentChat, loggedInfo, alVisible } = useSelector(state => ({
        mVisible: state.home.mVisible,
        currentChat: state.home.currentChat,
        loggedInfo: state.user.loggedInfo,
        alVisible: state.home.alVisible
    }));
    const dispatch = useDispatch();

    const messageToggle = (mVisible) => dispatch(MessageToggle(mVisible));
    const addChatMessage = (username, text, date) => dispatch(AddChatMessage(username, text, date));
    const setCurrentChat = (cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt) => dispatch(SetCurrentChat(cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt));
    const setChatList = (chatList) => dispatch(SetChatList(chatList));

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    return (
        <Message loggedInfo = {loggedInfo} mVisible = {mVisible} messageToggle = {messageToggle} currentChat = {currentChat} addChatMessage = {addChatMessage} setCurrentChat = {setCurrentChat} setChatList = {setChatList} alVisible = {alVisible} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle} />
    );
}