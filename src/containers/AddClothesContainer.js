import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import AddClothes from '../components/AddClothes';
import { AddClothesToggle, SetItemList, SetAlarmText, AlarmToggle, LoadingStateChange } from '../redux/modules/home';

function AddClothesContainer() {
    const { username, nickname, aVisible, itemList, location, height, weight, alVisible, loading, success, error } = useSelector(state => ({
        username: state.user.loggedInfo.username,
        nickname: state.user.loggedInfo.nickname,
        aVisible: state.home.aVisible,
        itemList: state.home.itemList,
        location: state.user.loggedInfo.location,
        height: state.user.loggedInfo.height,
        weight: state.user.loggedInfo.weight,
        alVisible: state.home.alVisible,
        loading: state.home.loadingState.loading,
        success: state.home.loadingState.success,
        error: state.home.loadingState.error
    }));
    const dispatch = useDispatch();

    const addClothesToggle = (aVisible) => dispatch(AddClothesToggle(aVisible));
    const setItemList = (itemList) => dispatch(SetItemList(itemList));

    const alarmToggle = (alVisible) => dispatch(AlarmToggle(alVisible));
    const setAlarmText = (alarmText) => dispatch(SetAlarmText(alarmText));

    const loadingStateChange = (loading, success, error) => dispatch(LoadingStateChange(loading, success, error));

    return (
        <AddClothes username = {username} nickname = {nickname} alVisible = {alVisible} aVisible = {aVisible} loading = {loading} success = {success} error = {error} addClothesToggle = {addClothesToggle} itemList = {itemList} setItemList = {setItemList} location = {location} height = {height} weight = {weight} setAlarmText = {setAlarmText} alarmToggle = {alarmToggle} loadingStateChange = {loadingStateChange} />
    );
}

export default AddClothesContainer;