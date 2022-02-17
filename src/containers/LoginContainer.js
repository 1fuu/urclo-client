import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Login from '../components/Login';
import { LoginInputChange, RegisterToggle } from '../redux/modules/auth';
import { SetLoggedInfo, SetValidated } from '../redux/modules/user';
import { SetItemList, AlarmToggle, SetAlarmText } from '../redux/modules/home';

function LoginContainer() {
    const { username, password, rVisible, logged, itemList, alVisible } = useSelector(state => ({
        username: state.auth.loginInputs.username,
        password: state.auth.loginInputs.password,
        rVisible: state.auth.rVisible,
        logged: state.user.logged,
        itemList: state.home.itemList,
        alVisible: state.home.alVisible
    }));
    const dispatch = useDispatch();

    const onLoginInputChange = (username, password) => dispatch(LoginInputChange(username, password));
    const onRegister = (rVisible) => dispatch(RegisterToggle(rVisible));
    const setLoggedInfo = (logInfo) => dispatch(SetLoggedInfo(logInfo));
    const setValidated = (validated) => dispatch(SetValidated(validated));
    const setItemList = (itemList) => dispatch(SetItemList(itemList));

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    return (
        <Login username = {username} password = {password} alVisible = {alVisible} rVisible = {rVisible} alarmToggle = {alarmToggle} setAlarmText = {setAlarmText} onLoginInputChange = {onLoginInputChange} onRegister = {onRegister} setLoggedInfo = {setLoggedInfo} setValidated = {setValidated} setItemList = {setItemList} logged = {logged} itemList = {itemList} />
    );
}

export default LoginContainer;
