import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Clothes from '../components/Clothes';
import { ClothesToggle, MessageToggle, SetCurrentChat, SetItemList, SetCurrentItem, SetAlarmText, AlarmToggle } from '../redux/modules/home';

function ClothesContainer() {
    const { cVisible, mVisible, currentItem, loggedInfo, alVisible } = useSelector(state => ({
        cVisible: state.home.cVisible,
        mVisible: state.home.mVisible,
        currentItem: state.home.currentItem,
        loggedInfo: state.user.loggedInfo,
        alVisible: state.home.alVisible
    }));
    const dispatch = useDispatch();

    const clothesToggle = (cVisible) => dispatch(ClothesToggle(cVisible));
    const messageToggle = (mVisible) => dispatch(MessageToggle(mVisible));
    const setCurrentChat = (cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt) => dispatch(SetCurrentChat(cID, iID, title, price, imgname, seller, buyer, sellerNick, buyerNick, messages, createdAt));
    const setItemList = (itemList) => dispatch(SetItemList(itemList));
    const setCurrentItem = (iID, title, details, sellerID, sellerNick, location, type, price, imgname) => dispatch(SetCurrentItem(iID, title, details, sellerID, sellerNick, location, type, price, imgname));
    
    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    return (
        <Clothes loggedInfo = {loggedInfo} cVisible = {cVisible} mVisible = {mVisible} clothesToggle = {clothesToggle} currentItem = {currentItem} messageToggle = {messageToggle} setCurrentChat = {setCurrentChat} setItemList = {setItemList} setCurrentItem = {setCurrentItem} alVisible = {alVisible} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle} />
    );
}

export default ClothesContainer;