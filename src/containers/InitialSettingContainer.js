import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import InitialSetting from '../components/InitialSetting';
import { SetLoggedInfo } from '../redux/modules/user';
import { AlarmToggle, SetAlarmText } from '../redux/modules/home';

function InitialSettingContainer() {
    const { username, nickname, location, isFirstLogin, alVisible } = useSelector(state => ({
        username: state.user.loggedInfo.username,
        nickname: state.user.loggedInfo.nickname,
        location: state.user.loggedInfo.location,
        isFirstLogin: state.user.loggedInfo.isFirstLogin,
        alVisible: state.home.alVisible
    }));
    const dispatch = useDispatch();

    const setLoggedInfo = (logInfo) => dispatch(SetLoggedInfo(logInfo));

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    return (
        <InitialSetting username = {username} nickname = {nickname} location = {location} isFirstLogin = {isFirstLogin} setLoggedInfo = {setLoggedInfo} alVisible = {alVisible} setAlarmText= {setAlarmText} alarmToggle = {alarmToggle}/>
    );
}

export default InitialSettingContainer;