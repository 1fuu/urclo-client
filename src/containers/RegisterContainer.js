import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Register from '../components/Register';
import { RegisterInputChange, RegisterStateChange, RegisterToggle } from '../redux/modules/auth';
import { AlarmToggle, SetAlarmText } from '../redux/modules/home';

function RegisterContainer() {
    const { username, password, loading, success, error, rVisible, alVisible } = useSelector(state => ({
        username: state.auth.registerInputs.username,
        password: state.auth.registerInputs.password,
        loading: state.auth.registerState.loading,
        success: state.auth.registerState.success,
        error: state.auth.registerState.error,
        rVisible: state.auth.rVisible,
        alVisible: state.home.alVisible
    }));
    const dispatch = useDispatch();

    const onRegisterInputChange = (username, password) => dispatch(RegisterInputChange(username, password));
    const onRegisterStateChange = (loading, success, error) => dispatch(RegisterStateChange(loading, success, error));
    const onRegister = (rVisible) => dispatch(RegisterToggle(rVisible));

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    return (
        <Register username={username} password = {password} loading = {loading} success = {success} error = {error} alVisible = {alVisible} rVisible = {rVisible} onRegister = {onRegister} onRegisterInputChange = {onRegisterInputChange} onRegisterStateChange = {onRegisterStateChange} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle}/>
    );
}

export default RegisterContainer;
