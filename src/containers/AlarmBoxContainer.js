import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AlarmBox from '../components/AlarmBox';
import { AlarmToggle, SetAlarmText } from '../redux/modules/home';

function AlarmBoxContainer() {
    const { alVisible, alarmText } = useSelector(state => ({
        alVisible: state.home.alVisible,
        alarmText: state.home.alarmText
    }));
    const dispatch = useDispatch();

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    return (
        <AlarmBox alVisible = {alVisible} alarmText = {alarmText} alarmToggle = {alarmToggle} setAlarmText = {setAlarmText} />
    );
}

export default AlarmBoxContainer;